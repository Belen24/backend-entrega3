import { cartsModel } from "../models/carts.model.js";

export class CartsMongo{
    constructor(){
        this.model=cartsModel;
    };

    async createCart(){
        try {
            const cart = {
                products:[]
            };
            const cartCreated = await this.model.create(cart);
            return cartCreated;
        } catch (error) {
            throw error;
        }
    };

    async get(cartId){
        try {
            const result = await this.model.findOne({_id:cartId});
            if(!result){
                throw new Error(`No se encontro el carrito ${error.message}`);
            }
            //convertir el formato bson a json
            const data = JSON.parse(JSON.stringify(result));
            return data;
        } catch (error) {
            throw new Error(`Error create cart ${error.message}`);
        }
    };

    async getCartById(id){
        try {
            const data = await this.model.findById(id);
            if(!data){
                throw new Error("el carrito no existe")
            }
            return data;
        } catch (error) {
            throw new Error(`Error al obtener carrito ${error.message}`);
        }

        
    };

    /*async addProduct(cid,pid){
        try {
            const cart = await this.get(cid);
            cart.products.push({pid:pid, quantity:1});
            console.log("cart", cart);
            const result = await this.model.findByIdAndUpdate(cid,cart,{new:true});
            return result;
        } catch (error) {
            throw new Error(`Error al agregar el producto ${error.message}`);
        }
    };*/
    async addProduct(cid, pid) {
        console.log(pid);
        
        try {
            const cart = await this.get(cid);
            console.log("cart", cart);
    
            // Verificar si el producto ya existe en el carrito
            const existingProductIndex = cart.products.findIndex((products) => products.productId === pid);
            console.log(existingProductIndex);
    
            if (existingProductIndex !== -1) {
                // Si el producto ya existe, simplemente incrementar la cantidad
                cart.products[existingProductIndex].quantity ++;
            } else {
                // Si el producto no existe, agregar un nuevo producto al carrito
                cart.products.push({ productId: pid, quantity: 1 });
            }
    
           
            const result = await this.model.findByIdAndUpdate(cid, cart, { new: true });
            return result;
        } catch (error) {
            throw new Error(`Error al agregar el producto ${error.message}`);
        }
    };

};