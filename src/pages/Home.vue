<template>

<!-- HERO -->

<section class="hero">


<div class="overlay"></div>


<div class="content reveal">


<span class="welcome">
Welcome to Michelle's Restaurant
</span>


<h1>
{{ t("hero.title") }}
</h1>


<p>
{{ t("hero.subtitle") }}
</p>



<div class="buttons">
<RouterLink
to="/restaurant"
class="btn second"
>

🍽 {{ t("hero.restaurant") }}

</RouterLink>


</div>


</div>


</section>




<!-- STORY -->


<section class="story container reveal">


<h2>
{{ t("story.title") }}
</h2>


<p>

{{ t("story.text") }}

</p>


</section>





<!-- BRANDS -->


<section class="brands">
<div class="brand restaurant reveal">


<h2>
Michelle's Restaurant
</h2>


<p>

African, European and international cuisine
prepared with passion and tradition.

</p>


<RouterLink to="/restaurant">
Discover Menu →
</RouterLink>


</div>



</section>






<!-- VALUES -->


<section class="values container">


<div
v-for="item in values"
:key="item.title"
class="value reveal"
>


<div class="icon">
{{item.icon}}
</div>


<h3>
{{item.title}}
</h3>


<p>
{{item.text}}
</p>


</div>


</section>


</template>



<script setup>


import {useLanguage}
from "../composables/useLanguage"



const {t}=useLanguage()



const values=[


{
icon:"🌿",
title:"Quality",
text:"Premium products and fresh ingredients."
},


{
icon:"🌍",
title:"Culture",
text:"Sharing authentic African traditions."
},


{
icon:"⭐",
title:"Experience",
text:"A premium service for every customer."
}


]




// Scroll animation

const observer=
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


.hero{


height:100vh;

display:flex;

align-items:center;

position:relative;


background:

url("https://marche-frais.com/wp-content/uploads/2022/11/shutterstock_1688252332-1.jpg")

center/cover no-repeat;


color:white;


}



.overlay{


position:absolute;

inset:0;


background:

linear-gradient(

90deg,

rgba(0,0,0,.85),

rgba(0,0,0,.35)

);


}



.content{


position:relative;

z-index:2;

max-width:900px;

margin-left:8%;


}



.welcome{


color:#d4af37;

font-size:20px;

font-weight:bold;


}



h1{


font-size:80px;

line-height:1.05;

font-weight:900;


}



.content p{


font-size:25px;

line-height:1.7;

margin:30px 0;


}



.buttons{


display:flex;

gap:20px;


}



.btn{


padding:18px 40px;

border-radius:50px;

background:#d4af37;

color:#111;

font-weight:bold;

text-decoration:none;

transition:.4s;


}



.btn:hover{


transform:translateY(-8px);


box-shadow:

0 20px 40px rgba(212,175,55,.4);


}



.second{


background:white;


}





.story{


padding:120px 20px;

text-align:center;


}



.story h2{


font-size:55px;


}



.story p{


font-size:22px;

line-height:1.8;

max-width:900px;

margin:auto;


}





.brands{
    width: 100%;


}



.brand{


padding:100px 60px;

color:white;

text-align:center;


}



.store{


background:#163A24;


}



.restaurant{

width: 100%;
background:#111;


}



.brand h2{


font-size:45px;

color:#d4af37;


}



.brand p{


font-size:20px;

line-height:1.7;


}



.brand a{


display:inline-block;

margin-top:25px;

color:#d4af37;

font-weight:bold;

text-decoration:none;


}




.values{


padding:100px 0;

display:grid;

grid-template-columns:repeat(3,1fr);

gap:30px;


}



.value{


background:white;

padding:40px;

border-radius:30px;

text-align:center;

box-shadow:var(--shadow);


}



.icon{


font-size:45px;


}



.value h3{


font-size:30px;


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





@media(max-width:900px){


h1{

font-size:50px;

}



.brands,

.values{


grid-template-columns:1fr;


}


}



@media(max-width:600px){


h1{

font-size:38px;

}



.content{

margin:0 30px;

}



.content p{

font-size:18px;

}



.buttons{

flex-direction:column;

}


}

</style>