<template>

<section class="contact">


<div class="container">


<div class="title reveal">

<h1>
Contact Us
</h1>

<p>
We are happy to welcome you. Contact Michelle's Restaurant today.
</p>

</div>



<div class="contacts">




<div class="card reveal">


<img
src="../assets/images/logos/infoR.jpg"
alt="Michellesrestaurant"
class="logo"
/>


<h2>
Michelle's Restaurant
</h2>


<p>
African, European and international cuisine.
</p>



<div class="details">

<p>
📍 Location: Yaoundé, Cameroon
</p>

<p>
📞 Phone: +237 XXX XXX XXX
</p>

<p>
🕒 Open: Monday - Sunday
</p>


</div>



<a 
href="#"
class="button"
>
Reserve a Table
</a>


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


.contact{


padding:150px 0 100px;


background:


radial-gradient(

circle at top,

rgba(212,175,55,.18),

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



.title{


text-align:center;

margin-bottom:70px;


}



.title h1{


font-size:60px;

color:#d4af37;


}



.title p{


color:#ccc;

font-size:20px;


}

.card{


background:


linear-gradient(

145deg,

#202020,

#111

);


padding:40px;

border-radius:35px;

text-align:center;


border:1px solid rgba(212,175,55,.2);


transition:.5s;


}



.card:hover{


transform:translateY(-15px);


box-shadow:

0 25px 60px rgba(212,175,55,.2);


}



.logo{


width:100%;

max-width:350px;

border-radius:25px;


box-shadow:

0 15px 40px rgba(0,0,0,.5);


}



.card h2{


font-size:35px;

color:#d4af37;

margin-top:30px;


}



.card p{


color:#ddd;

line-height:1.7;


}



.details{


margin:30px 0;

text-align:center;


}



.button{


display:inline-block;

background:#d4af37;

color:#111;

padding:15px 35px;

border-radius:40px;

font-weight:bold;

text-decoration:none;

transition:.3s;


}



.button:hover{


transform:scale(1.05);


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




@media(max-width:800px){


.contacts{


grid-template-columns:1fr;


}



.title h1{


font-size:40px;


}



}


</style>