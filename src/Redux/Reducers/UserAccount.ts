import { UserAccount as UA} from '../Actions/Types';

const initialState = {
    data : {}
};

const UserAccount = (state = initialState, action:any) => {
	switch (action.type) {
    	case UA:
      		return {
        		data :  action.payload,
            }
    	default:
      		return state;
 	}
}

export default UserAccount;
