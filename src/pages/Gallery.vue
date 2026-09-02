<template>

<section class="gallery">

<div class="container">


<div class="title reveal">

<h1>
Our Gallery
</h1>

<p>
Discover our delicious meals and memorable moments.
</p>

</div>



<div class="grid">


<div
v-for="(img,index) in images"
:key="index"
class="item reveal"
>


<img
:src="img"
alt="Africa Mart Gallery"
/>


<div class="overlay">

<span>
View
</span>

</div>


</div>


</div>


</div>


</section>


</template>



<script setup>


import gallery1 from "../assets/images/restaurant/eru.png"
import gallery2 from "../assets/images/restaurant/eru.png"
import gallery3 from "../assets/images/restaurant/eru.png"
import gallery4 from "../assets/images/restaurant/eru.png"
import gallery5 from "../assets/images/restaurant/eru.png"
import gallery6 from "../assets/images/restaurant/eru.png"



const images=[

gallery1,
gallery2,
gallery3,
gallery4,
gallery5,
gallery6

]



// Scroll animation

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


.gallery{

padding:120px 0;

background:

radial-gradient(
circle at top,
rgba(212,175,55,.18),
transparent 40%
),

#111;

}



.container{

width:90%;

max-width:1400px;

margin:auto;

}



.title{

text-align:center;

margin-bottom:70px;

}



.title h1{

font-size:60px;

color:#d4af37;

margin-bottom:20px;

}



.title p{

color:#ddd;

font-size:20px;

}



.grid{

display:grid;

grid-template-columns:
repeat(3,1fr);

gap:30px;

}



.item{

position:relative;

overflow:hidden;

border-radius:30px;

height:350px;

cursor:pointer;

}



.item img{

width:100%;

height:100%;

object-fit:cover;

transition:.6s;

}



.item:hover img{

transform:scale(1.12);

}



.overlay{

position:absolute;

inset:0;

background:

linear-gradient(
transparent,
rgba(0,0,0,.75)
);

display:flex;

align-items:flex-end;

justify-content:center;

padding-bottom:30px;

opacity:0;

transition:.4s;

}



.item:hover .overlay{

opacity:1;

}



.overlay span{

background:#d4af37;

padding:12px 35px;

border-radius:40px;

font-weight:bold;

color:#111;

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


.grid{

grid-template-columns:
repeat(2,1fr);

}


}



@media(max-width:600px){


.grid{

grid-template-columns:1fr;

}


.title h1{

font-size:40px;

}


}

</style>