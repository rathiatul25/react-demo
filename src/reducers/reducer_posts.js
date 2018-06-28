//import {FETCH_POST,POST_SHOW,POST_DELETE,CREATE_POST,GET_COLORS} from "../actions/index";
import {FETCH_POST,POST_SHOW,POST_DELETE,POST_EDIT,CHECK_EMAIL} from "../actions/index";

import _ from 'lodash';


export default function (state={},action) {
    switch (action.type){
        case FETCH_POST:
            //return _.mapKeys(action.payload.data, 'id');//redux promise is using
            //return _.mapKeys(action.payload, 'id');//redux thunk is using
            //console.log(action.payload)
            return {...state, users:action.payload.users,pages:action.payload.pages};//redux thunk is using


        case POST_SHOW:

            return {...state, user_detail:action.payload };//redux thunk is using
            //return {...state, [action.payload.id]:action.payload };//redux thunk is using
            //return {...state, [action.payload.data.id]:action.payload.data };//redux promise is using

        case POST_EDIT:

        console.log(action.payload.members);
            return {...state, user_detail:action.payload.user,members:action.payload.members };//redux thunk is using
            //return {...state, [action.payload.user.id]:action.payload.user,members:action.payload.members };//redux thunk is using
        //return {...state, [action.payload.data.id]:action.payload.data };//redux promise is using

        case POST_DELETE:
            //console.log(state)
            return _.omit(state,action.payload);

        //case CREATE_POST:

            //return action.payload ;

        //case GET_COLORS:
          //  return {...state, colors:action.payload};

        case CHECK_EMAIL:
            return {...state, duplicate_email:action.payload};

        default :
            return state;
    }
}