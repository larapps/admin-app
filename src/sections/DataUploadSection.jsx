import Card from '../sections/Card';
import FileUpload from '../elements/FileUpload';
import Table from '../elements/Table';
import Button from '../elements/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DatePicker from '../elements/DatePicker';
import { getCookie, getDateFormatted, userRedirectIfNeeded } from '../utils/utils';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import Radio from '../elements/Radio';
import Pagination from "react-js-pagination";

function DataUploadSection(){

    userRedirectIfNeeded();

    const [attendanceFile, setAttendanceFile] = useState([]);
    const [payrollFile, setPayrollFile] = useState([]);
    const [showError, setShowError] = useState(false);
    const [showTbl, setShowTbl] = useState('attendance');

    const attendanceColumns = [{ "name": "employeeId", "display": "Emp Id", "fixedClass": "column-1" }, { "name": "currentWorkingLocation", "display": "Curr Wrk Loc", "fixedClass": "column-2" }, { "name": "idEmpAttendance", "display": "Emp Attendance" }, { "name": "month", "display": "Month" }, { "name": "empType", "display": "Emp Type" }, { "name": "contractNumber", "display": "Contract Num" }, { "name": "designation", "display": "Designation" }, { "name": "workingSite", "display": "Working Site" }, { "name": "totalHour", "display": "Total Hour" }, { "name": "weeklyOff", "display": "Wkly Off" }, { "name": "advancePaidAnnualLeave", "display": "Adv Paid Annual Leave" }, { "name": "annualLeave", "display": "Annual Leave" }, { "name": "attendedDuration", "display": "Attended Duration" }, { "name": "clientOff", "display": "Client Off" }, { "name": "compensatoryDayoff", "display": "Comp Dayoff" }, { "name": "normalPlanning", "display": "Normal Planning" }, { "name": "otwithCompoff", "display": "OT With Compoff" }, { "name": "sickLeave", "display": "Sick Leave" }, { "name": "idUserCreated", "display": "User Created" }, { "name": "idUserModified", "display": "User Modified" }, { "name": "tsCreated", "display": "TS Created" }, { "name": "tsModified", "display": "TS Modified" }, { "name": "totalDays", "display": "Total Days" }];

    const payrollColumns = [ { "name": "employeeId", "display": "Emp Id", "fixedClass": "column-1" }, { "name": "currentWorkingLocation", "display": "Curr Wrk Loc", "fixedClass": "column-2" }, { "name": "idEmpWorkedDetails", "display": "Emp Worked Details" }, , { "name": "contractNumber", "display": "Contract Num" }, { "name": "month", "display": "Month" }, { "name": "earnedBasic", "display": "Earned Basic" }, { "name": "earnedExtraot", "display": "Earned Extra OT" }, { "name": "earnedNormalovertime", "display": "Earned Normal OT" }, { "name": "earnedNormalovertimeot68", "display": "Earned Normal OT68" }, { "name": "earnedPublicHolidayot", "display": "Earned Pub Holiday OT" }, { "name": "earnedRamadanot", "display": "Earned Ramadan OT" }, { "name": "earnedRamadanot68", "display": "Earned Ramadan OT68" }, { "name": "earnedSitebasic", "display": "Earned Site Basic" }, { "name": "earnedWeeklyoffot", "display": "Earned Wkly Off OT" }, { "name": "finesPerformanceBonus", "display": "Fines Performance Bonus" }, { "name": "foodAllowance", "display": "FA" }, { "name": "houserentalAllowance", "display": "HRA" }, { "name": "advanceDeducted", "display": "Advance Deducted" }, { "name": "benefits", "display": "Benefits" }, { "name": "corrections", "display": "Corrections" }, { "name": "maternity", "display": "Maternity" }, { "name": "otherAllowance", "display": "OA" }, { "name": "rolebasedAllowance", "display": "RBA" }, { "name": "salaryPayable", "display": "Salary Payable" }, { "name": "securityAllowance", "display": "Security Allowance" }, { "name": "serviceBenefits", "display": "Service Benefits" }, { "name": "sickness", "display": "Sickness" }, { "name": "sitebasedAllowance", "display": "SBA" }, { "name": "socialPension", "display": "Social Pension" }, { "name": "transportAllowance", "display": "TA" }, { "name": "vehicleAllowance", "display": "VA" }, { "name": "normalWorkingDays", "display": "Normal Working Days" }, { "name": "weeklyOffWorkingDays", "display": "Wkly Off Working Days" }, { "name": "idUserCreated", "display": "User Created" }, { "name": "idUserModified", "display": "User Modified" }, { "name": "tsCreated", "display": "Ts Created" }, { "name": "tsModified", "display": "Ts Modified" }, { "name": "totalDeduction", "display": "Total Deduction" }, { "name": "totalEarnings", "display": "Total Earnings" }];
    const [attendanceRows, setAttendanceRows] = useState([]);
    const [payRollRows, setPayRollRows] = useState([]);

    const [showTables, setShowTables] = useState(false);
    const [attendanceChecked, setAttendanceChecked] = useState(false);
    const [payrollChecked, setPayrollChecked] = useState(false);

    const [pageSize, setPageSize] = useState(10);
    const [pageNo, setPageNo] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [showPagination, setShowPagination ] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    const loadPageCount = () => {
        let url = 'http://localhost:8080/api/admin-service/data/getEmpAttendanceSearchCounts';
        if(!attendanceChecked){
            url = 'http://localhost:8080/api/admin-service/data/getEmpPayrollSearchCount';
        }
        let requestParams = {
            "month": getDateFormatted($("#month-selector").val()),
            "pageSize": pageSize,
            "pageNo": pageNo,
            "sortBy": "contractNumber",
            "idTenant": "1"
        };
        let headers = {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+getCookie('token')
            }
        };
        axios.post(url,requestParams,headers
        ).then((processResponse) => {
            if(parseInt(processResponse.data) <= pageSize){
                setShowPagination(false);
            }else{
                setShowPagination(true);
            }
            setPageNo(0);
            setTotalCount(processResponse.data);
            loadData();
        }).catch((err) => {
            setShowLoader(false);
            loadFailureToastServer();
            console.log("json");
        });        
    }

    const loadData = () => {
        if(attendanceChecked || payrollChecked){
            setShowLoader(true);
            let requestParams = {
                "month": getDateFormatted($("#month-selector").val()),
                "pageSize": "10",
                "pageNo": pageNo,
                "sortBy": "contractNumber",
                "idTenant": "1"
            };
            let headers = {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+getCookie('token')
                }
            };
    
            let url = "http://localhost:8080/api/admin-service/data/getEmpAttendanceSearchDetails";
            if(payrollChecked === true){
                url = "http://localhost:8080/api/admin-service/data/getEmpPayrollSearchDetails";
            }
            axios.all([
                axios.post(url, requestParams, headers)
            ]) .then(axios.spread((data) => {
                if(attendanceChecked){
                    setAttendanceRows(data.data);
                    setShowTbl('attendance');
                }else{
                    setPayRollRows(data.data);
                    setShowTbl('payroll');
                }
    
                setShowTables(true);
                setShowLoader(false);
    
            })).catch((err) => {
                setShowLoader(false);
                loadFailureToastServer();
                console.log("json");
            });
        }
    }

    // On file select (from the pop up)
    const onFileChange = (event) => {
        if((event.target.id).indexOf("attendance") !== -1){
            setAttendanceFile(event.target.files[0]);
        }else{
            setPayrollFile(event.target.files[0]);
        }

    };

    // On file upload (click the upload button)
    const onFileUpload = () => {
        console.log("file upload", payrollFile);
        setShowError(false);
        if($("#month-selector").val().trim() === '' || payrollFile.name === undefined || payrollFile.name.indexOf('.xlsx') === -1){
            setShowError(true);
            return false;
        }
        // Create an object of formData
        const formData = new FormData();
        

        // Update the formData object

        formData.append(
            "payrollFile",
            payrollFile,
            payrollFile.name
        );

        formData.append(
            "month",
            getDateFormatted($("#month-selector").val())
        );

        // Details of the uploaded file

        // Request made to the backend api
        // Send formData object
        setShowLoader(true);
        axios.post("http://localhost:8080/api/admin-service/data/uploadAttendanceAndCostingDetails",formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer '+getCookie('token')
            }}).then((processResponse) => {
                if(processResponse.data === true){
                    setPayrollChecked(true);
                    loadPageCount();
                    loadSuccessToast();
                }else{
                    setAttendanceRows([]);
                    setPayRollRows([]);
                    setShowTables(true);
                    loadFailureToast();
                }
            }).catch((err) => {
                setShowLoader(false);
                loadFailureToast();
                console.log("json");
            });
    };

    useEffect(() => {
        loadData();
    },[pageNo]);

    useEffect(() => {
        loadPageCount();
    },[attendanceChecked, payrollChecked]);

    const loadSuccessToast = () => {
        toast.success('File upload successfully', {
            position: 'bottom-right',
        });
    }

    const loadFailureToast = () => {
        toast.error('An error while uploading the file. Please try again later.', {
            position: 'bottom-right',
        });
    }

    const handleRadioClick = (event) => {
        console.log(event.target.id);
        if(event.target.id === 'attendance'){
            setPayrollChecked(!event.target.checked);
            setAttendanceChecked(event.target.checked);
        }else{
            setAttendanceChecked(!event.target.checked);
            setPayrollChecked(event.target.checked);
        }
    }

    const changePage = (page) => {
        setPageNo(page - 1);
    }

    const loadFailureToastServer = () => {
        toast.error('An internal error occured. Please try again later.', {
            position: 'bottom-right',
        });
      }

    return (
        <>
            <Card title="Data Upload" icon="la-cloud-upload-alt">
                <div className="container-inputs">

                    <FileUpload onChange = {onFileChange} id="payroll-file" label="Payroll"/>

                    <DatePicker  onChange={() => {}} />

                    <Button type="button" value="Upload" className="btn-blue" onClick={onFileUpload}/>
                    <Button type="button" value="Go for Process" className="btn-blue" alignment="width-full" onClick={() => window.location.href="/data-process"} />
                </div>

                {showError ? 
                    <div className="error-msg-container mt-2 text-danger mx-auto">
                        <p className="error-msg">Please select the dates and upload the files in .xlsx format.</p>
                    </div> 
                    :
                    ""
                }

                {
                    showTables ?
                    <>
                        <div className="d-flex justify-content-end checkbox-container">
                            <Radio name="attendance" id="attendance" label="Attendance" defaultChecked={attendanceChecked} onClick={handleRadioClick}/>
                            <Radio name="payroll" id="payroll" label="Payroll" defaultChecked={payrollChecked} onClick={handleRadioClick}/>
                        </div>
                        {
                            showTbl === 'attendance'  ? 
                                <Table title="Attendance" columns={attendanceColumns} rows={attendanceRows} />
                                
                            :
                                <Table title="Payroll" columns={payrollColumns} rows={payRollRows} />
                        }

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

export default DataUploadSection;