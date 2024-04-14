import actionTypes from "./actionTypes";
import * as controller from '../../controllers'

export const getHome = () => async (dispatch) => {
    try {
        const response = await controller.getHome()

        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_HOME,
                homeData: response.data.data.items
            })
            
        } else {
            dispatch({
                type: actionTypes.GET_HOME,
                homeData: null
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_HOME,
            homeData: null
        })
    }
}

