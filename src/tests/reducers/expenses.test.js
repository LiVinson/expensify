import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("should set default state", ()=> {
    const state = expensesReducer(undefined, { type: "@@INIT" });
    expect(state).toEqual([]);
});

test("should remove expense with provided id", () => {
    const action = {
        type: "REMOVE_EXPENSE",
        id: "1"
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([ expenses[1], expenses[2] ])
});

test("should not remove expenses if id not found", ()=> {
    const action = {
        type: "REMOVE_EXPENSE",
        id: "-14"
    };

    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test("should add a new expenses", () => {

    const action = {
        type: "ADD_EXPENSE",
        expense: {
            id: "4",
            description: "water",
            amount: 4500,
            note: "",
            createdAt: 2000
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([ ...expenses, action.expense ]);
});

test("should edit existing  expenses", () => {
    const action = {
        type: "EDIT_EXPENSE",
        id: expenses[1].id,
        updates: {
            amount: 110000
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state[1]).toEqual({ ...expenses[1], ...action.updates });
});

test("should not edit expenses if id does not match", () => {
    const action = {
        type: "EDIT_EXPENSE",
        id: "-2",
        updates: {
            amount: 110000
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});
