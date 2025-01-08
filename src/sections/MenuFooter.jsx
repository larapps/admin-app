import MenuItem from '../elements/MenuItem';

function MenuFooter(){

    return (
        <>
            <div className="menu-footer">
                <MenuItem 
                    icon="la-power-off" 
                    name="Logout" 
                    link="/"
                />
            </div>
        </>
    )
}

export default MenuFooter;