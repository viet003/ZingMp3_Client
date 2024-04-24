import actionTypes from '../actions/actionTypes';

const initState = {
    banner: [],
    newRelease: {
        name: null,
        data: null
    },
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
    newReleaseChart : {
        name: null,
        data: null
    },
    RTChart: {},
    weekChart: [],
    newMusic: {
        name: null,
        data: null
    },
    top100: {
        name: null,
        data: null
    },
    hotAlbum: {
        name: null,
        data: null
    },
    hotRadio: {
        name: null,
        data: null
    },
    loadingApp: false,
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
                newRelease: {
                    name: action.homeData?.find(item => item.sectionType === "new-release")?.title || null,
                    data: action.homeData?.find(item => item.sectionType === "new-release")?.items || null
                },
                remix: {
                    name: action.homeData?.find(item => item.sectionId === "hEditorTheme3")?.title || null,
                    data: action.homeData?.find(item => item.sectionId === "hEditorTheme3")?.items || null
                },
                sadMusic: {
                    name: action.homeData?.find(item => item.sectionId === "hEditorTheme4")?.title || null,
                    data: action.homeData?.find(item => item.sectionId === "hEditorTheme4")?.items || null
                },
                newReleaseChart: {
                    name: action.homeData?.find(item => item.sectionId === "hNewrelease")?.title || null,
                    data: action.homeData?.find(item => item.sectionId === "hNewrelease")?.items || null
                },
                RTChart: action.homeData?.find(item => item.sectionType === 'RTChart') || null,
                weekChart: action.homeData?.find(item => item.sectionType === 'weekChart')?.items || null,
                newMusic: {
                    name: action.homeData?.find(item => item.sectionId === "hNewrelease")?.title || null,
                    data: action.homeData?.find(item => item.sectionId === "hNewrelease")?.items || null
                },
                top100: {
                    name: action.homeData?.find(item => item.sectionId === "h100")?.title || null,
                    data: action.homeData?.find(item => item.sectionId === "h100")?.items || null
                },
                hotAlbum: {
                    name: action.homeData?.find(item => item.sectionId === "hAlbum")?.title || null,
                    data: action.homeData?.find(item => item.sectionId === "hAlbum")?.items || null
                },
                hotRadio: {
                    name: action.homeData?.find(item => item.sectionId === "hLiveRadio")?.title || null,
                    data: action.homeData?.find(item => item.sectionId === "hLiveRadio")?.items || null
                },

            }
        case actionTypes.LOADING_APP:
            return {
                ...state,
                loadingApp: action.loadingApp
            }
        default:
            return state
    }
}

export default appReducer