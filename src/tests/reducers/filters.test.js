import filtersReducer from "../../reducers/filters";
import moment from "moment";

test("should setup default filter values", () => {
    const state = filtersReducer(undefined, {  type: "@@INIT" });
    expect(state).toEqual({
        text: "",
        sortBy: "date",
        startDate: moment().startOf("month"),
        endDate: moment().endOf("month")
    })
});

test("should set sortBy to amount ", () => {
    const state = filtersReducer(undefined, { type: "SORT_BY_AMOUNT" });
    expect(state.sortBy).toBe("amount");
});

test("Should set sortBy to date", () => {
    const currentState = {
        text:"",
        startDate: undefined,
        endDate: undefined,
        sortBy: "amount"
    };
    const action = { type: "SORT_BY_DATE" };
    const state = filtersReducer(state, action);
    expect(state.sortBy).toBe("date");
});

test("Should set text filter", () => {
    const action = {
        type: "SET_FILTER_TEXT",
        textToFilterBy: "rent"
    };
    const state = filtersReducer(undefined, action);
    expect(state.text).toBe("rent");
});

test("Should set startDate filter", () => {
    const startDate = moment();
    const action = {
        type: "SET_START_DATE",
        startDate
    };
    const state = filtersReducer(undefined, action);
    expect(state.startDate).toEqual(startDate);
});

test("Should set endDate filter", () => {
    const endDate = moment();
    const action = {
        type: "SET_END_DATE",
        endDate
    };
    const state = filtersReducer(undefined, action);
    expect(state.endDate).toEqual(endDate);
});