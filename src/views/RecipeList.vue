<template>
  <h1>Recipe Lists</h1>

  <div class="recipes">
    <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'RecipeList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
      >
        Prev Page</router-link
      >

      <router-link
        id="page-next"
        :to="{ name: 'RecipeList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
      >
        Next Page</router-link
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import RecipeCard from '@/components/RecipeCard.vue'
import RecipeService from '@/services/RecipeService.js'

// import axios from 'axios'
export default {
  name: 'RecipeList',
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    RecipeCard // register it as a child component
  },
  data() {
    return {
      recipes: null,
      totalrecipes: 0, // <--- Added this to store totalrecipes
      keyword: null
    }
  },

  // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
    RecipeService.getRecipes(parseInt(routeTo.query.page) || 1)
      .then((response) => {
        next((comp) => {
          comp.recipes = response.data.result
          comp.totalrecipes = 13493
          console.log(response)
        })
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
  },
  beforeRouteUpdate(routeTo) {
    var queryFunction
    if (this.keyword == null || this.keyword === '') {
      queryFunction = RecipeService.getRecipes(
        parseInt(routeTo.query.page) || 1
      )
    }
    queryFunction
      .then((response) => {
        console.log(response)
        this.recipes = response.data.result // <-----
        this.totalrecipes = 13493 // <-----
      })
      .catch(() => {
        return { name: 'NetworkError' }
      })
  },
  computed: {
    hasNextPage() {
      // First, calculate total pages
      let totalPages = Math.ceil(this.totalrecipes / 10) // 2 is recipes per page

      // Then check to see if the current page is less than the total pages.
      return this.page < totalPages
    }
  }
}
</script>
<style scoped>
.recipes {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.search-box {
  width: 300px;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
