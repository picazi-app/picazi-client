import React from 'react';
import axios from 'axios';
import getBaseUrl from "../../../helpers/config";
const apiUrl = `${getBaseUrl()}`

interface imageFormObjInterface{
  imageName?: string;
  imageData?: string;
}

export interface Error {
  type: "FileTypeError" | "FileSizeError" | "NoFileSelectedError" |null ;
  description: string;
}
interface StateProps {
  selectedFile: File | null,
  imagePreviewUrl: string | '',
  error: Error
}

interface Props {
  getPostListData: () => Promise<any>; 
}

class UploadPhoto extends React.Component<Props, StateProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedFile: null,
      imagePreviewUrl: '',
      error: {
        type: null,
        description: ''
      }
    }
  }
  uploadPhoto = (event: any) => {
      const { imagePreviewUrl } = this.state;
      const file = event.target.files[0];
      const acceptedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
      const maxImageSize = 336790;
      const imagePreview = URL.createObjectURL(event.target.files[0])
      let error = {
        type: null,
        description: ''
      } as Error

      if (!acceptedFileTypes.includes(file.type)) {
        error = {
          type: "FileTypeError",
          description: "This file type is not supported. Please upload either a PNG or JPG.",
        };
      } else if (file.size > maxImageSize) {
        error = {
          type: "FileSizeError",
          description: "Your file cannot be larger than 4MB. Please upload a smaller file.",
        };
      } 
      else {
        this.setState({
          selectedFile: file,
          imagePreviewUrl: imagePreview,
          error: error
        }) 
      } 

      this.setState({
        error,
        selectedFile: file,
        imagePreviewUrl: imagePreview
      });      
  }

  onClickHandler = (e: any) => {
      let imageFormObj = new FormData();
      const { error, selectedFile} = this.state;
      console.log(selectedFile)
      console.log(error);
      let noFileSelectedError = {
        type: null,
        description: ''
      } as Error
      if(selectedFile === null) {
        this.setState({
          error: {
            type: "NoFileSelectedError",
            description: "No file has been selected yet."
          }
        })
      }
      if(selectedFile && error.description === '') {
        imageFormObj.append("imageName", selectedFile.name + "_" + Date.now());
        imageFormObj.append("imageData", selectedFile);
        axios.post(`${apiUrl}/uploads/upload-photo`, imageFormObj, {
          headers: {
            'Accept-Language': 'en-Us,en; q=0.8',
            'Content-Type': `multipart/form-data`
          },
          withCredentials: true
        })
          .then((response) => {
            console.log(response.data.imageUrl)
            if(response.data) {
              this.setState( {
                imagePreviewUrl: '',
              }, () => this.props.getPostListData())
            }      
          })
          .catch((err) => {
            console.log(err.response)
            this.setState({
              error: err.response.data.errors[0].detail
            })
        })     
      } else {
        this.setState({
          selectedFile: null
        })
      }
           
  }
	render(){  
      const { imagePreviewUrl, error } = this.state; 
      let imagePreview, errorMsg;
        if (imagePreviewUrl) {
          imagePreview = (<img  src={imagePreviewUrl} />);
        } else {
          imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }

        if(error.type === 'FileSizeError') {
          errorMsg = (<h3>{error.description}</h3>)
        }
        else if(error.type === 'FileTypeError') {
          errorMsg = (<h3>{error.description}</h3>)
        }
        else if(error.type === 'NoFileSelectedError') {
          errorMsg = (<h3>{error.description}</h3>)
        }
       
		return(
      <div style={{margin: 'auto', width: '20%'}}> 
        {/* { this.state.selectedFile === null ? <h4>Please upload a file...........</h4> : null} */}

        {errorMsg}
        <label>Upload your file</label>
        {imagePreview}
        <input type="file" id="upload-photo-id" accept="image/*" onChange={this.uploadPhoto}/>
        
        <button type="button" name="upload-photo" onClick={this.onClickHandler}>Upload</button> 

       
      </div>
		)
	}
}


export default UploadPhoto;


/* 
https://console.aws.amazon.com/s3/buckets/upload-img-node/?region=us-east-2&tab=overview
bucket-name = upload-img-node/
region=us-east-2

Access Key ID:
AKIAIVLMXTULJ2HJYJBQ
Secret Access Key:
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
*/