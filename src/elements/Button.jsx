import React from 'react';

function Button(props){
    return (
        <>
            <div className={"mb-3 " + props.alignment ? props.alignment : ""}>
  	            <button type={props.type} className="btn-blue" onClick={props.onClick}>{props.value}</button>
            </div>
        </>
    )

}

export default Button;