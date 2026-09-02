<template>

<section class="about">


<div class="container">


<div class="intro reveal">


<h1>
Our Story
</h1>


<p>

Michelle's Restaurant was born from a passion:
sharing the richness of African culture through authentic food,
traditional products and exceptional hospitality.

</p>


<p>

From carefully selected African groceries to unforgettable meals,
we bring tradition, quality and modern experience together.

</p>


</div>



<div class="brands">
<div class="brand-card reveal">


<h2>
Michelle's Restaurant
</h2>


<p>

A premium dining experience offering African,
European and international cuisine prepared with passion.

</p>


</div>


</div>




<div class="info">


<div class="box reveal">

<div class="icon">
🌿
</div>

<h2>
Quality
</h2>

<p>
Selected products and fresh ingredients to guarantee the best experience.
</p>

</div>



<div class="box reveal">

<div class="icon">
🌍
</div>

<h2>
Culture
</h2>

<p>
Sharing African traditions, flavors and heritage with the world.
</p>

</div>



<div class="box reveal">

<div class="icon">
⭐
</div>

<h2>
Experience
</h2>

<p>
Premium service designed around customer satisfaction.
</p>

</div>


</div>



</div>


</section>


</template>



<script setup>


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


.about{


padding:120px 0;


background:


radial-gradient(
circle at top,
rgba(212,175,55,.2),
transparent 45%
),


#111;


color:white;


}



.container{


width:90%;

max-width:1300px;

margin:auto;


}



.intro{


text-align:center;

max-width:900px;

margin:auto;


}



.intro h1{


font-size:65px;

color:#d4af37;

margin-bottom:30px;


}



.intro p{


font-size:20px;

line-height:1.9;

color:#ddd;


}




.brands{


display:grid;

grid-template-columns:repeat(2,1fr);

gap:40px;

margin-top:80px;


}



.brand-card{


background:

linear-gradient(
145deg,
#202020,
#111
);


padding:40px;

border-radius:30px;

border:1px solid rgba(212,175,55,.2);

transition:.4s;


}



.brand-card:hover{


transform:translateY(-10px);


box-shadow:

0 20px 50px rgba(212,175,55,.2);


}



.brand-card h2{


color:#d4af37;

font-size:35px;


}



.brand-card p{


color:#ccc;

line-height:1.7;


}




.info{


margin-top:80px;


display:grid;


grid-template-columns:repeat(3,1fr);


gap:30px;


}



.box{


background:white;

color:#111;

padding:40px;

border-radius:30px;

text-align:center;

transition:.4s;


}



.box:hover{


transform:translateY(-12px);


}



.icon{


font-size:45px;

margin-bottom:20px;


}



.box h2{


color:#d4af37;

font-size:30px;


}



.box p{


color:#555;

line-height:1.6;


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


.brands,


.info{


grid-template-columns:1fr;


}



.intro h1{


font-size:40px;


}



}


</style>