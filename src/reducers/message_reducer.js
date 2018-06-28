import {SUCCESS_MSG} from "../actions/index";

export default function (state={},action) {
    switch (action.type){

        case SUCCESS_MSG:
            //console.log(...state);
                return {...state, message:action.payload};

        default :
            return state;
    }
}
