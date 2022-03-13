<template>
  <p>Title : {{ GStore.recipe.title }}</p>
  <img :src="image" />
  <p>Ingredients : {{ GStore.recipe.ingredient }}</p>
  <p>Instruction : {{ GStore.recipe.instruction }}</p>
  <div v-if="!hasFav">
    <button @click="setFav">Mark As Favourite</button>
  </div>
  <div v-else>
    <p> This recipe is currently in your favourite list </p>
    <button @click="removeFav">Remove From Favourite</button>
  </div>
</template>

<script>
import RecipeService from '@/services/RecipeService.js'
export default {
  inject: ['GStore'],
  data() {
    return {
      image: require('@/assets/image/' + this.GStore.recipe.image),
      favlist: null,
      identity: null
    }
  },
  methods: {
    setFav() {
      RecipeService.setFav(this.GStore.currentUser.id, this.GStore.recipe.id)
        .then((response) => {
          console.log(response.data.success)
          alert(response.data.success)
          location.reload()
        })
        .catch(() => {
          this.$router.push('NetworkError')
        })
    },
    removeFav() {
      RecipeService.removeFav(this.GStore.currentUser.id, this.GStore.recipe.id)
        .then((response) => {
          console.log(response.data.success)
          alert(response.data.success)
          location.reload()
        })
        .catch(() => {
          this.$router.push('NetworkError')
        })
    }
  },
  created() {
    this.identity = this.GStore.recipe.id
    RecipeService.getFav(this.GStore.currentUser.id)
      .then((response) => {
        this.favlist = response.data.result
        console.log(this.favlist)
      })
      .catch(() => {
        this.$router.push('NetworkError')
      })
  },
  computed: {
    hasFav() {
      if (this.favlist) {
        return this.favlist.includes(this.identity)
      }
      else return false
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
