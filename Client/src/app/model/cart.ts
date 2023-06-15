import { Product } from "./product"

export class Cart {
    id: any
    user: any
    products: CartProduct[] = []
    paid: boolean = false
    totalPrice: number = 0
 

    constructor(){
        this.user = localStorage.getItem('user')
    }
	
 
}

export class CartProduct {
    product : Product
    qty = 1
    constructor(product : Product){
        this.product = product
        
    }
}