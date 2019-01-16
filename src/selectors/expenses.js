import moment from "moment";

// Get Visible Expenses


export default (expenses, { text, sortBy, startDate, endDate}) => {

    return expenses.filter(expense => {
        const createdAtMoment = moment(expense.createdAt)
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, "day"): true; 
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, "day") : true;
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
