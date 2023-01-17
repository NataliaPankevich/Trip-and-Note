import './LoginPageContainer.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '../../components/button/Button';
import {AuthorizationForm} from '../../components/authorizationForm/AuthorizationForm';
import {RegistrationForm} from '../../components/registrationForm/RegistrationForm';


export const LoginPageContainer = () => { 
  
    
  const [showQuestion, setShowQuestion] = useState(true);
  const [showAuthorizForm, setShowAuthorizForm] = useState(false);
  const [showRegistrForm, setShowRegistrForm] = useState(false);       
        
   
    const showAuthorizationForm=()=>{       
      setShowAuthorizForm(true)       
      setShowQuestion(false)
    }

    const showRegistrationForm=()=>{       
      setShowRegistrForm(true)  
      setShowQuestion(false)      
    }
 

  return (
    <div className="login-page-wrapper">
      <div className="login-page container">
        <div className="login-page-logo ">
           <img  className="login-page-logo-image" src="../../images/logo.png" alt="" />
        </div>        
        
        <div className="login-page-content">
          
        {showQuestion ? (
          <div className="login-page-content-section-question">
                <p>Do you have an account?</p>
                <Button  onClick={showAuthorizationForm} style="login-page-button" text="Yes" />
                <Button  onClick={showRegistrationForm} style="login-page-button" text="No" />
          </div>       
        ) : null}

        {showAuthorizForm ? (
          <div className="login-page-content-section-authorization">
            <AuthorizationForm/>
          </div>       
        ) : null}

          {showRegistrForm ? (
          <div className="login-page-content-section-registration">
            <RegistrationForm/> 
          </div>       
        ) : null}

         
          <img  className="login-page-image" src="../../images/backgroundLogin.png" alt=""/>
        </div>       
      </div>
  </div>
  );
};