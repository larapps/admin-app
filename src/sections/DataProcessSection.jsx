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
import { ToastContainer, toast } from 'react-toastify';

function DataProcessSection(){

    const columns = [
        {
          "name": "contractNumber",
          "display": "Contract Num",
          "fixedClass": "column-1"
        },
        {
          "name": "currentWorkingLocation",
          "display": "CWL",
            "fixedClass": "column-2"
        },
        {
          "name": "employeeId",
          "display": "Emp Id"
        },
        {
          "name": "designation",
          "display": "Designation"
        },
        {
          "name": "workType",
          "display": "Work Type"
        },
        // {
        //   "name": "totalNormalDays",
        //   "display": "Total Normal Days"
        // },
        {
          "name": "totaldays",
          "display": "Total Days"
        },
        {
          "name": "earnedBasic",
          "display": "Earned Basic"
        },
        {
          "name": "earnedSitebasic",
          "display": "Earned Site Basic"
        },
        {
          "name": "earnedNormalovertime",
          "display": "Earned Normal OT"
        },
        {
          "name": "earnedNormalovertimeot68",
          "display": "Earned Normal OT68"
        },
        {
          "name": "earnedExtraot",
          "display": "Earned Extra OT"
        },
        {
          "name": "earnedRamadanot",
          "display": "Earned Ramadan OT"
        },
        {
          "name": "earnedRamadanot68",
          "display": "Earned Ramadan OT68"
        },
        {
          "name": "earnedWeeklyoffot",
          "display": "Earned Wkly Off OT"
        },
        {
          "name": "earnedPublicholidayot",
          "display": "Earned Pub Holiday OT"
        },
        {
          "name": "securityAllowance",
          "display": "Security Allowance"
        },
        {
          "name": "rolebasedAllowance",
          "display": "Role Based Allowance"
        },
        {
          "name": "sitebasedAllowance",
          "display": "Site Based Allowance"
        },
        {
          "name": "foodAllowance",
          "display": "Food Allowance"
        },
        {
          "name": "houserentalAllowance",
          "display": "HRA"
        },
        {
          "name": "transportAllowance",
          "display": "Transport Allowance"
        },
        {
          "name": "vehicleAllowance",
          "display": "Vehicle Allowance"
        },
        {
          "name": "otherAllowance",
          "display": "Other Allowance"
        },
        {
          "name": "serviceBenefits",
          "display": "Service Benefits"
        },
        {
          "name": "benefits",
          "display": "Benefits"
        },
        {
          "name": "leaveSalary",
          "display": "Leave Salary"
        },
        {
          "name": "eosb",
          "display": "EOSB"
        },
        {
          "name": "medicine",
          "display": "Medicine"
        },
        {
          "name": "workmen",
          "display": "Workmen"
        },
        {
          "name": "vehicleRental",
          "display": "Veh Rent"
        },
        {
          "name": "training",
          "display": "Training"
        },
        {
          "name": "visa",
          "display": "Visa"
        },
        {
          "name": "transport",
          "display": "Transport"
        },
        {
          "name": "travel",
          "display": "Travel"
        },
        {
          "name": "accommodation",
          "display": "Accommodation"
        }
      ];
    const [rows, setRows] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [pageNo, setPageNo] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [showPagination, setShowPagination ] = useState(false);
    const [btnDisabled, setBtnDisabled ] = useState(true);

    const [showLoader, setShowLoader] = useState(false);

    const loadPageCount = () => {
      setShowLoader(true);
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
            setShowLoader(false);
            loadFailureToast();
            console.log("json");
        });        
    }


    const processData = () => {
        setShowLoader(true);
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
            setBtnDisabled(true);
            setShowPagination(false);
            if(processResponse.data === true){
                loadPageCount();
            }else{
                setRows([]);
                setShowTable(true);
            }
            setShowLoader(false);
        }).catch((err) => {
            setShowLoader(false);
            loadFailureToast();
            console.log("json");
        });
    }

    const getData = (pageNo = 0) => {
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
            setBtnDisabled(false);
            setRows(processResponse.data);
            setShowTable(true);
        }).catch((err) => {
            setShowLoader(false);
            loadFailureToast();
            console.log("json");
        });

    } 

    useEffect(() => {
      console.log("page chnaghed");
        // getData();
    },[pageNo]);

    const handleClick = (event) => {
        setShowLoader(true);
        processData();
    } 

    const changePage = (page) => {
      console.log("page", page);
        setPageNo(page - 1);
        getData(page - 1);
    }

    
    const exportData = () => {
      console.log("hello");
      setShowLoader(true);

      axios.post(
        "http://localhost:8080/api/admin-service/data/exportEmpCostingSearchDetails",
        {
            "month": getDateFormatted($("#month-selector").val()),
            "idTenant": "1"
        },
        {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+getCookie('token')
            },
            responseType: 'arraybuffer', 
      }).then((response) => {
        setShowLoader(false);
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'report_'+getDateFormatted($("#month-selector").val())+'.xlsx');
        document.body.appendChild(link);
        link.click();
        // loadSuccessToast();
      }).catch((err) => {
        setShowLoader(false);
        loadFailureToast();
        console.log("json");
      });
    }

    const loadFailureToast = () => {
      toast.error('An internal error occured. Please try again later.', {
          position: 'bottom-right',
      });
  }

    return (
        <>
            <Card title="Data Process" icon="la-save">
                <div className="container-inputs"> 
                    <DatePicker onChange={() => {}}/>

                    <Button type="button" value="PROCESS" onClick = {handleClick} alignment="align-right"/>
                    
                    <Button type="button" value="EXPORT" alignment="align-right" additionalClass={btnDisabled ? "disabled-btn" : ""} onClick = {exportData}/>
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

                {
                    showLoader ?
                    <>
                        <div className="loading-state">
                            <div className="loading"></div>
                        </div>
                    </>
                    :
                    ""
                }

            </Card>
            <ToastContainer />
        </>
    )
}

export default DataProcessSection;
