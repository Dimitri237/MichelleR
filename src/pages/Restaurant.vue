<template>

<section class="restaurant">

<div class="gold-overlay"></div>

<div class="container">


<div class="title reveal">

<img 
src="../assets/images/logos/logor.jpg"
alt="Michelle's Restaurant"
class="logo"
/>


<h1>
Michelle's Restaurant
</h1>


<p>
African • European • International Cuisine
</p>


</div>



<div class="menu">


<div
v-for="meal in meals"
:key="meal.name"
class="card reveal"
>


<div class="badge"
:class="meal.type"
>
{{meal.badge}}
</div>



<img 
:src="meal.image"
:alt="meal.name"
/>



<div class="content">


<h2>
{{meal.name}}
</h2>



<div class="stars">

<span
v-for="star in 5"
:key="star"
>
⭐
</span>

</div>



<p>
{{meal.description}}
</p>



<div class="bottom">


<strong>
${{meal.price}} 
</strong>


<button @click="order(meal)">
Order
</button>


</div>


</div>


</div>


</div>


</div>


</section>

</template>



<script setup>


import eru from "../assets/images/restaurant/eru.png"
import ndole from "../assets/images/restaurant/ndole.jpeg"
import legume from "../assets/images/restaurant/legume.jpeg"



const meals=[


{
name:"Eru / Afang Soup",
description:"Traditional Cameroonian delicacy served with water fufu.",
price:"45",
badge:"Popular",
type:"popular",
image:eru
},


{
name:"Ndolé",
description:"Bitterleaf dish prepared with beef, shrimp and spices.",
price:"50",
badge:"Chef's Choice",
type:"chef",
image:ndole
},


{
name:"Koki",
description:"Steamed black-eyed pea pudding with authentic flavor.",
price:"30",
badge:"Popular",
type:"popular",
image:legume
},


{
name:"Sanga",
description:"Traditional corn and vegetable Cameroonian meal.",
price:"35",
badge:"Chef's Choice",
type:"chef",
image:legume
},


{
name:"Achu",
description:"Yellow soup served with pounded cocoyam.",
price:"55",
badge:"Popular",
type:"popular",
image:eru
},


{
name:"Poulet DG",
description:"Chicken cooked with plantain and vegetables.",
price:"60",
badge:"Chef's Choice",
type:"chef",
image:legume
},


{
name:"Jollof Rice",
description:"West African rice cooked with special spices.",
price:"4000",
badge:"Popular",
type:"popular",
image:ndole
},


{
name:"Pepper Soup",
description:"Spicy African soup with aromatic herbs.",
price:"35",
badge:"Spicy",
type:"spicy",
image:eru
},


{
name:"Suya",
description:"Grilled spicy meat skewers.",
price:"45",
badge:"Spicy",
type:"spicy",
image:legume
},


{
name:"Braised Fish",
description:"Fresh grilled fish served with vegetables.",
price:"70",
badge:"Chef's Choice",
type:"chef",
image:ndole
}


]



function order(meal){

alert(
`You selected ${meal.name}`
)

}




// Animation scroll

const observer =
new IntersectionObserver(
(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show")

}

})

},
{
threshold:.15
}
)



setTimeout(()=>{

document
.querySelectorAll(".reveal")
.forEach(el=>observer.observe(el))

},100)



</script>



<style scoped>


.restaurant{

position:relative;

background:
radial-gradient(
circle at top,
rgba(212,175,55,.18),
transparent 40%
),
#090909;

padding:120px 0;

overflow:hidden;

}



.gold-overlay{

position:absolute;

inset:0;

background-image:
radial-gradient(
rgba(212,175,55,.08) 1px,
transparent 1px
);

background-size:35px 35px;

pointer-events:none;

}



.container{

width:90%;

max-width:1400px;

margin:auto;

position:relative;

}



.title{

text-align:center;

}



.logo{

width:130px;

height:130px;

border-radius:50%;

border:4px solid #d4af37;

object-fit:cover;

}



.title h1{

font-size:60px;

color:#d4af37;

margin:20px 0;

}



.title p{

font-size:20px;

color:#ddd;

}



.menu{

margin-top:70px;

display:grid;

grid-template-columns:
repeat(auto-fit,minmax(300px,1fr));

gap:35px;

}



.card{

background:
linear-gradient(
145deg,
#202020,
#111
);

border-radius:25px;

overflow:hidden;

position:relative;

transition:.5s;

}



.card:hover{

transform:
translateY(-15px);

box-shadow:
0 25px 60px rgba(212,175,55,.25);

}



.card img{

width:100%;

height:260px;

object-fit:cover;

}



.badge{

position:absolute;

top:20px;

left:20px;

padding:8px 18px;

border-radius:30px;

font-weight:bold;

z-index:2;

}



.popular{

background:#d4af37;

color:#111;

}



.chef{

background:#fff;

color:#111;

}



.spicy{

background:#c0392b;

color:white;

}



.content{

padding:25px;

}



.content h2{

color:#fff;

font-size:28px;

}



.stars{

margin:10px 0;

font-size:18px;

}



.content p{

color:#bbb;

line-height:1.6;

}



.bottom{

display:flex;

justify-content:space-between;

align-items:center;

margin-top:25px;

}



.bottom strong{

color:#d4af37;

font-size:22px;

}



button{

background:#d4af37;

border:none;

padding:12px 25px;

border-radius:30px;

font-weight:bold;

cursor:pointer;

}



.reveal{

opacity:0;

transform:translateY(50px);

transition:1s;

}



.show{

opacity:1;

transform:none;

}



@media(max-width:700px){


.title h1{

font-size:38px;

}


}

</style>