import MenuItem from '../elements/MenuItem';

function MenuLinks(){

    const currentLink = window.location.pathname.replace("/","");

    const links = [
        {
            name: 'Dashboard',
            link: 'dashboard',
            icon: 'la-home'
        },
        {
            name: 'Data Upload',
            link: 'data-upload',
            icon: 'la-cloud-upload-alt'
        },
        {
            name: 'Data Process',
            link: 'data-process',
            icon: 'la-save'
        },
        {
            name: 'Search',
            link: 'search',
            icon: 'la-search'
        }
    ];

    return (
        <>
            <div className="menu-list">
                <ul>
                    {
                        links.map(function(item, index){
                            return (
                                <>
                                    <li key={index}>
                                        <MenuItem key={index} {...item} className={currentLink == item.link ? "active" : ""}/>
                                    </li>
                                </>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    );
}

export default MenuLinks;