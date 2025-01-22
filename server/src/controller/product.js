import product from "../models/product.js";

export const getOneProduct = (req, res) => {
   res.send(res.product);
}

export const getAllProducts = async (req, res) => {
   try {
      const Products = await product.find();
      res.json(Products);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
}

export const createProduct = async (req, res) => {
   /*const product = new product({
      name: req.body.name,
      address: req.body.address,
      registerDate: req.body.registerDate,
   });*/
   const product = new product(req.body);

   try {
      const newProduct = await product.save();
      res.status(201).json(newProduct);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
}

export const updateProduct = async (req, res) => {
   if (!req.body.title) {
      res.product.title = req.body.title;
   }
   if (!req.body.address) {
      res.product.address = req.body.address;
   }

   try {
      const updatedProduct = await res.product.save();
      res.json(updatedProduct);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
}

export const deleteProduct = async (req, res) => {
   try {
      await res.product.remove();
      res.json({ message: "product deleted." });
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
}

// middleware function:  find an product by ID
export const getProduct = async (req, res, next) => {
   let product;
   try {
      product = await product.findById(req.params.id);
      if (!product) {
         return res.status(404).json({ message: "Cannot find the product." })
      }
   } catch (err) {
      res.status(500).json({ message: err.message });
   }

   res.product = product;
   next();
}