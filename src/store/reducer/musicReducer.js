import actionTypes from '../actions/actionTypes';

const initState = {
    curSongId: null,
    isPlaying: false,
    isPlayAtList: false,
    loadingSong: false,
    historyPlaylist: [],
    playlist: {
        title: null,
        data: null,
    }
}

const musicReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SET_CUR_SONG_ID:
            return {
                ...state,
                curSongId: action.sid || null
            }
        case actionTypes.SET_PLAY:
            return {
                ...state,
                isPlaying: action.isPlaying
            }
        case actionTypes.SET_PLAY_AT_LIST:
            return {
                ...state,
                isPlayAtList: action.isPlayAtList
            }
        case actionTypes.SET_PLAY_LIST:
            return {
                ...state,
                playlist: {
                    title: action.playlist?.title,
                    data: action.playlist?.song?.items
                }
            }
        case actionTypes.SET_HISTORY_SONG:
            return {
                ...state,
                historyPlaylist: [...action.historyPlaylist] || []
            }
        case actionTypes.LOADING_SONG:
            return {
                ...state,
                loadingSong: action.loadingSong
            }
        default:
            return state
    }
}

export default musicReducer