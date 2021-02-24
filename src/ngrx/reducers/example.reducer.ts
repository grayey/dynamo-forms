import { Action } from "@ngrx/store";
import { Example } from "../../models/example.model";
import * as ExampleActions from "../actions/example.actions";


const initialState: Example  = {
  ex_no:"XXXX",
  ex_holder:"YYYY",
  ex_date:new Date().toISOString(),
  ex_code:"",
  ex_amount:5
}

function exampleReducer(state: Example[] = [initialState], action:ExampleActions.Actions){
  switch(action.type){
    case ExampleActions.ADD_EXAMPLE:
      return [action.payload, ...state];
      case ExampleActions.REMOVE_EXAMPLE:
        const newState = [...state];
        newState.splice(action.payload,1);
        return newState;
    default:
      return state;
  }

}

export default exampleReducer;
