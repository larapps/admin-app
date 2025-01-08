function DatePicker( props ){
    return (
        <>
            <label for="exampleFormControlInput1" class="form-label">{props.name}</label>
            <div id="reportrange" class="date-picker form-control">
                <i class="las la-calendar"></i>&nbsp;
                <span>December 10, 2024 - January 8, 2025</span>
            </div>
        </>
    )
}

export default DatePicker;