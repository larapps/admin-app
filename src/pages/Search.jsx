import '../assets/css/dashboard.css';
import DashboardLayout from '../layouts/DashboardLayout';
import DataSearchSection from '../sections/DataSearchSection';

function Search(){
    return (
        <>
            <DashboardLayout>
                <DataSearchSection />
            </DashboardLayout>
        </>
    )
}

export default Search;