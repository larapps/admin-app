function Table(){

    const columns = ["#", "First", "Last", "Handle"];
    const rows = [["Mark", "Mark", "Otto", "@mdo"], ["Mark", "Mark", "Otto", "@mdo"], ["Mark", "Mark", "Otto", "@mdo"]];

    return (
        <>
            <table class="table table-bordered table-sm mb-4">
                <thead>
                    <tr>
                        {
                            columns.map( (item, index) => <th>{item}</th> )
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        rows.map(function(item, index){
                            return (
                                <>
                                    <tr>
                                        <td>{item[0]}</td>
                                        <td>{item[1]}</td>
                                        <td>{item[2]}</td>
                                        <td>{item[3]}</td>
                                    </tr>
                                </>
                            )
                        }) 
                    }
                </tbody>
            </table>
        </>
    )
}

export default Table;