import { createStore, combineReducers } from "redux";
import uuid from "uuid"; 

//Flow: User provides input (i.e. information on creating an expense). This dispatchStore() function is called 
//with the appropriate action generator function and an object is passed into the function with the data.
//The action generator creates and returns an object that includes the type of action and any other
//needed data. This information is passed to all reducers that are set up but duw to switch/case action is only taken in the 
//appropriate reducer. Based on the type of action from the action generator, an object is returned representing 
//the new state, and the store is updated to match. 

// ------- Action Generators ----------------//

//ADD_EXPENSE
const addExpense = (
    { 
        description = "", 
        note = "",
        amount = 0, 
        createdAt = 0
    } = {}
) => ({
    type: "ADD_EXPENSE",
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
})

//REMOVE_EXPENSE
const removeExpense = ({ id }) => ({
    type: "REMOVE_EXPENSE",
    id
})

//EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id,
    updates
})


//SET_TEXT_FILTER

const setTextFilter = (textToFilterBy) => ({
    type: "SET_FILTER_TEXT",
    textToFilterBy
})

//SORT_BY_DATE
const sortByDate = () => ({ 
    type: "SORT_BY_DATE",
})

//SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: "SORT_BY_AMOUNT"
})


//SET_START_DATE
const setStartDate = (startDate) => ({
    type: "SET_START_DATE",
    startDate
})

//SET_END_DATE
const setEndDate = (endDate) => ({
    type: "SET_END_DATE",
    endDate
})
// ------- Reducers: Handles the action Generators and returns an object for new state ----------------//


const expensesReducerDefaultState = []; 
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type){
        case "ADD_EXPENSE":
           return [...state, action.expense]
        case "REMOVE_EXPENSE":
            return state.filter(expense => (expense.id !== action.id))
        case "EDIT_EXPENSE":
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense, //copies existing expense object
                        ...action.updates //overrides any properties user passes in
                    }
                } else {
                    return expense
                }
            })    
        default:
            return state
    }
}

//Filters Reducer
const filterReducerDefaultState = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
}

const filterReducer = (state = filterReducerDefaultState, action) => {
    switch(action.type) {
        case "SET_FILTER_TEXT":
            return {
                ...state,
                text: action.textToFilterBy
            }
        case "SORT_BY_DATE":
            return {
                ...state,
                sortBy: 'date'
            }
        case "SORT_BY_AMOUNT":
            return {
                ...state,
                sortBy: "amount"
            }
        case "SET_START_DATE":
            return {
                ...state,
                startDate: action.startDate
            }
        case "SET_END_DATE":
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state
    }
}



// Get Visible Expenses

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate}) => {

    return expenses.filter(expense => {
        const startDateMatch = typeof startDate !== "number" || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== "number" || expense.createdAt <= endDate;
        const textMatch = ((expense.description).toLowerCase()).includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === "date") { //returns most recent first
            return a.createdAt < b.createdAt ? 1 : -1 //a
        } else if (sortBy === "amount") {
            return a.amount <b.amount ? 1 : -1 // If a is less than b, return b.
        }
    })
}

// ------- Store Creation - Takes in and combines 2 reducers ----------------//
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filterReducer
    }) 
);

//Every time there is a change to the store, get the current state

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: -1000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: -21000 }));

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense( expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter("coffee"));
// store.dispatch(setTextFilter(""));

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(-2000))
// store.dispatch(setStartDate())
// store.dispatch(setEndDate(0))






const demoState = {
    expenses: [{
        id: "sfsdfsdfdsf",
        description: "January Rent",
        note: "This was the final payment for that address",
        amount: 54500,
        createdAt: 0
    }],
    filter: {
        text: "rent",
        sortBy: "amount", //date or amount
        startDate: undefined,
        endDate: undefined
    }
};

