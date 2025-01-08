import MenuPanel from '../panels/MenuPanel';
import Header from '../sections/Header';

function DashboardLayout(props){
    return (
        <>
            <div className="main">
                <MenuPanel />
                
                <div className="main-content">
                    <Header />

                    <div className="content">

                        {props.children}
                    
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardLayout;

