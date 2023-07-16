import { cartsDao } from "../daos/factory.js";

export class CartsService{
    static async createCart(){
        return cartsDao.createCart();
    };

    static async addProduct(cid, pid){
        return cartsDao.addProduct(cid, pid);
    };

    
};