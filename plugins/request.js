import axios from 'axios'

export const request = axios.create({
  baseURL: 'http://realworld.api.fed.lagounews.com'
})

export default ({ store }) => {
  // 请求拦截
  // 任何请求都会经过拦截器
  // 公共业务处理
  request.interceptors.request.use(function (config) {
    const { user } = store.state;
    if (user && user.token) {
      config.headers.Authorization = `Token ${user.token}`;
    }
    return config;
  }, function(error) {
    //
    return Promise.reject(error);
  })
}
