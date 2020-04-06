import { Users as users } from '../Actions/Types';

const initialState = {
	data : '',
	filter : false,
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
    	default:
      		return state;
 	}
}

export default Users;
