<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            {{ isLogin ? 'Sign in' : 'Sign up' }}
          </h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/register"
              >Need an account?</nuxt-link
            >
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <li v-for="(message, field) in errors" :key="field">
              {{field}}: {{message}}
            </li>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="user.username"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                required
                placeholder="Email"
                v-model="user.email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                required
                minlength="8"
                v-model="user.password"
                placeholder="Password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? 'Sign in' : 'Sign up' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/user';
const Cookie = process.client
  ? require('js-cookie')
  : process.server
    ? require('cookieparser')
    : undefined

export default {
  middleware: 'notAuthenticated',
  name: 'LoginIndex',
  computed: {
    isLogin() {
      return this.$route.name === 'login';
    },
  },
  data() {
    return {
      user: {
        username: 'aol121',
        email: '785842297@qq.com',
        password: 'wangzp123',
      },
      errors: {} // 错误信息
    }
  },
  methods: {
    async onSubmit() {
      try {
        // 提交表单请求登录
        const { data } = this.isLogin
          ? await login({ user: this.user })
          : await register({ user: this.user })
        this.errors = {};
        // 保存用户登录状态
        this.$store.commit('setUser', data.user);
        Cookie.set('user', JSON.stringify(data.user));
        this.$router.push('/');
      } catch(err) {
        console.dir(err)
        this.errors = err.response.data.errors;
      }

    }
  }
};
</script>

<style></style>
