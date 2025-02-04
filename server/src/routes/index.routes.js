import { Router } from "express";
import userRoutes from "./user.routes.js";
import productRoutes from "./product.routes.js";
import vendorRoutes from "./vendor.routes.js";

const router = Router();

router.use("/user", userRoutes);
router.use("/product", productRoutes);
router.use("/vendor", vendorRoutes);

export default router;