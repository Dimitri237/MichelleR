<template>

<div v-if="loading" class="loader">

<div>
<img src="../assets/images/logos/logor.jpg" class="logo" alt="">
</div>

</div>

</template>



<script setup>

import {ref,onMounted} from "vue"


const loading=ref(true)


onMounted(()=>{

setTimeout(()=>{

loading.value=false

},1500)

})


</script>



<style scoped>

.logo{

width:150px;

height:150px;

border-radius:50%;

border:4px solid #d4af37;

object-fit:cover;

}
.loader{

position:fixed;

inset:0;

background:#111;

display:flex;

justify-content:center;

align-items:center;

color:#d4af37;

font-size:40px;

font-weight:bold;

z-index:9999;

animation:floating 2s infinite;

}


</style>