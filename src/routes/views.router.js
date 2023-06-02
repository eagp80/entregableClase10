import {Router} from "express";
import ProductManager from '../productManager.js'
const productManager = new ProductManager("./products.json");
const products =productManager.getProducts();
productManager.products=products;


const router= Router();

router.get('/',(req,res)=>{
    //const products= [];
    res.render('home', {products})
    //res.render('index')

});


export default router;

