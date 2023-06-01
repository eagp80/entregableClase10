import express from "express";

import handlebars from "express-handlebars";
//import ProductManager from './productManager.js'
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import __dirname from './utils.js'

const app = express();
//FLUJO DE TRABAJO..
app.use(express.json()); //permite leer json en las peticiones
//middlewar intercepta la peticion verifica si esta en json, covierte y continua
app.use(express.urlencoded({extended:true}));// permite tener el objeto codificado desde url
//middlewar intercepta que este codificada desde una url si no continua
//app.use(express.static('./src/public'));
app.use(express.static(`${__dirname}/public`));
//tengo que servir un archivo estatico? no? continua    

app.use('/api/products',productsRouter);//conectar con
// la peticion coincide con api products ? no? continua
app.use('/api/carts',cartsRouter);//conectar con
// la peticion coincide con api carts ? si? redirigeme a carts routers

app.engine('handlebars', handlebars.engine());//arrancamos y le ponemos un alias a el motor 
app.set('views', `${__dirname}/views`);//le decimos a app donde estaran las vistas
app.set('view engine', 'handlebars');//le decimos a app que el motor de vistas es handlebars

app.use('/',viewsRouter);


// app.get('/bienvenida', (req,res)=>{
//     res.send(`<h1 style = "color:blue"> Bienvenidos a mi primer servidor con express version 2</h1>`);
// });


// app.get('/DimeNombre/:nombre', (req,res)=>{
//     res.send(`<h1 style = "color:blue">Hola señor ${req.params.nombre} gracias por su visita</h1>`)
// });

// app.get('/ActivaLuces/:LedA/:LedB', (req,res)=>{
//     res.send(`<h1 style = "color:green">Encendida${req.params.LedA} </h1>
//     <h1 style = "color:green">Encendida ${req.params.LedB} </h1>`)
// });

app.listen(
    8080,()=>console.log("Servidor Efren activado en puerto 8080")
);
// let usuarios = [
//     {nombre:"Efren", apellido:"García", edad: 42, correo:"eagp80@gmail.com", genero:"M"},
//     {nombre:"Raul", apellido:"García", edad: 40, correo:"eagp80@gmail.com", genero:"M"},
//     {nombre:"Juan", apellido:"García", edad: 38, correo:"eagp80@gmail.com", genero:"M"},
//     {nombre:"Aldemar", apellido:"García", edad: 45, correo:"eagp80@gmail.com", genero:"M"},
//     {nombre:"Keli", apellido:"García", edad: 29, correo:"eagp80@gmail.com", genero:"F"},
//     {nombre:"Karina", apellido:"García", edad: 36, correo:"eagp80@gmail.com", genero:"F"},

// ]
// app.get('/ejemploQueries', (req,res)=>{
//     let genero=req.query.genero;
//     if(!genero||(genero!="M"&&genero!="F")) {res.send({error: "Ingrese genero M o F"})}
//     else {

//     let usuariosFiltrados=usuarios.filter(usuario=>usuario.genero===genero);
//     let consultas=req.query;
//     let {nombre,apellido,edad}=req.query;
//     res.send({usuarios:usuariosFiltrados});
//     }
// })






// console.log(productManager.getProducts());
// a1=productManager.getProductById(1);
// console.log(a1);
// a0=productManager.getProductById(0);
// console.log(a0);
// a3=productManager.getProductById(3);
// console.log(a3);
// productManager.addProduct("Producto 3", "Descripción del producto 3", 500, "imagen/logo3.jpg", 1, 5);
// productManager.addProduct("Producto 3", "Descripción del producto 3", 500, "imagen/logo3.jpg");
// console.log(productManager.getProducts());
// productManager.updateProduct(1,{title:undefined,description:"Descripcion actualizada producto 3",price:300, thumbnail:"imagen/logo2.jpg", code:2});
// a1=productManager.getProductById(1);
// console.log(a1);
// productManager.deleteProduct(1);
// a1=productManager.getProductById(0);
// console.log(`producto::`,a1);

