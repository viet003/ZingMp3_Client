import appReducer from "./appReducer"
import authReducer from "./authReducer"
import musicReducer from "./musicReducer"
import { combineReducers } from "redux"
import storage from "redux-persist/lib/storage"
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2"
import persistReducer from "redux-persist/es/persistReducer";


const commonConfig = {
    storage,
    stateReconciler: autoMergeLevel2
}

const authConfig = {
    ...commonConfig,
    key: 'auth',
    whitelist: ['isLoggedIn', 'token']
}

const musicConfig = {
    ...commonConfig,
    key: 'music',
    whitelist: ['curSongId', 'historyPlaylist','playlist'],
}

const rootReducers = combineReducers({
    auth: persistReducer(authConfig, authReducer),
    music: persistReducer(musicConfig, musicReducer),
    app: appReducer,
})

export default rootReducers