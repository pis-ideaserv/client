import { Search as sr } from '../Actions/Types';

const initialState = {
    target  :   "users",
    open    :   false,
    value   :   '',

};

const Search = (state = initialState, action:any) => {
	switch (action.type) {
    	case sr.open:
            return{
                ...state,
                open : action.payload
            };
        case sr.target:
            return {
                ...state,
                target:action.payload
            };
        case sr.value:
            return{
                ...state,
                value : action.payload
            };
    	default:
      		return state;
 	}
}

export default Search;
