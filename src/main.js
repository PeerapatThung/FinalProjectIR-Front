import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import GStore from '@/store'
import 'nprogress/nprogress.css'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from './plugins/foint-awesome'

import Button from 'primevue/button'
import TabMenu from 'primevue/tabmenu'
import MegaMenu from 'primevue/megamenu'
import Fieldset from 'primevue/fieldset'
import PrimeVue from 'primevue/config'
import 'primeflex/primeflex.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

// Create a reactive object

const app = createApp(App)
requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )

  app.component(componentName, componentConfig.default || componentConfig)
})

app
  .use(router, PrimeVue)
  .component('font-awesome-icon', FontAwesomeIcon)
  .provide('GStore', GStore)
  .component('Button', Button)
  .component('TabMenu', TabMenu)
  .component('MegaMenu', MegaMenu)
  .component('Fieldset', Fieldset)
  .mount('#app')
