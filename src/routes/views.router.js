import {Router} from "express";
import ProductManager from '../productManager.js'
const productManager = new ProductManager("./products.json");
const products =productManager.getProducts();
productManager.products=products;

const ids = products.map(product => product.id);
console.log("Arreglo con todos los ids disponibles de productos:");
console.log(ids);
if(products.length!=0){
    ProductManager.contador = Math.max(...ids)+1;
} else {ProductManager.contador =1};

const router= Router();

router.get('/',(req,res)=>{
    //const products= [];
    res.render('home', {products})
    //res.render('index')

});


export default router;

