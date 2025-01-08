import Card from '../sections/Card';
import FileUpload from '../elements/FileUpload';
import Table from '../elements/Table';
import Button from '../elements/Button';

function DataProcessSection(){
    return (
        <>
            <Card title="Data Process" icon="la-save">
                <FileUpload />
                    
                <Table />

                <Button type="button" value="PROCESS" />
            </Card>
        </>
    )
}

export default DataProcessSection;