<template>
  <!--  {% extends "base.html" %}-->

<!--  {% block content %}-->
  <h1 class="title">
    Welcome, {{ GStore.currentUser.name }}!!!
  </h1>
<!--  {% endblock %}-->
</template>

<script>
export default {
  name: "profile",
  inject: ['GStore']
}
</script>

<style scoped></style>
