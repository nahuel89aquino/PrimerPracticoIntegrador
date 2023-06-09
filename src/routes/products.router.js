import { Router } from "express";
import { ProductService } from "../services/products.services.js";
import ProductManager from "../DAO/productManger.js";

const routerProducts = Router();
const prodManger = new ProductManager("./productos.json");
const prodService = new ProductService();

routerProducts.get("/", async (req,res) =>{
    const {limit,sort,page,...query} = req.query;
    try {
        const products = await prodService.getSome({limit,sort,req,page,query});
        const {docs, ...infoPag} = products;
        return res.status(200).json({status:"success", payload:docs,...infoPag});
        
    } catch (error) {
        return res.status(400).json({status:"error", payload: error.message})
        
    }

});
routerProducts.get("/:pid",(req,res) =>{
    const pid = req.params.pid;
    try {
        const product = prodService.getById(pid);
        return res.status(200).json({status:"success", product});
    } catch (error) {
        return res.status(400).json({status: "error", payload: error.message});
    }
});

routerProducts.post("/",(req,res) => {
    try {
        const product = prodService.createOne(req.body);
        return res.status(200).json({status: "success", payload: product});
    } catch (error) {
        return res.status(400).json({status: "error", payload: error.message});
    }
});

routerProducts.put("/:pid",(req,res)=>{
    const id = req.params.pid
    try {
        const product = prodService.updateOne(id,req.body);
        return res.status(200).json({status: "success", payload: product});
    } catch (error) {
        return res.status(400).json({status: "error", payload: error.message});
    }
});

routerProducts.delete("/:pid", (req,res) => {
    const id = req.params.pid
    try {
        const product = prodService.delete(id);
        return res.status(200).json({status: "success", payload: product});
    } catch (error) {
        return res.status(400).json({status: "error", payload: error.message});
    }
});

export default routerProducts;