import Card from '../sections/Card';
import FileUpload from '../elements/FileUpload';
import Table from '../elements/Table';
import Button from '../elements/Button';

function DataUploadSection(){
    return (
        <>
            <Card title="Data Upload" icon="la-cloud-upload-alt">
                <FileUpload />
                    
                <Table />

                <Button type="button" value="PROCESS" />
            </Card>
        </>
    )
}

export default DataUploadSection;