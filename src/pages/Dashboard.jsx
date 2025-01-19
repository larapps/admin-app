import '../assets/css/dashboard.css';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardPanel from '../panels/DashboardPanel';

function Dashboard(){
    return (
        <>
            <DashboardLayout>
                <div>
                    <div>
                        <DashboardPanel />
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

export default Dashboard;