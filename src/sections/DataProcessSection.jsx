import Card from '../sections/Card';
import FileUpload from '../elements/FileUpload';
import Table from '../elements/Table';
import Button from '../elements/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DatePicker from '../elements/DatePicker';
import { getCookie, getDateFormatted } from '../utils/utils';
import $ from 'jquery';
import Pagination from "react-js-pagination";

function DataProcessSection(){

    const columns = [ { "name": "employeeId", "display": "Emp Id", "fixedClass": "column-1" }, { "name": "currentWorkingLocation", "display": "Curr Wrk Loc", "fixedClass": "column-2" },  { "name": "idEmpWorkingLocationCosting", "display": "Emp Wrk Loc Costing" }, { "name": "workType", "display": "Wrk Type" }, { "name": "empType", "display": "Emp Type" }, { "name": "month", "display": "Month" }, { "name": "contractNumber", "display": "Contract Num" }, { "name": "designation", "display": "Designation" }, { "name": "totalNormalDays", "display": "Total Normal Days" }, { "name": "totalWeeklyOffDays", "display": "Total WklyOff Days" }, { "name": "earnedBasic", "display": "Earned Basic" }, { "name": "earnedSitebasic", "display": "Earned Site Basic" }, { "name": "earnedExtraot", "display": "Earned Extra OT" }, { "name": "earnedNormalovertime", "display": "Earned Normal OT" }, { "name": "earnedNormalovertimeot68", "display": "Earned Normal OT68" }, { "name": "earnedPublicholidayot", "display": "Earned Pub Holiday OT" }, { "name": "earnedRamadanot", "display": "Earned Ramadan OT" }, { "name": "earnedRamadanot68", "display": "Earned Ramadan OT68" }, { "name": "earnedWeeklyoffot", "display": "Earned Wkly Off OT" }, { "name": "securityAllowance", "display": "SA" }, { "name": "rolebasedAllowance", "display": "RBA" }, { "name": "sitebasedAllowance", "display": "SBA" }, { "name": "foodAllowance", "display": "FA" }, { "name": "houserentalAllowance", "display": "HRA" }, { "name": "transportAllowance", "display": "TA" }, { "name": "vehicleAllowance", "display": "VA" }, { "name": "otherAllowance", "display": "OA" }, { "name": "weekoffAllowance", "display": "Wk off Allowance" }, { "name": "benefits", "display": "Benefits" }, { "name": "serviceBenefits", "display": "Service Benefits" }, { "name": "training", "display": "Training" }, { "name": "eosb", "display": "EOSB" }, { "name": "leaveSalary", "display": "Leave Salary" }, { "name": "medicine", "display": "Medicine" }, { "name": "travel", "display": "Travel" }, { "name": "transport", "display": "Transport" }, { "name": "vehicleRental", "display": "Vehicle Rental" }, { "name": "visa", "display": "Visa" }, { "name": "accommodation", "display": "Accommodation" }, { "name": "workmen", "display": "Workmen" }, { "name": "idUserCreated", "display": "User Created" }, { "name": "idUserModified", "display": "User Modified" }, { "name": "totalDeduction", "display": "Total Deduction" }, { "name": "totalEarnings", "display": "Total Earnings" }];
    const [rows, setRows] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [pageNo, setPageNo] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [showPagination, setShowPagination ] = useState(false);

    const loadPageCount = () => {
        axios.post(
            "http://localhost:8080/api/admin-service/data/getEmpCostingDataSearchCount",
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
            if(parseInt(processResponse.data) <= pageSize){
                setShowPagination(false);
            }else{
                setShowPagination(true);
            }
            setPageNo(0);
            setTotalCount(processResponse.data);
            getData();
        }).catch((err) => {
            console.log("json");
        });        
    }


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
            setShowPagination(false);
            if(processResponse.data === true){
                loadPageCount();
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
    },[pageNo]);

    const handleClick = (event) => {
        processData();
        setShowTable(true);
    } 

    const changePage = (page) => {
        setPageNo(page - 1);
    }


    return (
        <>
            <Card title="Data Process" icon="la-save">
                <div className="container-inputs"> 
                    <DatePicker onChange={() => {}}/>

                    <Button type="button" value="PROCESS" onClick = {handleClick} alignment="align-right"/>
                </div>

                {
                    showTable ?
                        <>
                            <Table title="" columns={columns} rows={rows} />
                            {
                                showPagination ? 
                                    <Pagination
                                        activePage={pageNo + 1}
                                        itemsCountPerPage={pageSize}
                                        totalItemsCount={totalCount}
                                        pageRangeDisplayed={5}
                                        onChange={changePage}
                                    />
                                :
                                    ""
                            }
                        </>
                    :
                    ""
                }

            </Card>
        </>
    )
}

export default DataProcessSection;