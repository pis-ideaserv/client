import { status as stat } from '../Actions/Types';

const initialState = {
	loggedIn    : false,
	error       : false,
	called 		: false,
};

const status = (state = initialState, action:any) =>{
	switch (action.type) {
    	case stat.loggedIn:
      		return {
				...state,
                loggedIn : action.payload
            }
        case stat.error:
            return {
                ...state,
                error : action.payload
			}
		case stat.called:
			return {
				...state,
				called : action.payload
			}
    	default:
      		return state;
 	}
}

export default status;