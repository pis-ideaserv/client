import { Products as pr } from '../Actions/Types';


type asc = null | boolean;
type status = "pending" | "done";



let ascVal:asc = null;
let stat:status = "done";

const initialState = {
	data 	: '',
	table	: {
		supplier_code	: {name : 'Supplier Code',		show : true, asc : ascVal},
		supplier_name	: {name : 'Supplier Name',		show : true, asc : ascVal},
		product_code	: {name : 'Product Code',		show : true, asc: ascVal},
		product_name	: {name : 'Product Name',		show : true,asc:ascVal},
		category		: {name : 'Category',			show : true,asc:ascVal},
		serial			: {name : 'Serial Number',		show : true,asc:ascVal},
		warranty		: {name : 'Warranty',			show : false,asc:ascVal},
		warranty_start	: {name : 'Warranty Start',		show : false,asc:ascVal},
		warranty_end	: {name : 'Warranty End',		show : false,asc:ascVal},
		status			: {name : 'Status',				show : false,asc:ascVal},
		delivery_date	: {name : 'Delivery Date',		show : false,asc:ascVal},
		reference_delivery_document	: {name : 'Delivery Document',	show : false,asc:ascVal},
		created_by		: {name : 'Created By',			show : false,asc:ascVal},
		remarks 		: {name : 'Remarks',			show : false,asc:ascVal}
	},
	graph : {},
	filter : false,
	status : stat,
	params : {
		page : 1,
		per_page : 10,
	}
};

const Products = (state = initialState, action:any) => {
	
	switch (action.type) {
    	case pr.data:
      		return {
				...state,
        		data : action.payload,
			}
		case pr.table:
			return {
				...state,
				table : action.payload,
			}
		case pr.filter:
			return{
				...state,
				filter : action.payload
			}
		case pr.params:
			return{
				...state,
				params : action.payload
			}
		case pr.status:
			return{
				...state,
				status : action.payload
			}
		case pr.graph :
			return{
				...state,
				graph : action.payload,
			}
    	default:
      		return state;
 	}
}

export default Products;
