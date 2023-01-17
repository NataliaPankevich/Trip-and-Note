import "./MainPageContainer.css";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/button/Button";

export const MainPageContainer = () => { 

  return (
    <div className="main-page-wrapper">
      <div className="main-page container">
        <div className="main-page-logo "><img  className="main-page-logo-image" src="../../images/logo.png" alt="" /></div>        
       
          
        <div className="main-page-content"> 
          <div><Link  to="/login"><Button  style="main-page-button" text="" /></Link></div>
          <img  className="main-page-image" src="../../images/backgroundMain.png" alt=""/>
        </div>       
      </div>
  </div>
  );
};
