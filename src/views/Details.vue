<template>
  <p>Title : {{ recipe.title }}</p>
  <p>Ingredients : {{ recipe.ingredient }}</p>
  <p>Instruction : {{ recipe.instruction }}</p>
  <!-- <img v-for="url in recipe.image" :key="url" :src="url" /> -->
</template>

<script>
export default {
  props: ['recipe']
}
</script>
<style scoped>
img {
  border: 1px solid #ddd; /* Gray border */
  border-radius: 4px; /* Rounded border */
  padding: 5px; /* Some padding */
  margin: 5px; /* Some margin */
  width: 150px; /* Set a small width */
  
}
</style>
