import { status as stat} from '../Actions/Types';

const initialState = {
	loggedIn    : false,
	error       : false,
	caller		: false,
	graph 		: {}
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
		case stat.caller:
			return {
				...state,
				caller : action.payload
			}
		case stat.graph : 
			return {
				...state,
				graph : action.payload
			}
    	default:
      		return state;
 	}
}

export default status;