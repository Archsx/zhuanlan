import { createApp, Transition } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './css/reset.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)

app
  .use(store)
  .use(router)
  .mount('#app')
