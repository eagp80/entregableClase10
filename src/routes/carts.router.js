import {Router} from "express";
import uploader from "../services/uploader.js";
import CartManager from "../cartManager.js";

const cartManager = new CartManager("./carts.json");
const carts =cartManager.getCarts();
cartManager.carts=carts;

const ids = carts.map(cart => cart.id);
console.log(ids);
if(carts.length!=0){
    CartManager.contador = Math.max(...ids)+1;
} else {CartManager.contador =1};

const router=Router();

const pets=[{nombre:"gato", edad: 2}];
router.get('/', (req,res)=>{
    const carts = cartManager.getCarts();
    res.send(carts); //con este metodo solicitamos usuario
});

//router.post('/', (req,res)=>{//con este metodo solicitamos crear pet
router.post('/',(req,res)=>{//si son varios archivos uploader.array('nombre de campos') se almacena en req.files
    cartManager.addCart();
    res.send({status:"ok", message :"Carrito añadido" });

})
router.put('/', (req,res)=>{
    //con este metodo solicitamos actualizar usuario
       
})
router.delete('/', (req,res)=>{
    //con este metodo solicitamos borrar usuario
       
})


export default router; //cuando se hace export se hace para que otras partes pueda importarlo