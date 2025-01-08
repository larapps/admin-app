import React from 'react';

function Input(props){
    return (
        <>
            <div className={"input-group mb-"+props.margin}>
                <span className="input-group-text" id={props.icon_id}><i className={"las" + " " +props.icon }></i></span>
                <input type={props.type} className="form-control" placeholder={props.placeholder} name={props.name} aria-describedby={props.icon_id} />
            </div>
        </>
    )

}

export default Input;