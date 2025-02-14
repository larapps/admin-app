import '../assets/css/dashboard.css';
import DashboardLayout from '../layouts/DashboardLayout';
import DataProcessSection from '../sections/DataProcessSection';

function DataProcess(){
    return (
        <>
            <DashboardLayout>
                <DataProcessSection />
            </DashboardLayout>
        </>
    )
}

export default DataProcess;