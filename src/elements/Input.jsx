import React from 'react';

function Input(props){
    console.log("props.icon_id",props.icon_id);
    return (
        <>
            <div className={"input-group mb-"+props.margin}>
                {
                    props.icon_id !== undefined ? 
                    <span className="input-group-text" id={props.icon_id}><i className={"las" + " " +props.icon }></i></span>
                    :
                    ""
                }

                <input type={props.type} className="form-control" placeholder={props.placeholder} name={props.name} aria-describedby={props.icon_id} value={props.value} onChange={props.onChange} />
            </div>
        </>
    )

}

export default Input;