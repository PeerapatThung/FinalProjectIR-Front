<template>
  <router-link
    class="recipe-link"
    :to="{ name: 'RecipeDetails', params: { id: recipe.id } }"
  >
    <div class="recipe-card">
      <div class="col">
      <div class="container">
        <img :src="image" />
        <h5>{{ recipe.title }}</h5>
      </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'RecipeCard',
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
      image: require('@/assets/image/' +this.recipe.image)
    }
  }
}
</script>

<style scoped>
.recipe-card {
  padding: 20px;
  width: 400px;
  height: 150px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 20px;
  margin-right: 50px;
  margin-left: 50px;
  border-radius: 5%;
  background-color: rgba(160, 222, 198);
}
.container {
  display: table;
  height: 100%;
}
h5 {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.recipe-card:hover {
  transition: 0.25s;
  transform: scale(1.15);
  background-color: rgb(230, 228, 228);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.recipe-link {
  color: #2c3e50;
  text-decoration: none;
}

img {
  border: 1px solid #ddd; /* Gray border */
  border-radius: 4px; /* Rounded border */
  padding: 5px; /* Some padding */
  margin: 5px; /* Some margin */
  width: 150px; /* Set a small width */ 
}

/* Add a hover effect (blue shadow) */
img:hover {
  box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
}
</style>
