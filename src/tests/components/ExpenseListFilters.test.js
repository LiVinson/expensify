import React from "react";
import { shallow } from "enzyme";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { filters, altFilters } from "../fixtures/filters";
import expenses from "../fixtures/expenses";
import moment from "moment";

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});
test("should render ExpenseListFilters correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseListFilters with altDat correctly", () => {
  wrapper.setProps({
    filters: altFilters
  });
  expect(wrapper).toMatchSnapshot();
});

//should handle text change
test("should handle text change", () => {
  const value = "bills!";
  wrapper.find("input").simulate("change", {
    target: { value }
  });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

//should sort by date

test("should sort by date", () => {
  const value = "date";
  wrapper.setProps({
    filters: filters
  });
  wrapper.find("select").simulate("change", {
    target: { value }
  });
  expect(sortByDate).toHaveBeenCalled();
});

//should sort by amount
test("should sort by amount", () => {
  const value = "amount";
  wrapper.find("select").simulate("change", {
    target: { value }
  });
  expect(sortByAmount).toHaveBeenCalled();
});

//should handle date change

test("should handle date change", () => {
  const startDate = moment(0).subtract(1, "day");
  const endDate = moment(0).add(2, "days");

  wrapper.find("withStyles(DateRangePicker)").prop("onDatesChange")({
    startDate,
    endDate
  });

  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

// should handle date focus changes
test("should handle date focus changes", () => {
  const calendarFocused = "endDate";

  wrapper.find("withStyles(DateRangePicker)").prop("onFocusChange")(
    calendarFocused
  );
  expect(wrapper.state("calendarFocused")).toBe(calendarFocused);
});
