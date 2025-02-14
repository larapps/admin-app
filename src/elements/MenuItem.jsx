function MenuItem(props){
    return (
        <>
            <a key={props.key} className={props.className} href={props.link} onClick={props.onClick}>
                <i className={"las "+props.icon}></i> 
                <span>{props.name}</span>
            </a>
        </>
    );
}

export default MenuItem;