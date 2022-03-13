<template>
  <!--  {% extends "base.html" %}-->

  <!--  {% block content %}-->
  <div class="column is-4 is-offset-4">
    <h3 class="title">Sign Up</h3>
    <div class="box">
      <!--      {% with messages = get_flashed_messages() %}-->
      <!-- <div v-if="">
      <div class="notification is-danger">
         Go to <a href="{{ url_for('auth.login') }}">login page</a>.
      </div>
    </div> -->
      <!--      {% endwith %}-->
      <Form @submit="verify" class="card register" :validation-schema="schema">
        <div class="field">
          <div class="control">
            <Field
              class="input is-large"
              type="email"
              name="email"
              placeholder="Email"
              autofocus=""
            />
          </div>
        </div>

        <div class="field">
          <div class="control">
            <Field
              class="input is-large"
              type="text"
              name="name"
              placeholder="Name"
              autofocus=""
            />
          </div>
        </div>

        <div class="field">
          <div class="control">
            <Field
              class="input is-large"
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
        </div>

        <button
          class="button is-block is-info is-large is-fullwidth"
          type="submit"
        >
          Sign Up
        </button>
      </Form>
    </div>
  </div>
  <!--  {% endblock %}-->
</template>

<script>
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import AuthService from '@/services/AuthService.js'
export default {
  name: 'signup',
  components: {
    Form,
    Field
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string(),
      name: yup.string(),
      password: yup.string()
    })
    return {
      schema
    }
  },
  methods: {
    verify(json) {
      AuthService.register(json)
        .then((response) => {
          this.$router.push({ name: 'login' })
          alert(response.data.success)
          console.log(response.data)
        })
        .catch(() => {
          this.$router.push('NetworkError')
        })
    }
  }
}
</script>

<style scoped>
.wallpaper-register {
  background: url(https://images.pexels.com/photos/533671/pexels-photo-533671.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)
    no-repeat center center;
  background-size: cover;
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: -1;
}
p {
  line-height: 1rem;
}

.field {
  width: 50%;
}

.card {
  padding: 20px;
}

.register {
  align-items: center;
  display: flex;
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
