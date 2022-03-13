<template>
  <p>Title : {{ GStore.recipe.title }}</p>
  <img :src="image" />
  <div class="FS">
    <div class="size">
      <Fieldset legend="Ingredients">
        <div class="text">
          <p>{{ GStore.recipe.ingredient }}</p>
        </div>
      </Fieldset>
    </div>
  </div>
  <div class="FS">
    <div class="size">
      <Fieldset legend="Instruction">
        <div class="text">
          <p>{{ GStore.recipe.instruction }}</p>
        </div>
      </Fieldset>
    </div>
  <div v-if="!hasFav">
    <button @click="setFav">Mark As Favourite</button>
  </div>
  <div v-else>
    <p>This recipe is currently in your favourite list</p>
    <button @click="removeFav">Remove From Favourite</button>
  </div>
  <div v-if="recommend" class="recom">
    <h2>You may also interested in</h2>
    <RecipeCard v-for="rec in recommend" :key="rec.id" :recipe="rec" />
  </div>
</template>

<script>
import RecipeService from '@/services/RecipeService.js'
import RecipeCard from '@/components/RecipeCard.vue'
export default {
  inject: ['GStore'],
  components: {
    RecipeCard
  },
  data() {
    return {
      image: require('@/assets/image/' + this.GStore.recipe.image),
      favlist: null,
      identity: null,
      recommend: null,
      hasFav: false
    }
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteUpdate(routeTo) {
    this.recommend = null
    var queryFunction
    queryFunction = RecipeService.getRecipe(routeTo.params.id)
    queryFunction
      .then((response) => {
        this.GStore.recipe = response.data.result // <--- Store the event
        this.identity = this.GStore.recipe.id
        this.hasFav = this.favlist.includes(this.identity)
        this.image = require('@/assets/image/' + this.GStore.recipe.image)
        RecipeService.getRecommendation(this.GStore.recipe.ingredient)
          .then((response) => { 
            this.recommend = response.data.result
            console.log(this.recommend)
          })
          .catch(() => {
            this.$router.push('NetworkError')
          })
      })
      .catch(() => {
        return { name: 'NetworkError' }
      })
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
        this.hasFav = this.favlist.includes(this.identity)
        console.log(this.favlist)
      })
      .catch(() => {
        this.$router.push('NetworkError')
      })
  },
  // computed: {
  //   hasFav() {
  //     if (this.favlist) {
  //       return this.favlist.includes(this.identity)
  //     } else return false
  //   }
  // },
  mounted() {
    RecipeService.getRecommendation(this.GStore.recipe.ingredient)
      .then((response) => {
        this.recommend = response.data.result
        console.log(this.recommend)
      })
      .catch(() => {
        this.$router.push('NetworkError')
      })
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
.FS {
  text-align: left;
  margin-top: 5%;
}

.size {
  padding-left: 10%;
  padding-right: 10%;
}

.text {
  text-align: center;
}
img {
  width: 500px;
}
</style>
