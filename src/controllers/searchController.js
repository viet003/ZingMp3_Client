import axios from '../axiosConfig'

export const searchApi = (input) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            url: '/search',
            method: 'get',
            params: { keyword: input }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})