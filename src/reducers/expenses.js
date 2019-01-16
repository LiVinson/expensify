// ------- Reducers: Handles the action Generators and returns an object for new state ----------------//

const expensesReducerDefaultState = []; 

export default (state = expensesReducerDefaultState, action) => {
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
