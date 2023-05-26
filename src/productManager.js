import { error } from 'console';
import fs from 'fs';
export default class ProductManager {
  constructor(path) {

    this.products = [];
    this.path = path;
  }
  static contador = 0;

  addProduct(title, description,code, price, status, stock, category, thumbnails) {
    let faltanDatos = false;
    const arr = [title, description, code, price, status, stock, category];//para verificar con forEach
    arr.forEach(e => {
      faltanDatos = e===undefined? true: false;
    });
    if (faltanDatos === true) {
      console.log("Faltan datos, no se agregó el producto");
      return;
    } else {
      const verificarCode = this.products.findIndex(p => p.code == code);
      if (verificarCode !== -1) {
        console.log(`Code ${code} ya existente debe asignarle un código diferente.`, "No se agregó el producto.");
        return;
      }
      const newProduct = {
        id: ProductManager.contador,
        title: title,
        description: description,
        code: code,
        price: price,
        status:status,  
        stock:stock,
        category:category,    
        thumbnails: thumbnails,      
        
      };
      this.products.push(newProduct);
      ProductManager.contador++;

      if (!this.path) {
        return console.error("Debe dar Ud. la ruta del archivo.");
      }
      fs.writeFileSync(this.path, JSON.stringify(this.products), 'utf8');
      //fs.writeFileSync(this.path, JSON.parse(this.products), 'utf8');

    }
  }


  getProducts() {
    const data = fs.readFileSync(this.path, 'utf-8');
    const products = JSON.parse(data);
    return products;
  }

  getProductById(Id) {
    const products =this.getProducts();
    const product = products.find((p) => p.id == Id);//ojo no === sino == porque viene de navegador (string)
        if (product) {
            return product;
        } else {
            console.error(`Not found`); 
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
updateProduct(Id, { title, description,code, price, status, stock, category, thumbnails } = {}) {//se inicializa ...
  const productIndex = this.products.findIndex((p) => p.id == Id);// ...elementos del objeto como undefined exepto el Id
  if (productIndex !== -1) {
    //console.log(title);
      const product = this.products[productIndex];//en products cambiaremos solo los campos recibidos
      product.title = title||product.title; // los campos undefined se ignoran
      product.description = description || product.description;//los campos que si reciben un valor si se cambian
      product.code = code || product.code;
      product.price = price || product.price;
      product.status = status || product.status;
      product.stock = stock || product.stock;
      product.category = category||product.category;
      product.thumbnails = thumbnails || product.thumbnails;//el product.id no se tocó, queda igual
      this.products[productIndex] = product;// se reemplaza  solo el producto con el indice correspondiente pero indice queda igual
      fs.writeFileSync(this.path, JSON.stringify(this.products), 'utf8');// el resto del arreglo products queda igual
      console.log(`Producto con id ${Id} ha sido actualizado.`); //se pasa el arreglo products a string y se escribe en el path 
  } else {
      console.log(`Producto con código ${Id} no encontrado.`);
  }
}

//Eliminar un producto
deleteProduct(Id) {
  fs.readFile(this.path, 'utf8', (err, data) => {
      if (err) {
          console.log(`Error al leer el archivo: ${err}`);
          return;
      }

      let products = JSON.parse(data);
      const productIndex = products.findIndex((p) => p.id == Id);

      if (productIndex !== -1) {
          products.splice(productIndex, 1);
          console.log(`Producto con id ${Id} ha sido eliminado.`);

          fs.writeFile(this.path, JSON.stringify(products), (err) => {
              if (err) {
                  console.log(`Error al escribir en el archivo: ${err}`);
              }
          });
      } else {
          console.log(`Producto con id ${Id} no encontrado.`);
      }
  });
}

}

 


// const productManager = new ProductManager("./products.txt");

// productManager.addProduct("Producto 1", "Descripción del producto 1", 100, "imagen/logo1.jpg", 1, 5);
// productManager.addProduct("Producto 2", "Descripción del producto 2", 200, "imagen/logo2.jpg", 2, 12);
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

