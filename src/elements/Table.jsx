import H4 from './H4';
import { useEffect, useState } from 'react';

/**
 * 
 * Props
 * title, columns and rows
 * 
 */
function Table({ columns, rows, title }){
    const capitalizeFirstLetter = (val) => {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }
    return (
        <>
            <div className="pb-4 pt-2">
                <H4>{title}</H4>
                <div className="container-table">
                    <table className="table table-bordered table-sm mb-4 container">
                        <thead>
                            <tr>
                                {
                                columns.map((col, index) => (
                                    <th key={index} style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
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
                                    <td key={colIndex} style={{ border: "1px solid #ddd", padding: "8px" }}>
                                        {row[col.name]}
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
        </>
    )
}

export default Table;