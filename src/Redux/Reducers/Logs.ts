import { Logs as log } from '../Actions/Types';


const initialState = {
	data 	: '',
	params : {
		page : 1,
		per_page : 10,
		filter : '',
	}
};

const Logs = (state = initialState, action:any) => {
	
	switch (action.type) {
    	case log.data:
      		return {
				...state,
        		data : action.payload,
			}
		case log.params:
			return {
				...state,
				params : action.payload,
			}
		
    	default:
      		return state;
 	}
}

export default Logs;
