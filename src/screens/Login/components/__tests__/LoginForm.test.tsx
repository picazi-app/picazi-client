import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import LoginForm from '../LoginForm';
import toJson from "enzyme-to-json";
import { BrowserRouter as Router } from 'react-router-dom';

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
      //const LoginComponent = shallow(<LoginForm {...props}/>);
      //expect(toDoList).toContainReact(<ul/>);
      //expect(toDoList.find('ul').length).toEqual(1)
      // const wrapper = mount(<ul/>);
      // expect(wrapper.find('ul').isEmpty()).to.equal(true);
      const LoginComponent = shallow(<LoginForm {...props}/>);
      //console.log(LoginComponent.debug())
      expect(toJson(LoginComponent)).toMatchSnapshot();
      LoginComponent.unmount()
      
    })
    it('renders only two input boxes', () => {
      const wrapper = shallow(<LoginForm {...props}/>);
     
      expect(wrapper.find("input[name='email']")).toHaveLength(1);
      expect(wrapper.find("input[name='password']")).toHaveLength(1);
      // expect(wrapper.find("input").exists()).toBe(true);
      // expect(wrapper.find("label").length).toBe(2);
      
    })
    
/* 
    it('should call handleSubmit when login button is clicked', () => {
      const wrapper = shallow(<LoginForm {...props}/>);
      console.log(wrapper.instance().props.handleSubmit)
      
      wrapper.instance().handleSubmit = jest.fn();
      const instance = wrapper.instance();
      jest.spyOn(instance, 'handleSubmit');
      wrapper.find('button').simulate('click');
    //   // expect(instance.props.handleSubmit()).toHaveBeenCalled();
    //   // wrapper.find('button').simulate('click');
     
     
    }); */
    it('should call handleSubmit when login button is clicked', () => {
     
      const handleSubmit = jest.fn();
      const wrapper = shallow(
        <LoginForm {...props} handleSubmit={handleSubmit}/>
      )
      wrapper.update();
      wrapper.find('button').simulate('click')
      expect(handleSubmit).toHaveBeenCalled();

    });

    it('should call handleSubmit when login using spy', () => {
      // wrapper.update();
    /*   const spy = jest.spyOn(loginWrapper.instance(), 'handleSubmit');
      loginWrapper.instance().forceUpdate();
      spy.mockReset();
      wrapper.setProps({}); */
      // console.log(wrapper.props().children.props.d)

      //wrapper.instance().props.handleSubmit = jest.fn();
      // const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');

    // force update as the function has already been linked to some sub components,
    // so the spy function will not be used by the original one.
    // (see: https://github.com/airbnb/enzyme/issues/944)
      // wrapper.instance().forceUpdate();
      // spy.mockReset();

      
     
      /* loginWrapper.find('button').at(0).simulate("click");
      
     
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
      wrapper.unmount(); */

      // const spy = jest.spyOn(wrapper.props(), 'handleSubmit');
      // wrapper.update();
      // const mockedEvent = {target: {}};
      // wrapper.find('button').simulate('click')
      // expect(handleSubmit).toHaveBeenCalled();
     

    }); 
  });
});
