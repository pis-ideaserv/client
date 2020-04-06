import { Notifications as AC } from '../Actions/Types';

const initialState = {
	data 	: "",
	params	: {
		page : 1,
		per_page : 10,
		filter : "",
	},
	status 	: "done"
};

const Notifications = (state = initialState, action:any) =>{
	switch (action.type) {
    	case AC.data:
			return {
				...state,
				data : action.payload
			}
		case AC.params:
			return {
				...state,
				params : action.payload
			}
		case AC.status:
			return{
				...state,
				status : action.payload
			}
    	default:
      		return state;
 	}
}

export default Notifications;