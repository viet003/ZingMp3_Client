import rootReducers from "./store/reducer/rootReducer";
import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist"
import { thunk } from "redux-thunk";

const reduxConfig = () => {
    const store = createStore(rootReducers, applyMiddleware(thunk));
    const persistor = persistStore(store)
    return { store, persistor };
}

export default reduxConfig;
