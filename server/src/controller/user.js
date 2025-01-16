import User from "../models/user.js";

export const getUser = (req, res) => {
   res.send(req.params.id);
}

export const getAllUsers = async (req, res) => {
   try {
      const users = await User.find();
      res.status(200).json(users);
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

export const updateUser = (req, res) => {
   res.send('Hello World!');
}

export const deleteUser = (req, res) => {
   res.send('Hello World!');
}