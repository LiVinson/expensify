import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";

export const ExpenseList = (props) => (
    <div>
        {
            props.expenses.length === 0 ? (
                <p>No Expenses to View</p>
            ): (
                props.expenses.map((expense) => (
                    <ExpenseListItem key={expense.id} {...expense} dispatch={props.dispatch} />
                ))
            )
        }
        
    </div>
);

//The stores state is passed in as the first argument
const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters) 
    }
}
//connect takes a function with the store's state passed in. The function return an object
//of which parts of the state are needed which are then passed into the component as props
export default connect(mapStateToProps)(ExpenseList);
