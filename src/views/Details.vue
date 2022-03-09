<template>
  <p>Title : {{ GStore.recipe.title }}</p>
  <img :src="image" />
  <p>Ingredients : {{ GStore.recipe.ingredient }}</p>
  <p>Instruction : {{ GStore.recipe.instruction }}</p>
</template>

<script>
export default {
  inject: ['GStore'],
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
      image: require('@/assets/image/' +this.GStore.recipe.image)
    }
  }
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
