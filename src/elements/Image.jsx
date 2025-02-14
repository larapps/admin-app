function Image(props){
    return (
        <img src={props.src} alt={props.alt} width={props.width} height={props.height} className={props.className} />
    );
}

export default Image;