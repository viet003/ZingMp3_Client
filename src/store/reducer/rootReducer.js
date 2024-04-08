import appReducer from "./appReducer"
import { combineReducers } from "redux"

const rootReducers = combineReducers({
    app: appReducer,
})

export default rootReducers