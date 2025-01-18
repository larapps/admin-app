import MenuItem from '../elements/MenuItem';

function MenuFooter(){

    const handleLogout = () => {
        document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location.href = "/";
    }

    return (
        <>
            <div className="menu-footer">
                <MenuItem 
                    icon="la-power-off" 
                    name="Logout" 
                    link="/"
                    onClick = {handleLogout}
                />
            </div>
        </>
    )
}

export default MenuFooter;