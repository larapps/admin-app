import MenuItem from '../elements/MenuItem';
import $ from 'jquery';

function Header(){
    const menuToggle = () => {
        $(".sidebar").toggleClass('active')
    }
    return (
        <>
           <nav className="right-header">
                <MenuItem className="menu-bar" link="#" icon="la-bars" name="" onClick={menuToggle}/>
            </nav>
        </>
    )
}

export default Header;