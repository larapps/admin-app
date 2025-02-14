import '../assets/css/dashboard.css';
import DashboardLayout from '../layouts/DashboardLayout';
import DataUploadSection from '../sections/DataUploadSection';

function DataUpload(){
    return (
        <>
            <DashboardLayout>
                <DataUploadSection />
            </DashboardLayout>
        </>
    )
}

export default DataUpload;