import { Router } from "express";
import {
   getOneProduct,
   getAllProducts,
   getProductByTitle,
   createProduct,
   updateProduct,
   deleteProduct,
   getProduct
} from "../controller/product.js";

const router = Router();

// get an Product/ all Products
router.get("/", getAllProducts);
router.get("/:id", getProduct, getOneProduct);
router.post("/title", getProductByTitle);

// create an Product
router.post("/", createProduct);

// update an Product
router.patch("/", getProduct, updateProduct);

// delete an Product
router.delete("/:id", getProduct, deleteProduct);

export default router;