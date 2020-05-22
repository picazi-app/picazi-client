import React, { ChangeEvent } from 'react';
import '../../../App.css';
import { Link } from 'react-router-dom';


interface Props {
  handleChange: (e: ChangeEvent) => void;
  handleSubmit: () => void;
  handleEmail: () => void;
  handlePassword: () => void
  formErrors: {email?: string, password?: string}
  failure: string | undefined;
}

class LoginForm extends React.Component<Props> { 
    render() {     
      const { formErrors, handleChange, handleEmail, handlePassword, handleSubmit, failure } = this.props;    
      const loginError = failure? failure : null;
        return (
          <>
            
            <div className="center-form">
              <h2 style={{textAlign: "center"}}>Existing User? Login here</h2>
              <h3 style={{color:"red"}}>{loginError}</h3>
              <div className="form-group">
                <label>Enter your email</label>
                <input  
                    className="form-control" 
                    type="email" 
                    name="email"
                    onBlur={handleEmail}
                    onChange={handleChange} 
                    contentEditable={true}
                >
                </input>
                <div> {formErrors ? formErrors.email : null} </div>
              </div>
              <div className="form-group">
                <label>Enter your password</label>
                <input  
                    className="form-control" 
                    type="password" 
                    name="password" 
                    onBlur={handlePassword}
                    onChange={handleChange}
                >
                </input>
                <div> {formErrors ? formErrors.password : null} </div>
              </div>
              <div className="form-group">
                  <button className="btn btn-primary"  onClick={handleSubmit}>Login</button>
                  <Link to="/signup" className="btn btn-link" style={{display: "block"}}>Click here to register a new account</Link> 
              </div>
            </div>
          </>
        );
    }
}

export default LoginForm;