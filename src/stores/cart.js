import {
defineStore
}
from "pinia"



export const useCart=
defineStore(
"cart",
{


state:()=>({

items:[]

}),


actions:{


add(product){


this.items.push(product)


}


},


getters:{


total(state){


return state.items.reduce(

(sum,p)=>sum+p.price,

0

)

}


}


})
