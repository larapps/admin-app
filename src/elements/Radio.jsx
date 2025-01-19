function Radio(props){
    return (
        <>
            <div>
                <input type="radio" name={props.name} id={props.id} checked={props.defaultChecked} onClick={props.onClick} />
                <label className="ml-2">{props.label}</label>
            </div>
        </>
    )
}

export default Radio;