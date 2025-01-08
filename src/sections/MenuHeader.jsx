import LargeLogo from '../assets/img/logo.png';
import SmallLogo from '../assets/img/logo-small.png';

function MenuHeader(){

    return (
        <>
            <div className="page-logo">
                <img src={LargeLogo} className="logo-big"/> 
                <img src={SmallLogo} className="logo-small"/>
            </div>
        </>
    )

}

export default MenuHeader;