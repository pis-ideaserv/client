import { Suppliers as sp } from '../Actions/Types';

const initialState = {
	data : '',
	table: {
		supplier_code	: {name : 'Supplier Code',show:false},
		supplier_name	: {name : 'Name',show:false},
		address			: {name : 'Address',show:false},
		contact_person 	: {name : 'Contact Person',show:false},
		contact_number	: {name : 'Contact Number',show:false},
		email			: {name : 'Email',show:false}
	},
	filter : false,
	status : "done",
	params : {
		page : 1,
		per_page : 10,
		filter : {
			supplier_code       : {filter:'iet',key:''},
			supplier_name       : {filter:'iet',key:''},
			address             : {filter:'iet',key:''},
			contact_person      : {filter:'iet',key:''},
			contact_number      : {filter:'iet',key:''},
			email               : {filter:'iet',key:''},
		},
	}
};

const Suppliers = (state = initialState, action:any) => {
	switch (action.type) {
    	case sp.data:
      		return {
				...state,
        		data :  action.payload,
			}
		case sp.filter:
			return {
				...state,
				filter : action.payload,
			}
		case sp.table: 
			return {
				...state,
				table : action.payload,
			}
		case sp.params:
			return{
				...state,
				params : action.payload,
			}
		case sp.status :
			return{
				...state,
				status : action.payload,
			}
    	default:
      		return state;
 	}
}

export default Suppliers;
