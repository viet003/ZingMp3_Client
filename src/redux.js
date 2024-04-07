import rootReducers from "./store/reducer/rootReducer";
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

const reduxConfig = () => {
    const store = createStore(rootReducers, applyMiddleware(thunk));
    return store;
}

export default reduxConfig;
