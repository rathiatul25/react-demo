import {combineReducers} from 'redux';
import PostReducer from './reducer_posts';
import DropDownReducer from './reducer_dropdown';
import MsgReducer from './message_reducer';
import {reducer as formReducer} from 'redux-form';
import AuthReducer from './auth_reducer';
import {reducer as toastrReducer} from 'react-redux-toastr'

const rootReducer = combineReducers({
   users:PostReducer,
   drop_down:DropDownReducer,
   msg:MsgReducer,
   auth:AuthReducer,
   form:formReducer,
   toastr: toastrReducer // <- Mounted at toastr.

});

export default rootReducer;


