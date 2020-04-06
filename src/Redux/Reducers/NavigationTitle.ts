import { NavigationTitle as NT} from '../Actions/Types';

const initialState = {
	title 	: '',
	control : '',
};

const NavigationTitle = (state = initialState, action:any) =>{
	switch (action.type) {
    	case NT:
      		return {
				...state,
				title : action.payload.title,
				control : action.payload.control,
			}
    	default:
      		return state;
 	}
}

export default NavigationTitle;