<template>
  <div id="app">
    <div class="login-page">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
            <div class="card login">
              <h1>Sign In</h1>
              <Form @submit="doLogin" :validation-schema="schema">
                <Field
                  name="email"
                  type="email"
                  class="form-control"
                  placeholder="Email"
                />
                <Field
                  name="password"
                  type="password"
                  class="form-control"
                  placeholder="Password"
                />
                <input type="submit" class="btn btn-primary" />
                <p>
                  Don't have an account?
                  <router-link :to="{ name: 'Register' }">
                    Sign up here
                  </router-link>
                </p>
                <p><a href="#">Forgot your password?</a></p>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import AuthService from '@/services/AuthService.js'
export default {
  name: 'login',
  components: {
    Form,
    Field
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string(),
      password: yup.string()
    })
    return {
      registerActive: false,
      schema
    }
  },
  methods: {
    doLogin(json) {
      AuthService.login(json)
        .then((response) => {
          this.$router.push({ name: 'RecipeList' })
          console.log(response.user)
        })
        .catch(() => {
          this.$router.push('NetworkError')
        })
    }
  }
}
</script>

<style scoped>
p {
  line-height: 1rem;
}

.card {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.login-page {
  align-items: center;
  display: flex;
  height: 100vh;
}

.wallpaper-login {
  background: url(https://images.pexels.com/photos/32237/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)
    no-repeat center center;
  background-size: cover;
  height: 100%;
  position: absolute;
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

h1 {
  margin-bottom: 1.5rem;
}

.error {
  animation-name: errorShake;
  animation-duration: 0.3s;
}

@keyframes errorShake {
  0% {
    transform: translateX(-25px);
  }
  25% {
    transform: translateX(25px);
  }
  50% {
    transform: translateX(-25px);
  }
  75% {
    transform: translateX(25px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
