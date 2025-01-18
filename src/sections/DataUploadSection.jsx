import Card from '../sections/Card';
import FileUpload from '../elements/FileUpload';
import Table from '../elements/Table';
import Button from '../elements/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DatePicker from '../elements/DatePicker';
import { getCookie, getDateFormatted, userRedirectIfNeeded } from '../utils/utils';
import $ from 'jquery';

function DataUploadSection(){

    userRedirectIfNeeded();

    const [attendanceFile, setAttendanceFile] = useState([]);
    const [payrollFile, setPayrollFile] = useState([]);
    const [showError, setShowError] = useState(false);

    const attendanceColumns = [{ "name": "idEmpAttendance", "display": "idEmpAttendance" }, { "name": "employeeId", "display": "employeeId" }, { "name": "month", "display": "month" }, { "name": "empType", "display": "empType" }, { "name": "contractNumber", "display": "contractNumber" }, { "name": "currentWorkingLocation", "display": "currentWorkingLocation" }, { "name": "designation", "display": "designation" }, { "name": "workingSite", "display": "workingSite" }, { "name": "totalDays", "display": "totalDays" }, { "name": "totalHour", "display": "totalHour" }, { "name": "weeklyOff", "display": "weeklyOff" }, { "name": "advancePaidAnnualLeave", "display": "advancePaidAnnualLeave" }, { "name": "annualLeave", "display": "annualLeave" }, { "name": "attendedDuration", "display": "attendedDuration" }, { "name": "clientOff", "display": "clientOff" }, { "name": "compensatoryDayoff", "display": "compensatoryDayoff" }, { "name": "normalPlanning", "display": "normalPlanning" }, { "name": "otwithCompoff", "display": "otwithCompoff" }, { "name": "sickLeave", "display": "sickLeave" }, { "name": "idUserCreated", "display": "idUserCreated" }, { "name": "idUserModified", "display": "idUserModified" }, { "name": "tsCreated", "display": "tsCreated" }, { "name": "tsModified", "display": "tsModified" }];

    const payrollColumns = [ { "name": "idEmpWorkedDetails", "display": "idEmpWorkedDetails" }, { "name": "employeeId", "display": "employeeId" }, { "name": "contractNumber", "display": "contractNumber" }, { "name": "currentWorkingLocation", "display": "currentWorkingLocation" }, { "name": "month", "display": "month" }, { "name": "earnedBasic", "display": "earnedBasic" }, { "name": "earnedExtraot", "display": "earnedExtraot" }, { "name": "earnedNormalovertime", "display": "earnedNormalovertime" }, { "name": "earnedNormalovertimeot68", "display": "earnedNormalovertimeot68" }, { "name": "earnedPublicHolidayot", "display": "earnedPublicHolidayot" }, { "name": "earnedRamadanot", "display": "earnedRamadanot" }, { "name": "earnedRamadanot68", "display": "earnedRamadanot68" }, { "name": "earnedSitebasic", "display": "earnedSitebasic" }, { "name": "earnedWeeklyoffot", "display": "earnedWeeklyoffot" }, { "name": "finesPerformanceBonus", "display": "finesPerformanceBonus" }, { "name": "foodAllowance", "display": "foodAllowance" }, { "name": "houserentalAllowance", "display": "houserentalAllowance" }, { "name": "advanceDeducted", "display": "advanceDeducted" }, { "name": "benefits", "display": "benefits" }, { "name": "corrections", "display": "corrections" }, { "name": "maternity", "display": "maternity" }, { "name": "otherAllowance", "display": "otherAllowance" }, { "name": "rolebasedAllowance", "display": "rolebasedAllowance" }, { "name": "salaryPayable", "display": "salaryPayable" }, { "name": "securityAllowance", "display": "securityAllowance" }, { "name": "serviceBenefits", "display": "serviceBenefits" }, { "name": "sickness", "display": "sickness" }, { "name": "sitebasedAllowance", "display": "sitebasedAllowance" }, { "name": "socialPension", "display": "socialPension" }, { "name": "totalDeduction", "display": "totalDeduction" }, { "name": "totalEarnings", "display": "totalEarnings" }, { "name": "transportAllowance", "display": "transportAllowance" }, { "name": "vehicleAllowance", "display": "vehicleAllowance" }, { "name": "normalWorkingDays", "display": "normalWorkingDays" }, { "name": "weeklyOffWorkingDays", "display": "weeklyOffWorkingDays" }, { "name": "idUserCreated", "display": "idUserCreated" }, { "name": "idUserModified", "display": "idUserModified" }, { "name": "tsCreated", "display": "tsCreated" }, { "name": "tsModified", "display": "tsModified" }];
    const [attendanceRows, setAttendanceRows] = useState([]);
    const [payRollRows, setPayRollRows] = useState([]);

    const [showTables, setShowTables] = useState(false);

    const loadData = () => {
        let requestParams = {
            "month": getDateFormatted($("#month-selector").val()),
            "pageSize": "10",
            "pageNo": "0",
            "sortBy": "contractNumber",
            "idTenant": "1"
        };
        let headers = {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+getCookie('token')
            }
        };
        axios.all([
            axios.post(`http://localhost:8080/api/admin-service/data/getEmpAttendanceSearchDetails`, requestParams, headers), 
            axios.post(`http://localhost:8080/api/admin-service/data/getEmpPayrollSearchDetails`, requestParams, headers)
        ]) .then(axios.spread((data1, data2) => {
            setAttendanceRows(data1.data);
            setPayRollRows(data2.data);
            setShowTables(true);

        })).catch((err) => {
            console.log("json");
        });
    }

    // On file select (from the pop up)
    const onFileChange = (event) => {
        console.log("index", (event.target.id).indexOf("attendance"));
        if((event.target.id).indexOf("attendance") !== -1){
            setAttendanceFile(event.target.files[0]);
        }else{
            setPayrollFile(event.target.files[0]);
        }

    };

    // On file upload (click the upload button)
    const onFileUpload = () => {
        console.log("file upload",attendanceFile, payrollFile);
        setShowError(false);
        if($("#month-selector").val().trim() === '' || payrollFile.name === undefined || attendanceFile.name === undefined){
            setShowError(true);
            return false;
        }
        // Create an object of formData
        const formData = new FormData();
        

        // Update the formData object
        formData.append(
            "attendanceFile",
            attendanceFile,
            attendanceFile.name
        );

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
        axios.post("http://localhost:8080/api/admin-service/data/uploadAttendanceAndCostingDetails",formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer '+getCookie('token')
            }}).then((processResponse) => {
                if(processResponse.data === true){
                    loadData();
                }else{
                    setAttendanceRows([]);
                    setPayRollRows([]);
                    setShowTables(true);
                }
            }).catch((err) => {
                console.log("json");
            });
    };

    useEffect(() => {
        // loadData();
    },[]);

    return (
        <>
            <Card title="Data Upload" icon="la-cloud-upload-alt">
                {showError ? 
                    <div className="error-msg-container mt-2 text-danger mx-auto">
                        <p className="error-msg text-center">Please select the dates and upload the files.</p>
                    </div> 
                    :
                    ""
                }
                <div className="container-inputs">
                    <FileUpload onChange = {onFileChange} id="attendance-file"/>

                    <FileUpload onChange = {onFileChange} id="payroll-file"/>

                    <DatePicker />
                    <Button type="button" value="Upload" className="btn-blue" onClick={onFileUpload} alignment="align-right"/>
                </div>


                {
                    showTables ?
                    <> 
                        <Table title="Attendance" columns={attendanceColumns} rows={attendanceRows} />
                        <Table title="Payroll" columns={payrollColumns} rows={payRollRows} />
                    </>
                    :
                    ""
                }



            </Card>
        </>
    )
}

export default DataUploadSection;