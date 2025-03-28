import { Product } from "../models/product.js";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { createProductImagePath } from "../utils/functions.js";

export const getOneProduct = (req, res) => {
   res.send(res.product);
}

export const getAllProducts = async (req, res) => {
   try {
      const Products = await Product.find();
      res.json(Products);
   } catch (err) {
      res.status(500).json({ msg: err.message });
   }
}

export const getProductByTitle = async (req, res) => {
   try {
      const Products = await Product.find({ title: req.body.title });
      res.json(Products);
   } catch (err) {
      res.status(500).json({ msg: err.message });
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
         let oldPath = files.productMainImage.filepath;
         let newPath = path.join('public', 'uploads')
            + '/' + files.productMainImage.name;
         let rawData = fs.readFileSync(oldPath);

         fs.writeFile(newPath, rawData, function (err) {
            if (err) console.log(err);
            //return res.send("Successfully uploaded");
         })

         let msg;
         const product = new Product();
         //console.log(fields);

         product.title = fields.title[0];
         // verify if there is already a product with the same name in the DB:
         const productExist = await Product.findOne({ title: product.title });

         if (productExist) {
            msg = "Un produit avec ce nom existe déjà !";
            res.status(409).json({ msg });
         } else {
            for (const key in fields) {
               //console.log(key);
               product[key] = fields[key][0];
            }

            product.productImagePath = createProductImagePath(product.mainCategory, product.subCategory);

            const images = Object.values(files);
            //console.log(images);

            images.forEach((image, i) => {
               const imageData = {
                  newFilename: image[0].newFilename,
                  originalFilename: image[0].originalFilename,
                  lastModifiedDate: image[0].lastModifiedDate
               }
               if (i !== 0) {
                  product.productOtherImages.push(imageData);
               } else {
                  product.productMainImage = imageData;
               }
            });

            console.log(product);
            await product.save()
               .then(res => console.log(res))
               .catch(err => console.log(err));

            msg = "Le produit a été créé.";
            res.status(201).json({ msg });
         }
      } catch (err) {
         console.log(err);
         res.status(400).json({ msg: err.message });
      }
   });
}

export const updateProduct = async (req, res) => {
   if (req.body.title) {
      res.product.title = req.body.title;
   }
   if (req.body.address) {
      res.product.address = req.body.address;
   }

   try {
      const updatedProduct = await res.product.save();
      res.json(updatedProduct);
   } catch (err) {
      res.status(400).json({ msg: err.message });
   }
}

export const deleteProduct = async (req, res) => {
   try {
      await res.product.deleteOne();
      res.json({ msg: "Le produit a été supprimé de la BDD." });
   } catch (err) {
      res.status(400).json({ msg: err.message });
   }
}

// middleware function:  find an product by ID
export const getProduct = async (req, res, next) => {
   let product;
   try {
      product = await Product.findById(req.params.id);
      if (!product) {
         return res.status(404).json({ msg: "Le produit n'a pas été trouvé" })
      }
   } catch (err) {
      res.status(500).json({ msg: err.message });
   }

   res.product = product;
   next();
}