import {createRouter,createWebHistory}
from "vue-router"

import Cart from "../pages/Cart.vue"
import Home from "../pages/Home.vue"
import addMeals from "../pages/addFood.vue"
import Restaurant from "../pages/Restaurant.vue"
import Gallery from "../pages/Gallery.vue"
import About from "../pages/AboutPage.vue"
import Contact from "../pages/ContactPage.vue"



const routes=[

{
path:"/",
component:Home
},
{
path:"/cart",
component:Cart
},
{
path:"/addMeals",
component:addMeals
},
{
path:"/restaurant",
component:Restaurant
},

{
path:"/gallery",
component:Gallery
},

{
path:"/about",
component:About
},

{
path:"/contact",
component:Contact
}


]


export default createRouter({

history:createWebHistory(),

routes

})