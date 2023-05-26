import {Router} from "express";
import uploader from "../services/uploader.js";
import ProductManager from '../productManager.js'
const productManager = new ProductManager("./products.json");
const products =productManager.getProducts();
productManager.products=products;

const ids = products.map(product => product.id);
console.log(ids);
if(products.length!=0){
    ProductManager.contador = Math.max(...ids)+1;
} else {ProductManager.contador =1};


//productManager.addProduct("Producto 1", "Descripción del producto 1", "code1",2000,true, 10, "A1", "imagen/logo1.jpg");
// productManager.addProduct("Producto 2", "Descripción del producto 2", "code2",2000,true,10, "A1","imagen/logo2.jpg");
// productManager.addProduct("Producto 3", "Descripción del producto 3", "code3",2000,true,10, "A1","imagen/logo3.jpg");
// productManager.addProduct("Producto 4", "Descripción del producto 4", "code4",2000,true,10,"A1", "imagen/logo4.jpg");
// productManager.addProduct("Producto 5", "Descripción del producto 5", "code5",2000,true,10, "A1","imagen/logo5.jpg");
// productManager.addProduct("Producto 6", "Descripción del producto 6", "code6",2000,true,10,"A1", "imagen/logo6.jpg");
// productManager.addProduct("Producto 7", "Descripción del producto 7", "code7",2000,true,10,"A1", "imagen/logo7.jpg");
// productManager.addProduct("Producto 8", "Descripción del producto 8", "code8",2000,true,10,"A1", "imagen/logo8.jpg");
// productManager.addProduct("Producto 9", "Descripción del producto 9", "code9",2000,true,10,"A1", "imagen/logo9.jpg");
// productManager.addProduct("Producto 10", "Descripción del producto 10", "code10",2000,true,10,"A1", "imagen/logo10.jpg");

const router= Router(); //mini aplicativo para redirigirme a otros lugares

router.get('/', (req,res)=>{
    let limit=req.query.limit;
    let productsX= productManager.getProducts();
    
    if(limit){
        //enviar cantidad de productos igual a limit
        let arr=[];
        for(let i=0; i<limit; i++){
            arr.push(productsX[i]);                         
        }
        res.send({products:arr});
    }
    else{
        //enviar arreglo de productos completo
        res.send({products:productsX}); 
    }
       
})


router.get('/:pid', (req,res)=>{
    const pid=req.params.pid;
    let producto= productManager.getProductById(pid); 
    if(!producto){
        res.send({error:"El producto no existe."});
    }   
    else {res.send({producto:producto})}; 
})
//al no existir el id del producto, debe devolver un objeto
// con un error indicando que el producto no existe.

router.post('/',uploader.single('image'), (req,res)=>{
//router.post('/', (req,res)=>{

    //con este metodo solicitamos crear producto
    const {title, description, code,price,status, stock, category, thumbnails, image} = req.body;       
    //const productsX= productManager.getProducts();
    //console.log(`productos X ${productsX}`);
    productManager.addProduct(title, description, code,price,status, stock, category, thumbnails);
    res.send({status:"ok", message :"Producto añadido" });

})// falta revisar si se guarda formatos de arreglo de thumbnails y formatos numnber, true y string
router.put('/:pid',uploader.single('image'), (req,res)=>{
    //con este metodo solicitamos actualizar producto
    const pid=req.params.pid;
    //const productsX= productManager.getProducts();   
    const {title, description, code,price,status, stock, category, thumbnails, image} = req.body; 
    //const objAux ={title, description, code,price,status, stock, category, thumbnails};

    //console.log(objAux);
    productManager.updateProduct(pid,{title, description, code,price,status, stock, category, thumbnails});
    res.send({status:"ok", message :`Producto con id: ${pid}, actualizado`});  
})
router.delete('/:pid', (req,res)=>{
    //con este metodo solicitamos borrar producto
    const pid=req.params.pid;
    productManager.deleteProduct(pid);
    res.send({status:"ok", message :`Producto con id: ${pid}, eliminado`});
       
})


export default router; //cuando se hace export se hace para que otras partes pueda importarlo