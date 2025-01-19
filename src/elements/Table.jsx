import H4 from './H4';
import { useEffect, useState } from 'react';

/**
 * 
 * Props
 * title, columns and rows
 * 
 */
function Table({ columns, rows, title }){
    const roudingValue = 2;
    const capitalizeFirstLetter = (val) => {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    const checkIfNumber = (value, forClass, columnName) => {
        if(forClass){
            if(columnName === 'employeeId'){
                return "";
            }
            if(typeof(value) === 'number'){
                return "align-right";
            }else{
                return "";
            }
        }
        if(typeof(value) === 'number'){
            return value.toFixed(roudingValue);
        }
        return value;
    }
    return (
        <>
            
            <div className="pb-4 pt-2">
                <H4 className="table-title">{title}</H4>
                <div className="table-fixed-column-outter">
                    <div className="table-fixed-column-inner">
                        <table className="table-fixed-column table-fixed-column table table-bordered table-striped">
                            <thead>
                                <tr>
                                    {
                                    columns.map((col, index) => (
                                        <th key={index} style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }} className={col.fixedClass}>
                                            {capitalizeFirstLetter(col.display)}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                            {
                                rows.length > 0 ?
                                    rows.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {columns.map((col, colIndex) => (
                                        <td key={colIndex} style={{ border: "1px solid #ddd", padding: "8px" }} className={col.fixedClass+" "+checkIfNumber(row[col.name], true, col.name)}>
                                            {checkIfNumber(row[col.name], false)}
                                        </td>
                                        ))}
                                    </tr>
                                    ))
                                :
                                    <tr>
                                        <td>No Data Found</td>
                                    </tr>
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Table;