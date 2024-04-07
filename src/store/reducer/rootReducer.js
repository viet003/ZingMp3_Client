import appReducer from "./appReducer"
import { combineReducers, applyMiddleware } from "redux"

const rootReducers = combineReducers({
    app: appReducer,
})

export default rootReducers