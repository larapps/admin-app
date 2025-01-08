import MenuHeader from '../sections/MenuHeader';
import MenuLinks from '../sections/MenuLinks';
import MenuFooter from '../sections/MenuFooter';

function MenuPanel(){

    return (
        <>
            <div className="sidebar">
                <MenuHeader />

                <MenuLinks />

                <MenuFooter />

            </div>
        </>
    );
}

export default MenuPanel;