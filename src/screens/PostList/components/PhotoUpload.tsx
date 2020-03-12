import React from 'react';
import axios from 'axios';
import getBaseUrl from "../../../helpers/config.js";
const apiUrl = getBaseUrl()

interface imageFormObjInterface{
  imageName?: string;
  imageData?: string;
}

export interface Error {
  type: "FileTypeError" | "FileSizeError" | "NoFileSelectedError" | null ;
  description: string;
}
interface StateProps {
  selectedFile: File | null,
  selectedFileName: string,
  imagePreviewUrl: string | '',
  error: Error
}

interface Props {
  getPostListData: (page: number) => Promise<any>; 
}


class UploadPhoto extends React.Component<Props, StateProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedFile: null,
      imagePreviewUrl: '',
      selectedFileName: '',
      error: {
        type: null,
        description: ''
      }
    }
  }
  uploadPhoto = (event: any) => {
      const file = event.target.files[0];
      const acceptedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
      const maxImageSize = 600000;
      let imagePreview = '';
      if(file) {
        imagePreview = URL.createObjectURL(event.target.files[0])
      }

      let error = {
        type: null,
        description: ''
      } as Error

      if (file && !acceptedFileTypes.includes(file.type)) {
        error = {
          type: "FileTypeError",
          description: "This file type is not supported. Please upload either a PNG or JPG.",
        };
      } else if (file && file.size > maxImageSize) {
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
              this.setState({
                imagePreviewUrl: '',
              }, () => this.props.getPostListData(1))
            }      
          })
          .catch((err) => {
            console.log(err.response)
            this.setState({
              error: err.response.data
            })
        })     
      } else {
        this.setState({
          selectedFile: null
        })
      }
           
  }
	render(){  
      const { imagePreviewUrl, error} = this.state; 
      let imagePreview, errorMsg;
        if (imagePreviewUrl) {
          imagePreview = (<img  alt="" src={imagePreviewUrl} />);
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
      <div style={{margin: 'auto', width: '20%', textAlign: "center"}}> 
        <div style={{color:'red'}}>{errorMsg}</div>
        <div>
          <button><label htmlFor="upload-photo-id" className="upload-file">Select a picture here</label></button>
          {imagePreview}
          <input type="file" id="upload-photo-id" accept="image/*" onChange={this.uploadPhoto}/>
        </div>
        
        <button type="button" className="upload-button" name="upload-photo" onClick={this.onClickHandler}>Post</button> 

       
      </div>
		)
	}
}


export default UploadPhoto;
