import { createStore, combineReducers } from "redux";
import expensesReducer from "../reducers/expenses";
import filterReducer from "../reducers/filters";

// ------- Store Creation - Takes in and combines 2 reducers ----------------//

export default () => {
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filterReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
    );
    return store
}

