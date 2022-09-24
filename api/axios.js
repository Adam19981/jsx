import axios from "axios";




class HttpRequest {
    baseUrl=''
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    interceptors(instance) {
        instance.interceptors.request.use(function(config) {
                return config;
            }),
            function(error) {
                return Promise.reject(error)
            }
        instance.interceptors.response.use(function(response) {
                return response.data
            }),
            function(error) {
                return Promise.reject(error)
            }
    }
    request() {
        console.log(this.baseUrl)
        const instance = axios.create({
            baseURL:this.baseUrl,
            timeout:5000
        })
        this.interceptors(instance)
        return instance
    }
}
export default new HttpRequest('https://www.fastmock.site/mock/0308fe18ed0841df54558340feb89b5f/vue2-demo').request()