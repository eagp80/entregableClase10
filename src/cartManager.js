import { error } from 'console';
import fs from 'fs';

export default class CartManager {
  constructor(path) {

    this.carts = [];
    this.path = path;
  }
  static contador = 0;

  addCart() {
        
    const newCart = {      
      id: CartManager.contador,
      products: []        
      };
      this.carts.push(newCart);
      CartManager.contador++;

      if (!this.path) {
        return console.error("Debe dar Ud. la ruta del archivo.");
      }
      fs.writeFileSync(this.path, JSON.stringify(this.carts), 'utf8');
      //fs.writeFileSync(this.path, JSON.parse(this.products), 'utf8');    
  }


  getCarts() {
    const data = fs.readFileSync(this.path, 'utf-8');
    const carts = JSON.parse(data);
    return carts;
  }

  getCartById(Id) {//retornara los productos del carrito 
    const carts =this.getCarts();
    const cart = carts.find((c) => c.id == Id);//ojo no === sino == porque viene de navegador (string)
        if (cart) {
            return cart;
        } else {
            console.error(`Not found cart`); 
            return;         
        }
    // const indexProduct = this.products.findIndex(p => p.id === Id);
    // if (indexProduct === -1) {
    //   console.log("Not found");
    //   return "Not found";
    // }
    // console.log("El productos es:", this.products[indexProduct]);
    // return this.products[indexProduct];
  }
//Actualizar un producto
updateCart(cid, pid) {
  const carts =this.getCarts();
  const cartIndex = carts.findIndex((c) => c.id == cid);
  if (cartIndex !== -1) {
    //falta hacer alguna logica para actualizar algo en carrito
      const cart = carts[cartIndex];//
      if(cart.products.length>0){
        const indexProductId = cart.products.findIndex((p)=>p.productId==pid);
        if(indexProductId !==-1){
          this.carts[cartIndex].products[indexProductId].quantity++;
          fs.writeFileSync(this.path, JSON.stringify(this.carts), 'utf8');// el resto del arreglo products queda igual
          console.log(`Carrito con id ${pid} ha sido actualizado.`); //se pasa el arreglo products a string y se escribe en el path 
        } else {
          this.carts[cartIndex].products.push({productId:pid, quantity:1});
          fs.writeFileSync(this.path, JSON.stringify(this.carts), 'utf8');
          console.log(`Carrito con id ${pid} ha sido actualizado.`);  
        }
      } else {
        this.carts[cartIndex].products.push({productId:pid, quantity:1});
        fs.writeFileSync(this.path, JSON.stringify(this.carts), 'utf8');
        console.log(`Carrito con id ${pid} ha sido actualizado.`);
      }     
      
  } else {
      console.log(`Carrito con código ${pid} no encontrado.`);
  }
}

//Eliminar un producto
deleteCart(Id) {
  fs.readFile(this.path, 'utf8', (err, data) => {
      if (err) {
          console.log(`Error al leer el archivo: ${err}`);
          return;
      }

      let carts = JSON.parse(data);
      const cartIndex = carts.findIndex((c) => c.id == Id);

      if (cartIndex !== -1) {
          carts.splice(cartIndex, 1);
          console.log(`Carrito con id ${Id} ha sido eliminado.`);

          fs.writeFile(this.path, JSON.stringify(carts), (err) => {
              if (err) {
                  console.log(`Error al escribir en el archivo: ${err}`);
              }
          });
      } else {
          console.log(`Carrito con id ${Id} no encontrado.`);
      }
  });
}
}

 
