import actionTypes from "./actionTypes";

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

export const setSongs = (songs) => ({
    type: actionTypes.SET_PLAY_LIST,
    songs
})

export const setLoadingApp = (loadingApp) => ({
    type: actionTypes.LOADING_APP,
    loadingApp
})

export const setLoadingSong = (loadingSong) => ({
    type: actionTypes.LOADING_SONG,
    loadingSong
})