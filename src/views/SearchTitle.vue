<template>
  <div>
    <h1>Search by Title</h1>
    <div class="card-container">
      <Form @submit="search" :validation-schema="schema">
        <Field class="search-box" name="search" type="text" />
        <button class="button-1" type="submit">Submit</button>
      </Form>
    </div>
    <div v-if="corrected">
      <p>Currently Searching for: {{ corrected }}</p>
    </div>
    <div v-if="corrections">
      <p>Do you mean :</p>
      <CorrectionTemp
        v-for="item in corrections"
        :key="item"
        :correction="item"
      />
    </div>
    <div v-if="recipes">
      <div class="recipes">
        <div class="flex flex-wrap card-container" style="max-width: 500px">
          <RecipeCard
            v-for="recipe in recipes"
            :key="recipe.id"
            :recipe="recipe"
          />
        </div>
        <div class="pagination">
          <Button
            class="p-button-raised p-button-success p-button p-component"
            v-if="page != 1"
          >
            <router-link
              id="page-prev"
              :to="{ name: 'SearchTitle', query: { page: page - 1 } }"
              rel="prev"
              v-if="page != 1"
            >
              Prev Page</router-link
            >
          </Button>

          <Button
            class="p-button-raised p-button-success p-button p-component"
            v-if="hasNextPage"
          >
            <router-link
              id="page-next"
              :to="{ name: 'SearchTitle', query: { page: page + 1 } }"
              rel="next"
              v-if="hasNextPage"
            >
              Next Page</router-link
            >
          </Button>
        </div>
      </div>
    </div>

    <!-- <pre>{{ result }}</pre> -->
  </div>
</template>
<script>
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import RecipeService from '@/services/RecipeService.js'
import RecipeCard from '@/components/RecipeCard.vue'
import CorrectionTemp from '@/components/CorrectionTemp.vue'
export default {
  name: 'SearchTitle',
  components: {
    Form,
    Field,
    RecipeCard,
    CorrectionTemp
  },
  props: {
    page: {
      type: Number,
      required: true
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
      totalrecipes: 0 // <--- Added this to store totalrecipes
    }
  },
  methods: {
    search(json) {
      RecipeService.searchTitle(json, parseInt(this.page) || 1)
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
  beforeRouteUpdate(routeTo) {
    var queryFunction
    if (routeTo.query.search) {
      queryFunction = RecipeService.searchTitle(
        { search: routeTo.query.search },
        parseInt(routeTo.query.page) || 1
      )
    } else
      queryFunction = RecipeService.searchTitle(
        { search: this.corrected },
        parseInt(routeTo.query.page) || 1
      )
    queryFunction
      .then((response) => {
        this.recipes = response.data.result // <-----
        this.corrections = response.data.correction
        if (routeTo.query.search) {
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
.pagination {
  display: flex;
  width: 290px;
  align-items: center;
  margin: 50px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
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
#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}

/*button,*/
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
/*button,*/
input {
  overflow: visible;
}
/*button,*/
select {
  text-transform: none;
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
button:hover {
  -webkit-transform: scale(1.02);
  transform: scale(1.02);
  box-shadow: 0 7px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.button:active {
  -webkit-transform: scale(1);
  transform: scale(1);
  box-shadow: none;
}

.button + .button {
  margin-left: 1em;
}
.button.-icon-right > .icon {
  margin-left: 10px;
}
button {
  border-radius: 12px;
}
.button-1 {
  background-color: #44b35c;
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: 'Haas Grot Text R Web', 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
  font-size: 20px;
  font-weight: 500;
  height: 40px;
  line-height: 20px;
  list-style: none;
  margin: 30px;
  outline: none;
  padding: 10px 16px;
  /*position: relative;*/
  text-align: center;
  text-decoration: none;
  transition: color 100ms;
  vertical-align: middle;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-1:hover,
.button-1:focus {
  background-color: #63b875;
}
</style>
