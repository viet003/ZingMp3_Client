import actionTypes from "./actionTypes";

export const setCurSongId = (sid) => ({
    type: actionTypes.SET_CUR_SONG_ID,
    sid
})


export const setPlay = (isPlaying) => ({
    type: actionTypes.SET_PLAY,
    isPlaying
})