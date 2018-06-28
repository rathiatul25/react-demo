import {GET_COLORS} from "../actions/index";
import {FETCH_COUNTRY} from "../actions/index";
import {FETCH_STATE} from "../actions/index";
import {GET_SUGGESTION} from "../actions/index";

export default function (state={},action) {
    switch (action.type){


        case GET_COLORS:
            //console.log({...state, colors:action.payload});
            //return action.payload;
            return {...state, colors:action.payload};

        case FETCH_COUNTRY:
            return {...state, countries:action.payload.countries};

        case FETCH_STATE:
            console.log(action.payload);
            return {...state, state_names:action.payload.state_names};

        case GET_SUGGESTION:
            console.log(action.payload);
            return {...state, suggestions:action.payload.state_names};

        default :
            return state;
    }
}