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

router.get('/:cid', (req,res)=>{
    const cid=req.params.cid;
    let cart= cartManager.getCartById(cid); 
    if(!cart){
        res.send({error:"El producto no existe."});
    }   
    else {
        
        res.send({productos:cart.products})}; 
})

//router.post('/', (req,res)=>{//con este metodo solicitamos crear pet
router.post('/',(req,res)=>{//si son varios archivos uploader.array('nombre de campos') se almacena en req.files
    cartManager.addCart();
    res.send({status:"ok", message :"Carrito añadido" });

})

router.post('/:cid/product/:pid', (req,res)=>{
        //con este metodo solicitamos agregar producto pid a carrito cid
        const cid = req.params.cid;
        const pid = req.params.pid;       
       
        cartManager.updateCart(cid,pid);
        res.send({status:"ok", message :`Producto ${pid} añadido al carrito ${cid}`});
    
    })// falta revisar si se guarda formatos de arreglo de thumbnails y formatos numnber, true y string

router.put('/', (req,res)=>{
    //con este metodo solicitamos actualizar usuario
       
})
router.delete('/', (req,res)=>{
    //con este metodo solicitamos borrar usuario
       
})


export default router; //cuando se hace export se hace para que otras partes pueda importarlo