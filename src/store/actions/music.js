import actionTypes from "./actionTypes";
import * as controller from '../../controllers'

export const setCurSongId = (sid) => ({
    type: actionTypes.SET_CUR_SONG_ID,
    sid
})

export const setPlay = (isPlaying) => ({
    type: actionTypes.SET_PLAY,
    isPlaying
})

export const setIsPlayAtList = (isPlayAtList) => ({
    type: actionTypes.SET_PLAY_AT_LIST,
    isPlayAtList
})

export const isSetTimeOff = (isSetTimeOff) => ({
    type: actionTypes.SET_TIME_OFF,
    isSetTimeOff
})


export const setPlaylist = (playlist) => ({
    type: actionTypes.SET_PLAY_LIST,
    playlist
})

export const setHistoryPlaylist = (historyPlaylist) => ({
    type: actionTypes.SET_HISTORY_SONG,
    historyPlaylist
})

export const setLoadingApp = (loadingApp) => ({
    type: actionTypes.LOADING_APP,
    loadingApp
})

export const setLoadingSong = (loadingSong) => ({
    type: actionTypes.LOADING_SONG,
    loadingSong
})  

export const setKeyWord = (keyword) => ({
    type: actionTypes.KEYWORD,
    keyword
})

export const getSearchData = (input) => async (dispatch) => {
    try {
        const response = await controller.searchApi(input)

        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.SEARCH,
                searchData: response.data.data
            })
            // console.log(response?.data?.data)
        } else {
            dispatch({
                type: actionTypes.SEARCH,
                searchData: null
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.SEARCH,
            searchData: null
        })
    }
}