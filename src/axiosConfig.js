import axios from 'axios'

const instance = axios.create({
    // baseURL: process.env.REACT_APP_SERVER_URL,
    baseURL: "https://zingmp3-server.onrender.com/api"
});

// Thêm một bộ đón chặn request
axios.interceptors.request.use(function (config) {
    // Làm gì đó trước khi request dược gửi đi
    return config;
}, function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error);
});

// Thêm một bộ đón chặn response
axios.interceptors.response.use(function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu response
    return response;
}, function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    return Promise.reject(error);
})

export default instance