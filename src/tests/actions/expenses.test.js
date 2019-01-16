import { addExpense, editExpense, removeExpense } from "../../actions/expenses";

test("should create add expense action objct with provided values", () => {
    const expenseData = {
        description: "Rent",         
        amount: 109500, 
        createdAt: 1000,
        note: "First payment of the lease"
    }
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    })

});


test("should create add expense action objct with default values", () => {
    const action = addExpense();
    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: {
            id: expect.any(String),
            description: "",
            amount: 0, 
            createdAt: 0,
            note: ""
        }
    })
});


test("should set up remove expense action object", () => {
    const action = removeExpense({ id: "123abc"});
    expect(action).toEqual({
        type: "REMOVE_EXPENSE",
        id: "123abc"})
});

test("should set up edit expense action object", () => {
    const action = editExpense( "123abc", { amount: 5.00, description: "My bills!" });
    expect(action).toEqual({
        type: "EDIT_EXPENSE",
        id: "123abc",
        updates: {
            amount: 5.00,
            description: "My bills!"
        }
    })
})