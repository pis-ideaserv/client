import { Users as users } from '../Actions/Types';

const initialState = {
	data : '',
	filter : false,
	params : {
		page : 1,
		per_page : 10,
		filter : "",
	}
};

const Users = (state = initialState, action:any) => {
	
	switch (action.type) {
    	case users.data:
			return {
				...state,
        		data : action.payload,
			}
		case users.filter:
			return {
				...state,
				filter : action.payload
			}
		case users.params:
			return {
				...state,
				params : action.payload
			}
    	default:
      		return state;
 	}
}

export default Users;
