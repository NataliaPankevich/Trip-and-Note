import './Input.css';

export const Input=(props)=>{

    let style = '';

   if(props.style === "trip-form-country-input"){
        style="trip-form-country-input";
    }else if(props.style === "note-form-date-input"){
        style="note-form-date-input";
    } else if(props.style === "note-form-city-input"){
        style="note-form-city-input";
    }else if(props.style === "trip-form-date-input"){
        style="trip-form-date-input";
    }/*else if(props.style === "send-review-input"){
        style="send-review-input";
    }else if(props.style === "registration-input"){
        style="registration-input";
    }*/

    return (
        <div>
            <input name={props.name} className={style} onChange={props.onChange} type={props.type} placeholder={props.placeholder}/>
        </div>
    );

}