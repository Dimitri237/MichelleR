import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router"

import "./assets/css/variables.css"
import "./assets/css/global.css"
import "./assets/css/animations.css"


const app = createApp(App)


app.use(router)

app.use(createPinia())


app.mount("#app")