import DataTable from 'datatables.net-vue3'
import DataTablesLib from 'datatables.net'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import 'datatables.net-buttons-dt/css/buttons.dataTables.min.css'
import 'datatables.net-buttons/js/dataTables.buttons.min'
import 'datatables.net-buttons/js/buttons.html5.min'
import 'datatables.net-buttons/js/buttons.print.min'
import 'datatables.net-buttons/js/buttons.colVis.min'

DataTable.use(DataTablesLib)

export default DataTable;