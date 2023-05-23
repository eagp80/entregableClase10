import {Router} from "express";
import uploader from "../services/uploader.js";
const router=Router();

const pets=[{nombre:"gato", edad: 2}];
router.get('/', (req,res)=>{
    res.send(pets); //con este metodo solicitamos usuario
});

//router.post('/', (req,res)=>{//con este metodo solicitamos crear pet
router.post('/', uploader.single('image'),(req,res)=>{//si son varios archivos uploader.array('nombre de campos') se almacena en req.files
    
    const pet = req.body;
    console.log(req.body);
    pets.push(pet);
    res.send({status:"ok", message :"pet añadido" });

})
router.put('/', (req,res)=>{
    //con este metodo solicitamos actualizar usuario
       
})
router.delete('/', (req,res)=>{
    //con este metodo solicitamos borrar usuario
       
})


export default router; //cuando se hace export se hace para que otras partes pueda importarlo