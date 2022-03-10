<template>

  <div id="app">

    <div class="login-page">

      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
            <div v-if="!registerActive" class="card login" v-bind:class="{ error: emptyFields }">
              <h1>Sign In</h1>
              <form class="form-group" method="POST" action="/login">
                <input v-model="emailLogin" type="email" class="form-control" placeholder="Email" required>
                <input v-model="passwordLogin" type="password" class="form-control" placeholder="Password" required>
                <input type="submit" class="btn btn-primary" @click="doLogin">
                <p>Don't have an account? <a href="#" @click="registerActive = !registerActive, emptyFields = false">Sign up here</a>
                </p>
                <p><a href="#">Forgot your password?</a></p>
              </form>
            </div>

            <div v-else class="card register" v-bind:class="{ error: emptyFields }">
              <h1>Sign Up</h1>
              <form class="form-group" action="/signup" method="POST">
                <input v-model="emailReg" type="email" class="form-control" placeholder="Email" required>
                <input v-model="passwordReg" type="password" class="form-control" placeholder="Password" required>
                <input v-model="confirmReg" type="password" class="form-control" placeholder="Confirm Password" required>
                <input type="submit" class="btn btn-primary" @click="doRegister">
                <p>Already have an account? <a href="#" @click="registerActive = !registerActive, emptyFields = false">Sign in here</a>
                </p>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>

<!--&lt;!&ndash;  {% extends "base.html" %}&ndash;&gt;-->

<!--&lt;!&ndash;  {% block content %}&ndash;&gt;-->
<!--  <div class="column is-4 is-offset-4">-->
<!--    <h3 class="title">Login</h3>-->
<!--    <div class="box">-->
<!--&lt;!&ndash;      {% with messages = get_flashed_messages() %}&ndash;&gt;-->
<!--&lt;!&ndash;      {% if messages %}&ndash;&gt;-->
<!--      <div class="notification is-danger">-->
<!--        {{ messages[0] }}-->
<!--      </div>-->
<!--&lt;!&ndash;      {% endif %}&ndash;&gt;-->
<!--&lt;!&ndash;      {% endwith %}&ndash;&gt;-->
<!--      <form method="POST" action="/login">-->
<!--        <div class="field">-->
<!--          <div class="control">-->
<!--            <input class="input is-large" type="email" name="email" placeholder="Your Email" autofocus="">-->
<!--          </div>-->
<!--        </div>-->

<!--        <div class="field">-->
<!--          <div class="control">-->
<!--            <input class="input is-large" type="password" name="password" placeholder="Your Password">-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="field">-->
<!--          <label class="checkbox">-->
<!--            <input type="checkbox">-->
<!--            Remember me-->
<!--          </label>-->
<!--        </div>-->
<!--        <button class="button is-block is-info is-large is-fullwidth">Login</button>-->
<!--      </form>-->
<!--    </div>-->
<!--  </div>-->
<!--&lt;!&ndash;  {% endblock %}&ndash;&gt;-->
</template>

<script>
export default {
  name: "login",
  // var app = new Vue({
  //   el: "#app",

  data() {
    return {
      registerActive: false,
      emailLogin: "",
      passwordLogin: "",
      emailReg: "",
      passwordReg: "",
      confirmReg: "",
      emptyFields: false
    }
  },

  methods: {
    doLogin() {
      if (this.emailLogin === "" || this.passwordLogin === "") {
        this.emptyFields = true;
      } else {
        alert("You are now logged in");
      }
    },

    doRegister() {
      if (this.emailReg === "" || this.passwordReg === "" || this.confirmReg === "") {
        this.emptyFields = true;
      } else {
        alert("You are now registered");
      }
    },
  //   connect: function() {
  //     this.axios
  //         .get("http://localhost:5000/db")
  //         .then(response => (this.todos = response.data));
  //   }
  // },

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
input {
  margin-bottom: 20px;
}
}

.login-page {
  align-items: center;
  display: flex;
  height: 100vh;

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
  transition: opacity .5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.wallpaper-register {
  background: url(https://images.pexels.com/photos/533671/pexels-photo-533671.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)
  no-repeat center center;
  background-size: cover;
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: -1;
}

h1 {
  margin-bottom: 1.5rem;
}
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