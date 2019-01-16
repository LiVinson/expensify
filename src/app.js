import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter.js";
import configureStore from "./store/configureStore";
import { addExpense, removeExpense, editExpense } from "./actions/expenses";
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";


const store = configureStore();

store.dispatch(addExpense({ description: "Water bill", amount: 3500, createdAt: 10000 }))
store.dispatch(addExpense({ description: "Gas bill", amount: 4500, createdAt: 5000 }))
store.dispatch(addExpense({ description: "Rent", amount: 109500, createdAt: 1000 }))

store.subscribe(() => {
    const state = store.getState();
    console.log(getVisibleExpenses(state.expenses, state.filters));
})

   const jsx = (<Provider store={store}>
        <AppRouter />
    </Provider>
   )

ReactDOM.render(jsx, document.getElementById('app'));

