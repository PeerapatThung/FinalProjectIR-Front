<template>
  <div>
    <h1>Favourite List</h1>
    <div class="card-container">
    <Form @submit="search" :validation-schema="schema">
      <Field name="search" type="text"/>
      <button type="submit">Submit</button>
    </Form>
    </div>
    <div v-if="corrected">
      <p>Currently Searching for: {{corrected}}</p>
    </div>
    <div v-if="corrections">
      <p>Do you mean :</p>
      <CorrectionTempFav v-for="item in corrections" :key="item" :correction="item"/>
    </div>
    <div v-if="recipes">
      <div class="recipes">
      <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe"/>
      </div>
    </div>
    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'FavouriteList', query: { page: page - 1, user: GStore.currentUser.id} }"
        rel="prev"
        v-if="page != 1"
      >
        Prev Page</router-link
      >

      <router-link
        id="page-next"
        :to="{ name: 'FavouriteList', query: { page: page + 1, user: GStore.currentUser.id} }"
        rel="next"
        v-if="hasNextPage"
      >
        Next Page</router-link
      >
    </div>

    <!-- <pre>{{ result }}</pre> -->
  </div>
</template>
<script>
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import RecipeService from '@/services/RecipeService.js'
import RecipeCard from '@/components/RecipeCard.vue'
import CorrectionTempFav from '@/components/CorrectionTempFav.vue'
export default {
  components: {
    Form,
    Field,
    RecipeCard,
    CorrectionTempFav
  },
  props: {
    page: {
      type: Number,
      required: true
    },
    user: {
      type: Number,
      required: false
    }
  },
  inject: ['GStore'],
  data() {
   const schema = yup.object().shape({
      query: yup.string()
   })
    return {
      schema,
      result: {},
      recipes: null,
      corrections: null,
      corrected: null,
      totalrecipes: 0, // <--- Added this to store totalrecipes
    }
  },
  methods: {
    search(json) {  
        RecipeService.searchFav(json, this.GStore.currentUser.id)
          .then((response) => {
            this.result = json
            this.recipes = response.data.result
            this.corrections = response.data.correction
            this.corrected = json.search
            this.totalrecipes = response.data.total
            console.log(response.data)
          })
          .catch(() => {
            this.$router.push('NetworkError')
          })
    }
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
    RecipeService.seeAllFav(parseInt(routeTo.query.page) || 1, parseInt(routeTo.query.user))
      .then((response) => {
        next((comp) => {
          comp.recipes = response.data.result
          comp.totalrecipes = response.data.total
          console.log(response)
        })
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
  },
  beforeRouteUpdate(routeTo) {
    var queryFunction
    if(this.corrected && routeTo.query.search){
    queryFunction = RecipeService.searchFav({search: routeTo.query.search}, this.GStore.currentUser.id)
    }
    else if(this.corrected){
        queryFunction = RecipeService.searchFav({search: this.corrected}, this.GStore.currentUser.id)
    }
    else queryFunction = RecipeService.seeAllFav(parseInt(routeTo.query.page) || 1, this.GStore.currentUser.id)
    queryFunction
      .then((response) => {
        this.recipes = response.data.result // <-----
        this.corrections = response.data.correction
        if(routeTo.query.search){
          this.corrected = routeTo.query.search
        }
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
<style>
.card-container {
  max-width: 700px !important;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
}
.recipes {
  display: flex;
  flex-direction: column;
  align-items: center;
}
b,
strong {
  font-weight: bolder;
}
small {
  font-size: 80%;
}
.eyebrow {
  font-size: 20px;
}
.-text-primary {
  color: #39b982;
}
.-text-base {
  color: #000;
}
.-text-error {
  color: tomato;
}
.-text-gray {
  color: rgba(0, 0, 0, 0.5);
}
.-shadow {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.13);
}

button,
label,
input,
optgroup,
select,
textarea {
  display: inline-flex;
  font-family: 'Open sans', sans-serif;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
}
button,
input {
  overflow: visible;
}
button,
select {
  text-transform: none;
}
button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: none;
}
button::-moz-focus-inner,
[type='button']::-moz-focus-inner,
[type='reset']::-moz-focus-inner,
[type='submit']::-moz-focus-inner {
  border-style: none;
  padding: 0;
}
button:-moz-focusring,
[type='button']:-moz-focusring,
[type='reset']:-moz-focusring,
[type='submit']:-moz-focusring {
  outline: 2px solid #39b982;
}
label {
  color: rgba(0, 0, 0, 0.5);
  font-weight: 700;
}
input,
textarea {
  box-sizing: border-box;
  border: solid 1px rgba(0, 0, 0, 0.4);
}
input.error,
select.error {
  margin-bottom: 0;
}
input + p.errorMessage {
  margin-bottom: 24px;
}
textarea {
  width: 100%;
  overflow: auto;
  font-size: 20px;
}
[type='checkbox'],
[type='radio'] {
  box-sizing: border-box;
  padding: 0;
  margin-right: 0.5rem;
}
[type='number']::-webkit-inner-spin-button,
[type='number']::-webkit-outer-spin-button {
  height: auto;
}
[type='search'] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}
[type='search']::-webkit-search-decoration {
  -webkit-appearance: none;
}
input,
[type='text'],
[type='number'],
[type='search'],
[type='password'] {
  height: 52px;
  width: 100%;
  padding: 0 10px;
  font-size: 20px;
}
input,
[type='text']:focus,
[type='number']:focus,
[type='search']:focus,
[type='password']:focus {
  border-color: #39b982;
}
::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}
[hidden] {
  display: none;
}
.error {
  border: 1px solid red;
}
select {
  width: 100%;
  height: 52px;
  padding: 0 24px 0 10px;
  vertical-align: middle;
  background: #fff
    url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E")
    no-repeat right 12px center;
  background-size: 8px 10px;
  border: solid 1px rgba(0, 0, 0, 0.4);
  border-radius: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
select:focus {
  border-color: #39b982;
  outline: 0;
}
select:focus::ms-value {
  color: #000;
  background: #fff;
}
select::ms-expand {
  opacity: 0;
}
.field {
  margin-bottom: 24px;
}
.error {
  border: 1px solid red;
}
.errorMessage {
  color: red;
}
.button {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  padding: 0 40px;
  background: transparent;
  border: none;
  border-radius: 6px;
  text-align: center;
  font-weight: 600;
  white-space: nowrap;
  transition: all 0.2s linear;
}
.button:hover {
  -webkit-transform: scale(1.02);
  transform: scale(1.02);
  box-shadow: 0 7px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.button:active {
  -webkit-transform: scale(1);
  transform: scale(1);
  box-shadow: none;
}
.button:focus {
  outline: 0;
}
.button:disabled {
  -webkit-transform: scale(1);
  transform: scale(1);
  box-shadow: none;
}
.button + .button {
  margin-left: 1em;
}
.button.-fill-gradient {
  background: linear-gradient(to right, #16c0b0, #84cf6a);
  color: #ffffff;
}
.button.-fill-gray {
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;
}
.button.-size-small {
  height: 32px;
}
.button.-icon-right {
  text-align: left;
  padding: 0 20px;
}
.button.-icon-right > .icon {
  margin-left: 10px;
}
.button.-icon-left {
  text-align: right;
  padding: 0 20px;
}
.button.-icon-left > .icon {
  margin-right: 10px;
}
.button.-icon-center {
  padding: 0 20px;
}
</style>
