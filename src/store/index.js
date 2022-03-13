import { reactive } from 'vue'
export default reactive({
  query: null,
  result: null,
  recipes: null,
  recipe: null,
  image: null,
  message: '',
  currentUser: JSON.parse(localStorage.getItem('user'))
})
