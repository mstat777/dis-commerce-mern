import { Router } from "express";
import {
   getOneVendor,
   getAllVendors,
   getVendorByName,
   createVendor,
   updateVendor,
   deleteVendor,
   getVendor
} from "../controller/vendor.js";

const router = Router();

// get an Product/ all Products
router.get("/", getAllVendors);
router.get("/:id", getVendor, getOneVendor);
router.post("/name", getVendorByName);

// create an Product
router.post("/", createVendor);

// update an Product
router.patch("/", getVendor, updateVendor);

// delete an Product
router.delete("/:id", getVendor, deleteVendor);

export default router;