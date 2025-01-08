import '../assets/css/dashboard.css';
import DashboardLayout from '../layouts/DashboardLayout';
import Card from '../sections/Card';

function Dashboard(){
    return (
        <>
            <DashboardLayout>
                <div className="row">
                    <div className="col-md-4">
                        <Card title="Pie Chart" icon="">
                            <div className="piechart"></div>
                        </Card>
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

export default Dashboard;