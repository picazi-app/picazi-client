This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

## Image uploading app made with React, Redux, Redux-thunk, Node, Mongoose, Typescript. Used AWS S3 to store images.

**Inspiration:**

This app is inspired from wesbos [redux tutorials](https://learnredux.com/) which was completely a frontend app made in React and Redux.


**TroubleShooting:**

In express, if you want user credentials in `req.session` object. Then one need to pass {withCredentials: true} while making API request through axios.

Ex:
```
axios.post(`${apiUrl}/images/upload-image`, imageFormObj, {
          headers: {
            'Accept-Language': 'en-Us,en; q=0.8',
            'Content-Type': `multipart/form-data`
          },
          withCredentials: true
        })
          .then((response) => {
            console.log(response.data)
          })
          .catch((err) => {
            console.log(err.response)
        }) 
```

