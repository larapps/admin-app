function FileUpload(props){
    return (
        <div className="input-group mb-4">
            <input type="file" className="form-control" id={props.id} aria-describedby={props.id} aria-label="Upload" onChange={props.onChange}/>
        </div>
    )
}

export default FileUpload;