import Card from '../sections/Card';
import FileUpload from '../elements/FileUpload';
import Table from '../elements/Table';
import Button from '../elements/Button';
import DatePicker from '../elements/DatePicker';

function DataSearchSection(){
    return (
        <>
            <Card title="Search" icon="la-search">
                <div class="row">
                    <div class="col-md-5 mb-4">
                        <DatePicker name="Select Date" />
                    </div>
                </div>
                
                <Table />

                <Button type="button" value="SEARCH" />
            </Card>
        </>
    )
}

export default DataSearchSection;