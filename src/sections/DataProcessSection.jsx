import Card from '../sections/Card';
import FileUpload from '../elements/FileUpload';
import Table from '../elements/Table';
import Button from '../elements/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DatePicker from '../elements/DatePicker';
import { getCookie, getDateFormatted } from '../utils/utils';
import $ from 'jquery';
import Pagination from './Pagination';

function DataProcessSection(){

    const columns = [ { "name": "idEmpWorkingLocationCosting", "display": "idEmpWorkingLocationCosting" }, { "name": "employeeId", "display": "employeeId" }, { "name": "workType", "display": "workType" }, { "name": "empType", "display": "empType" }, { "name": "month", "display": "month" }, { "name": "contractNumber", "display": "contractNumber" }, { "name": "currentWorkingLocation", "display": "currentWorkingLocation" }, { "name": "designation", "display": "designation" }, { "name": "totalNormalDays", "display": "totalNormalDays" }, { "name": "totalWeeklyOffDays", "display": "totalWeeklyOffDays" }, { "name": "earnedBasic", "display": "earnedBasic" }, { "name": "earnedSitebasic", "display": "earnedSitebasic" }, { "name": "earnedExtraot", "display": "earnedExtraot" }, { "name": "earnedNormalovertime", "display": "earnedNormalovertime" }, { "name": "earnedNormalovertimeot68", "display": "earnedNormalovertimeot68" }, { "name": "earnedPublicholidayot", "display": "earnedPublicholidayot" }, { "name": "earnedRamadanot", "display": "earnedRamadanot" }, { "name": "earnedRamadanot68", "display": "earnedRamadanot68" }, { "name": "earnedWeeklyoffot", "display": "earnedWeeklyoffot" }, { "name": "securityAllowance", "display": "securityAllowance" }, { "name": "rolebasedAllowance", "display": "rolebasedAllowance" }, { "name": "sitebasedAllowance", "display": "sitebasedAllowance" }, { "name": "foodAllowance", "display": "foodAllowance" }, { "name": "houserentalAllowance", "display": "houserentalAllowance" }, { "name": "transportAllowance", "display": "transportAllowance" }, { "name": "vehicleAllowance", "display": "vehicleAllowance" }, { "name": "otherAllowance", "display": "otherAllowance" }, { "name": "weekoffAllowance", "display": "weekoffAllowance" }, { "name": "benefits", "display": "benefits" }, { "name": "serviceBenefits", "display": "serviceBenefits" }, { "name": "training", "display": "training" }, { "name": "eosb", "display": "eosb" }, { "name": "leaveSalary", "display": "leaveSalary" }, { "name": "medicine", "display": "medicine" }, { "name": "travel", "display": "travel" }, { "name": "transport", "display": "transport" }, { "name": "vehicleRental", "display": "vehicleRental" }, { "name": "visa", "display": "visa" }, { "name": "accommodation", "display": "accommodation" }, { "name": "workmen", "display": "workmen" }, { "name": "totalDeduction", "display": "totalDeduction" }, { "name": "totalEarnings", "display": "totalEarnings" }, { "name": "idUserCreated", "display": "idUserCreated" }, { "name": "idUserModified", "display": "idUserModified" }];
    const [rows, setRows] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [pageNo, setPageNo] = useState(0);


    const processData = () => {
        axios.post(
            "http://localhost:8080/api/admin-service/data/processData",
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
            console.log("processResponse", processResponse);
            if(processResponse.data === true){
                getData();   
            }else{
                setRows([]);
                setShowTable(true);
            }
        }).catch((err) => {
            console.log("json");
        });
    }

    const getData = () => {
        axios.post(
                "http://localhost:8080/api/admin-service/data/getEmpCostingSearchDetails",
                 {
                "month": getDateFormatted($("#month-selector").val()),
                "pageSize": "10",
                "pageNo": pageNo,
                "sortBy": "contractNumber",
                "idTenant": "1"
            },
            {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+getCookie('token')
            }
          }
        ).then((processResponse) => {
            setRows(processResponse.data);

        }).catch((err) => {
            console.log("json");
        });

    } 

    useEffect(() => {
        getData();
    },[]);

    const handleClick = (event) => {
        processData();
        setShowTable(true);
    } 

    return (
        <>
            <Card title="Data Process" icon="la-save">
                <div className="container-inputs"> 
                    <DatePicker />

                    <Button type="button" value="PROCESS" onClick = {handleClick} alignment="align-right"/>
                </div>

                {
                    showTable ?
                        <>
                            <Table title="" columns={columns} rows={rows} />
                            <Pagination handleNext={() => setPageNo(pageNo + 1)} handlePrevious={() => setPageNo(pageNo - 1)}/>
                        </>
                    :
                    ""
                }

            </Card>
        </>
    )
}

export default DataProcessSection;