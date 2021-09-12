const cookieparser = process.server ? require('cookieparser') : undefined
export const state = () => {
  return {
    user: null,
  }
}

export const mutations = {
  setUser(state, data) {
    state.user = data;
  }
}

export const actions = {
  // 特殊的action方法
  // 会在服务端期间自动调用
  // 初始化容器数据，传递数据给客户端使用
  nuxtServerInit ({ commit }, { req }) {
    let user = null;
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      try {
        user = JSON.parse(parsed.user);
      } catch (err) {

      }
    }
    commit('setUser', user);

  }
}
