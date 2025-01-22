import User from "../models/user.js";

export const getOneUser = (req, res) => {
   res.send(res.user);
}

export const getAllUsers = async (req, res) => {
   try {
      const users = await User.find();
      res.json(users);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
}

export const createUser = async (req, res) => {
   const user = new User({
      name: req.body.name,
      address: req.body.address,
      registerDate: req.body.registerDate,
   });

   try {
      const newUser = await user.save();
      res.status(201).json(newUser);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
}

export const updateUser = async (req, res) => {
   if (!req.body.name) {
      res.user.name = req.body.name;
   }
   if (!req.body.address) {
      res.user.address = req.body.address;
   }

   try {
      const updatedUser = await res.user.save();
      res.json(updatedUser);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
}

export const deleteUser = async (req, res) => {
   try {
      await res.user.remove();
      res.json({ message: "User deleted." });
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
}

// middleware function:  find an user by ID
export const getUser = async (req, res, next) => {
   let user;
   try {
      user = await user.findById(req.params.id);
      if (!user) {
         return res.status(404).json({ message: "Cannot find the user." })
      }
   } catch (err) {
      res.status(500).json({ message: err.message });
   }

   res.user = user;
   next();
}