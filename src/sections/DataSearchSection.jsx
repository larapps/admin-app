import Card from '../sections/Card';
import FileUpload from '../elements/FileUpload';
import Table from '../elements/Table';
import Button from '../elements/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DatePicker from '../elements/DatePicker';
import { getCookie, getDateFormatted } from '../utils/utils';
import $ from 'jquery';
import Input from '../elements/Input';
import Pagination from "react-js-pagination";
import { ToastContainer, toast } from 'react-toastify';

function DataSearchSection(){

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
          "display": "Vehile Allowance"
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

    const [location, setLocation] = useState('');
    const [employeeId, setEmployeeId] = useState('');

    const [pageSize, setPageSize] = useState(10);
    const [pageNo, setPageNo] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [showPagination, setShowPagination ] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    const loadPageCount = () => {
        setShowLoader(true);
        axios.post(
            "http://localhost:8080/api/admin-service/data/getEmpCostingDataSearchCount",
            {
                "month": getDateFormatted($("#month-selector").val()),
                "employeeId": employeeId,
                "workingLocation": location,
                "pageSize": pageSize,
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
            setTotalCount(processResponse.data);
            setPageNo(0);
            searchData();
        }).catch((err) => {
            setShowLoader(false);
            loadFailureToast();
            console.log("json");
        });        
    }

    const searchData = () => {
        axios.post(
            "http://localhost:8080/api/admin-service/data/getEmpCostingDataSearchDetails",
            {
                "month": getDateFormatted($("#month-selector").val()),
                "employeeId": employeeId,
                "workingLocation": location,
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
            setShowLoader(false);
        }).catch((err) => {
            console.log("json");
            setShowLoader(false);
            loadFailureToast();
        });
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
        // console.log("response", response);
        setShowLoader(false);
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'report_'+getDateFormatted($("#month-selector").val())+'.xlsx');
        document.body.appendChild(link);
        link.click();
    }).catch((err) => {
      console.log("json");
      setShowLoader(false);
      loadFailureToast();
  });
    }

    useEffect(() => {
        searchData();
        console.log("page changed");
    },[pageNo]);

    const handleClick = (event) => {
        loadPageCount();
        setShowTable(true);
        console.log("handleClick");
    }

    const changePage = (page) => {
      console.log("page", page);
        setPageNo(page - 1);
    }

    const loadFailureToast = () => {
      toast.error('An internal error occured. Please try again later.', {
          position: 'bottom-right',
      });
  }

    return (
        <>
            <Card title="Data Search" icon="la-search">
                <div className="container-inputs">
                    <Input type="text"
                        name= "employeeId"
                        id="employeeId"
                        placeholder="Employee ID"
                        margin="4"
                        value={employeeId}
                        onChange = {e => setEmployeeId(e.target.value)}
                    />

                    <Input type="text"
                        name= "working_location"
                        id="working_location"
                        placeholder="Working Location"
                        margin="4"
                        value={location}
                        onChange = {e => setLocation(e.target.value)}
                    />

                    <DatePicker  onChange={() => {}} />
                    
                    <Button type="button" value="SEARCH" alignment="align-right" onClick = {handleClick}/>

                    <Button type="button" value="EXPORT" alignment="align-right" onClick = {exportData}/>
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
                        <div class="loading-state">
                            <div class="loading"></div>
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

export default DataSearchSection;
