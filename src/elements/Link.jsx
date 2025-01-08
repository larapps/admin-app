function Link(props){
    return (
        <>
            <div className="mb-4 text-end">
  	            <a className="link-blue" href={props.href} >{props.name}</a>
            </div>
        </>
    )
}

export default Link;