import { MasterCodes as MC } from '../Actions/Types';

const initialState = {
	data 	: "",
	params	: {
		page : 1,
		per_page : 10,
		filter : "",
	},
	status 	: "done"
};

const MasterCodes = (state = initialState, action:any) =>{
	switch (action.type) {
    	case MC.data:
			return {
				...state,
				data : action.payload
			}
		case MC.params:
			return {
				...state,
				params : action.payload
			}
		case MC.status:
			return{
				...state,
				status : action.payload
			}
    	default:
      		return state;
 	}
}

export default MasterCodes;