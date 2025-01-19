import Card from '../sections/Card';
import PieChart from '../sections/PieChart';
import axios from 'axios';
import DatePicker from '../elements/DatePicker';
import $ from 'jquery';
import { useState, useEffect } from 'react';
import { getCookie, getDateFormatted } from '../utils/utils';

function DashboardPanel(){
    const [data, setData] = useState([]);
    const [workingLocation, setWorkingLocation] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [earnings, setEarnings] = useState([]);
    const [showChart, setShowChart] = useState(false);

    const getData = () => {
        console.log("gewtData");
      axios.post(
        "http://localhost:8080/api/admin-service/data/getEmpCostingSummaryByMonth",
        {
        "month": getDateFormatted($("#month-selector").val()),
        "idTenant": "1"
        },
        {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+getCookie('token')
        }
        }
        ).then((processResponse) => {
          let location = [];
          let employees = [];
          let earnings = [];
          if(processResponse.data.length > 0){
            processResponse.data.map(function(item, index){
              location.push(item.currentWorkingLocation);
              employees.push(item.employeeCount);
              earnings.push(item.totalEarnings);
            })
            console.log("location", location);
            console.log("employee", employees);
            setWorkingLocation(location);
            setEmployees(employees);
            setEarnings(earnings);
            setData(processResponse.data);
            setShowChart(true);
          }else{
            setWorkingLocation([]);
            setEmployees([]);
            setEarnings([]);
            setData([]);
            setShowChart(false);
          }
        }).catch((err) => {
        console.log("json");
        });
      }
  
      useEffect(() => {
        getData();
      },[]);

    return (
        <>
            <div className="col-md-4">
              <DatePicker onChange={() => {getData();}} />
            </div>
            <div>
              {
                showChart ?
                <>
                  <div className="d-flex container-dashboard justify-content-center">
                    <Card title="Current Work Location vs Employees" icon="">
                        <div>
                            <PieChart location={workingLocation} labels={workingLocation} data={employees} label="Current Work Location vs Employees"/>
                        </div>
                    </Card>

                    <Card title="Current Work Location vs Costing" icon="">
                        <div>
                            <PieChart location={workingLocation} labels={workingLocation} data={earnings} label="Costs"/>
                        </div>
                    </Card>
                  </div>
                </>
                :
                <>
                  <div className="d-flex container-dashboard">
                    <Card title="No. of Employees" icon="">
                        <div>
                          No Data Found
                        </div>
                    </Card>

                    <Card title="Cost" icon="">
                        <div>
                          No Data Found
                        </div>
                    </Card>
                  </div>
                </>
              }

            </div>
        </>
    );
}

export default DashboardPanel;