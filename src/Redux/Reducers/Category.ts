import { Category as ct } from '../Actions/Types';

const initialState:any = [];

const Category = (state = initialState, action:any) =>{
	switch (action.type) {
    	case ct:
      		return action.payload;
    	default:
      		return state;
 	}
}

export default Category;