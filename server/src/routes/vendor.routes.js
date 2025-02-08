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

// get a vendor/ all vendors
router.get("/", getAllVendors);
router.get("/:id", getVendor, getOneVendor);
router.post("/name", getVendorByName);

// create a vendor
router.post("/", createVendor);

// update a vendor
router.patch("/", getVendor, updateVendor);

// delete a vendor
router.delete("/", getVendor, deleteVendor);

export default router;