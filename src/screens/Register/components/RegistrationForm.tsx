import React, { ChangeEvent } from 'react';
import '../../../App.css';
import { Link } from 'react-router-dom';
import { UserFieldInfo, FormErrors } from "../store/types";

interface Props {
  handleChange: (e: ChangeEvent) => void;
  handleSubmit: () => void;
  handleEmail: () => void;
  handlePassword: () => void;
  handleFirstName: () => void;
  handleUsername: () => void;
  handleComparePassword: () => void;
  formErrors: FormErrors;
  user: UserFieldInfo;
}

const style = {
  color: "red"
}
class Registration extends React.Component<Props> {   
    render() {     
      const { 
          user, 
          formErrors, 
          handleFirstName,  
          handleUsername, 
          handleEmail, 
          handlePassword,
          handleComparePassword,
          handleChange, 
          handleSubmit } = this.props;  

    return (
      <>
            <div>
            <h2 style={{textAlign: "center"}}>New User? Register here!</h2>
            <div className="center-form">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input  
                    className="form-control" 
                    type="text" 
                    name="firstName" 
                    value={user.firstName} 
                    onBlur={handleFirstName}
                    onChange={handleChange}>
                </input>
                <div style={style}> {formErrors ? formErrors.firstName : null} </div>
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input  
                    className="form-control"
                    type="text" 
                    name="username" 
                    value={user.username} 
                    onBlur={handleUsername}
                    onChange={handleChange}>
                </input>
                <div style={style}> {formErrors ? formErrors.username : null} </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input  
                    className="form-control" 
                    type="email" 
                    name="email" 
                    value={user.email} 
                    onBlur={handleEmail}
                    onChange={handleChange}>
                </input>
                <div style={style}> {formErrors ? formErrors.email : null} </div>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input  
                    className="form-control"
                    type="password" 
                    name="password" 
                    value={user.password} 
                    onBlur={handlePassword}
                    onChange={handleChange}>
                </input>
                <div style={style}> {formErrors ? formErrors.password : null} </div>
              </div>
              <div className="form-group">
                <label htmlFor="confirmPass">Confirm password</label>
                <input  
                    className="form-control"
                    type="password" 
                    name="confirmPass" 
                    value={user.confirmPass}
                    onBlur={handleComparePassword} 
                    onChange={handleChange}>
                </input>
                <div style={style}> {formErrors ? formErrors.confirmPassword : null} </div>
              </div>
              <div className="form-group">
                  <button className="btn btn-primary"  onClick={handleSubmit}>Register</button>
                  <Link to="/login" className="btn btn-link">Login</Link> 
              </div>
            </div>
        </div>
      </>
    );
  }
}

export default Registration;