import Vendor from "../models/vendor.js";

export const getOneVendor = (req, res) => {
   res.send(res.vendor);
}

export const getAllVendors = async (req, res) => {
   try {
      const Vendors = await Vendor.find();
      res.json(Vendors);
   } catch (err) {
      res.status(500).json({ msg: err.message });
   }
}

export const getVendorByName = async (req, res) => {
   try {
      const vendors = await Vendor.find({ name: req.body.name });
      res.json(vendors);
   } catch (err) {
      res.status(500).json({ msg: err.message });
   }
}

export const createVendor = async (req, res) => {
   try {
      let msg;
      console.log(req.body);
      const vendor = new Vendor(req.body);
      console.log(vendor);

      // verify if there is already a vendor with the same name in the DB:
      const vendorExist = await Vendor.findOne({ name: vendor.name });

      if (vendorExist) {
         msg = "Un vendeur avec ce nom existe déjà !";
         res.status(409).json({ msg });
      } else {
         await vendor.save();
         msg = "Le vendeur a été créé.";
         res.status(201).json({ msg });
      }
   } catch (err) {
      res.status(400).json({ msg: err.message });
   }
}

export const updateVendor = async (req, res) => {
   console.log(req.body);
   if (req.body.name) {
      res.vendor.name = req.body.name;
   }
   if (req.body.address) {
      res.vendor.address = req.body.address;
   }

   try {
      const updatedVendor = await res.vendor.save();
      res.json(updatedVendor);
   } catch (err) {
      res.status(400).json({ msg: err.message });
   }
}

export const deleteVendor = async (req, res) => {
   try {
      console.log(res.vendor);
      await res.vendor.deleteOne();
      res.json({ msg: "Vendeur supprimé." });
   } catch (err) {
      res.status(400).json({ msg: err.message });
   }
}

// middleware function:  find a vendor by name
export const getVendor = async (req, res, next) => {
   let vendor;
   try {
      vendor = await Vendor.findOne({ name: req.body.name });
      if (!vendor) {
         return res.status(404).json({ msg: "Le vendeur n'a pas été trouvé" })
      }
   } catch (err) {
      res.status(500).json({ msg: err.message });
   }

   res.vendor = vendor;
   next();
}