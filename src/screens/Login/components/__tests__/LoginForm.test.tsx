import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import LoginForm from '../LoginForm';
import toJson from "enzyme-to-json";

configure({adapter: new Adapter()});

function devNullListener(){
  return ;
}

const props = {
  handleChange: () => devNullListener,
  handleSubmit: () => devNullListener,
  handleEmail: () => devNullListener,
  handlePassword: () => devNullListener,
  formErrors: { email: '', password: ''},
  failure: ''
};

describe('Login component', () => {
  describe('should Login when credential exists in the database', () => {
    it('render loginform successfully', () => {
      /* 
        toContainReact() is a matcher function. To use it, use jest-enzyme
      */
      
      const LoginComponent = shallow(<LoginForm {...props}/>);
      expect(toJson(LoginComponent)).toMatchSnapshot();
      LoginComponent.unmount()
      
    })
    it('renders only two input boxes', () => {
      const wrapper = shallow(<LoginForm {...props}/>);
     
      expect(wrapper.find("input[name='email']")).toHaveLength(1);
      expect(wrapper.find("input[name='password']")).toHaveLength(1);
      
    })
    
    it('should call handleSubmit when login button is clicked', () => {
     
      const handleSubmit = jest.fn();
      const wrapper = shallow(
        <LoginForm {...props} handleSubmit={handleSubmit}/>
      )
      wrapper.update();
      wrapper.find('button').simulate('click')
      expect(handleSubmit).toHaveBeenCalled();

    });
  });
});
