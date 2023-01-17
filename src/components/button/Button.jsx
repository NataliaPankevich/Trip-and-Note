import React from 'react';
import './Button.css';

export const Button =(props)=>{
    let style = '';

    if(props.style === "main-page-button"){
        style="main-page-button";
    } else if(props.style === "login-page-button") {
        style="login-page-button";
    } else if(props.style === "home-page-showForm-btn") {
        style="home-page-showForm-btn";
    } else if(props.style === "home-page-addTrip-btn") {
        style="home-page-addTrip-btn";
    } else if(props.style === "home-page-deleteTrip-btn") {
        style="home-page-deleteTrip-btn";
    } else if(props.style === "trip-page-showForm-btn") {
        style="trip-page-showForm-btn";
    } else if(props.style === "trip-page-addNote-btn") {
        style="trip-page-addNote-btn";
    } else if(props.style === "trip-page-deleteNote-btn") {
        style="trip-page-deleteNote-btn";
    }


    return (
        <div>
           <button onClick={props.onClick} className={style}>{props.text}</button> 
        </div>        
    );
}