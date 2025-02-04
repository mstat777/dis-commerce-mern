import Product from "../models/product.js";
import formidable from "formidable";

export const getOneProduct = (req, res) => {
   res.send(res.product);
}

export const getAllProducts = async (req, res) => {
   try {
      const Products = await Product.find();
      res.json(Products);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
}

export const getProductByTitle = async (req, res) => {
   try {
      const Products = await Product.find({ title: req.body.title });
      res.json(Products);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
}

export const createProduct = async (req, res) => {
   const form = formidable({
      uploadDir: `public/img/products`,
      keepExtensions: true,
      allowEmptyFiles: false,
      multiples: true,
   });

   form.parse(req, async (err, fields, files) => {
      try {
         let msg;
         const product = new Product();
         for (const key in fields) {
            product[key] = fields[key][0];
         }

         // verify if there is already a product with the same name in the DB:
         const productExist = await Product.findOne({ title: product.title });

         if (productExist) {
            msg = "Un produit avec ce nom existe déjà !";
            res.status(409).json({ msg });
         } else {
            product.productMainImage = files.file[0].newFilename;

            await Product.save();

            msg = "Le produit a été créé.";
            res.status(201).json({ msg });
         }
      } catch (err) {
         res.status(400).json({ message: err.message });
      }
   });
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
      product = await Product.findById(req.params.id);
      if (!product) {
         return res.status(404).json({ message: "Cannot find the product." })
      }
   } catch (err) {
      res.status(500).json({ message: err.message });
   }

   res.product = product;
   next();
}