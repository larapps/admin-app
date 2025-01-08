function Card(props){
    return (
        <>
            <div className="card">
                <div className="card-header"> 
                    { props.icon && <i class={"las "+props.icon}></i> } 
                    { props.title } 
                </div>

                <div className={"card-body "+(props.alignment ? props.alignment : "")}>
                    { props.children }
                </div>
            </div>
        </>
    );
}
export default Card;