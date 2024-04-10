import actionTypes from '../actions/actionTypes';

const initState = {
    banner: [],
    chill: {
        name: null,
        data: null
    },
    remix: {
        name: null,
        data: null
    },
    sadMusic: {
        name: null,
        data: null
    },
    newMusic: [],
    top100: {
        name: null,
        data: null
    },
    hotAlbum: {
        name: null,
        data: null
    },
    hotRadio: [],
}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find(item => item.sectionType === 'banner')?.items || null,
                chill: {
                    name: action.homeData?.find(item => item.sectionId === "hEditorTheme")?.title || null,
                    data: action.homeData?.find(item => item.sectionId === "hEditorTheme")?.items || null
                },
                remix: {
                    name: action.homeData?.find(item => item.sectionId === "hEditorTheme3")?.title || null,
                    data: action.homeData?.find(item => item.sectionId === "hEditorTheme3")?.items || null
                },
                sadMusic: {
                    name: action.homeData?.find(item => item.sectionId === "hEditorTheme4")?.title || null,
                    data: action.homeData?.find(item => item.sectionId === "hEditorTheme4")?.items || null
                },
                newMusic: action.homeData?.find(item => item.sectionId === "hNewrelease")?.items || null,
                top100: {
                    name: action.homeData?.find(item => item.sectionId === "h100")?.title || null,
                    data: action.homeData?.find(item => item.sectionId === "h100")?.items || null   
                },
                hotAlbum: {
                    name: action.homeData?.find(item => item.sectionId === "hAlbum")?.title || null,
                    data: action.homeData?.find(item => item.sectionId === "hAlbum")?.items || null   
                },
                hotRadio: action.homeData?.find(item => item.sectionId === "hLiveRadio")?.items || null,
            }
        default:
            return state
    }
}

export default appReducer