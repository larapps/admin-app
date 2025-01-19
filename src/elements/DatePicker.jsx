import { useState, useEffect } from 'react';

function DatePicker( props ){

    const [date, setDate] = useState([]);

    useEffect(() => {
        changeDate('');
    },[]);

    const changeDate = () => {
        let newDate;
        newDate = new Date();
        newDate = newDate.getFullYear() +"-"+ pad(newDate.getMonth() + 1, 2);
        setDate( newDate );
    }

    const onChangeDate = (event) => {
        console.log("event", event);
        setDate(event.target.value);
        props.onChange();
    }

    const pad = (num, size) => {
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
    }

    return (
        <>
            {/* {props.name ? <label for="month-selector" className="form-label">{props.name}</label> : ""} */}

            <input type="month" id="month-selector" name="month" className="form-control mb-4" value={date} onChange={onChangeDate }/>
        </>
    )
}

export default DatePicker;