function MenuItem(props){
    return (
        <>
            <a className={props.className} href={props.link}>
                <i className={"las "+props.icon}></i> 
                <span>{props.name}</span>
            </a>
        </>
    );
}

export default MenuItem;