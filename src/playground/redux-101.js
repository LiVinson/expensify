import { createStore } from 'redux';



//If object is passed in with no incrementBy prop, set it equal to 1. If no object
//is passed in, set it equalt to empty object, and since the empty object does not have
//an incrementBy property, create one set = to 1
const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: "INCREMENT",
    incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: "DECREMENT",
    decrementBy
})

const setCount = ({ count = 101 } = {}) => ({
    type: "SET",
    count
})

const resetCount = () => ({
    type: "RESET"   
})

//Reducer
const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case "INCREMENT":
            return {
                count: state.count + action.incrementBy
            };
            break;
        case "DECREMENT":
           
            return {
                count: state.count - action.decrementBy
            };
            break;
        case "SET":
            return {
                count: action.count
            }
        case "RESET":
            return {
                count: 0
            };
            break;
        default:
            return state;
    } 
}

const store = createStore(countReducer);

//Runs functions when there is a change to the store
const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
})



//Actions: 

    // store.dispatch({
    //     type: "INCREMENT",
    //     incrementBy: 5
    // });

    store.dispatch(incrementCount({ incrementBy: 5 }));
    store.dispatch(incrementCount());


    // unsubscribe();
    store.dispatch(decrementCount({ decrementBy: 10 }));

    store.dispatch(decrementCount());

    store.dispatch(resetCount())


    store.dispatch(setCount({ count: 50 }));
  
    //Reset the count to zero