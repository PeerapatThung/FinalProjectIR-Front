<template>
  <div id="nav">
    <nav class="navbar navbar-expand">
      <ul v-if="!GStore.currentUser" class="navbar-nav ml auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Sign up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </router-link>
        </li>
      </ul>
      <ul v-if="GStore.currentUser" class="navbar-nav ml auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ GStore.currentUser.name}}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="logout">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'FavouriteList', query: { page:1, user: GStore.currentUser.id}}" class="nav-link">
            <font-awesome-icon icon="star" /> Favourites
          </router-link>
        </li>
      </ul>
    </nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link :to="{ name: 'SearchTitle' }">Search (By Title)</router-link>|
    <router-link :to="{ name: 'SearchIngredient' }">Search (By Ingredient)</router-link>
  </div>

  <!-- new element -->
  <router-view />
</template>
<script>
import AuthService from '@/services/AuthService.js'
export default {
  inject: ['GStore'],
  methods: {
    logout(){
      AuthService.logout()
      this.$router.push({name: "Login"})
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
h4 {
  font-size: 20px;
}
</style>