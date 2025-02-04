import Vendor from "../models/vendor.js";

export const getOneVendor = (req, res) => {
   res.send(res.vendor);
}

export const getAllVendors = async (req, res) => {
   try {
      const Vendors = await Vendor.find();
      res.json(Vendors);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
}

export const getVendorByName = async (req, res) => {
   try {
      const vendors = await Product.find({ name: req.body.name });
      res.json(vendors);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
}

export const createVendor = async (req, res) => {
   try {
      let msg;
      const vendor = new Vendor(req.body);

      // verify if there is already a vendor with the same name in the DB:
      const vendorExist = await Product.findOne({ name: vendor.name });

      if (vendorExist) {
         msg = "Un vendeur avec ce nom existe déjà !";
         res.status(409).json({ msg });
      } else {
         await vendor.save();
         msg = "Le vendeur a été créé.";
         res.status(201).json({ msg });
      }
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
}

export const updateVendor = async (req, res) => {
   if (!req.body.name) {
      res.product.name = req.body.name;
   }
   if (!req.body.address) {
      res.product.address = req.body.address;
   }

   try {
      const updatedVendor = await res.product.save();
      res.json(updatedVendor);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
}

export const deleteVendor = async (req, res) => {
   try {
      await res.product.remove();
      res.json({ message: "Vendeur supprimé." });
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
}

// middleware function:  find an product by ID
export const getVendor = async (req, res, next) => {
   let product;
   try {
      product = await Vendor.findById(req.params.id);
      if (!product) {
         return res.status(404).json({ message: "Ce vendeur n'a pas été trouvé" })
      }
   } catch (err) {
      res.status(500).json({ message: err.message });
   }

   res.product = product;
   next();
}