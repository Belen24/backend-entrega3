import { ProductsService } from "../../services/products.service.js";
import { cartsModel } from "../models/carts.model.js";
import { productsModel } from "../models/products.model.js";
import { ticketsModel } from "../models/tickets.model.js";

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
            const result = JSON.parse(JSON.stringify(data));
            return result;
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
        //console.log(pid);
        
        try {
            const cart = await this.get(cid);
            //console.log("cart", cart);
            //console.log(cart.products[0]);
            //console.log(cart.products.map ((products) => products));
            const existingProductIndex = cart.products.findIndex((product) => product.productId._id === pid);
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

    async purchase(cid) {
       try {
        const productsApproved = [];
        const productsRejected = [];
  
        // Verificar que el carrito exista 
        const cart = await this.get(cid);
        //console.log("cart", cart);
            if (!cart) {
            throw new Error('El carrito no existe');
            } 
            if (!cart.products.length) {
                throw new Error('El carrito no tiene productos');
            }else{
                for (let i=0; i <cart.products.length; i++){
                    const productCart = cart.products[i]._id;
                    const productDB = await productManager.getProductById(productCart);
                    let Comparison = parseInt(productDB.stock) - cart.products[i].quantity;

                    if (Comparison >=0){
                        productsApproved.push(cart.products[i]);
                        Fullpurchase = productDB.price * cart.product[i].quantity
                        
                    }else{
                        productsRejected.push(cart.products[i]);
                    }

                    if(productsApproved >0 && productsRejected == 0){
                        const ticketData = cart(cid)
                        const ticketCreated = await ticketsModel.create(ticketData);
                        return { ticket: ticketCreated };
                    }else if (productsApproved >0 && productsRejected >= 0){
                        "Hay productos que no cuentan con el stock suficiente para generar tu compra"
                    }

                }
            }
       }catch (error) {
        
       }
      }
    
      
    

};