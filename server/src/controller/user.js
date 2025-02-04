import User from "../models/user.js";
import { hash, compare } from "bcrypt";

const SALT = 10;

export const checkToken = async (req, res) => {
   try {
      res.json({
         msg: "authentified",
         email: req.user.email,
         id: req.user.id,
         roles: req.user.roles
      });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
}

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
   try {
      console.log(req.body);
      const user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
         console.log("res.user.name = ", res.user.name);
         msg = "User account already exists. Please log in.";
         res.status(409).json({ msg });
      } else {
         const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            tel: req.body.tel,
            birthDate: req.body.birthDate,
            password: await hash(req.body.password, SALT),
            address: req.body.address,
            newsLetter: req.body.newsLetter
         });
         const newUser = await user.save();
         res.status(201).json({ message: 'Registration successful' });
      }
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
}

export const logUser = async (req, res) => {
   try {
      let msg;
      const user = await User.findOne({ email: req.body.email });
      // if user is found in the DB
      if (user) {
         //console.log(user);
         console.log(req.body.password);
         console.log(user.password);
         const match = await compare(req.body.password, user.password);
         console.log(match);

         if (match) {
            const TOKEN = sign(
               {
                  email: user.email,
                  accountType: user.accountType
               },
               SK);
            res.json({
               TOKEN,
               email: user.email,
               id: user.id,
               roles: user.roles
            });
         } else {
            msg = "Mot de passe erroné. Contactez l'administrateur.";
            res.status(409).json({ msg });
         }
      } else {
         msg = "Wrong username";
         res.status(409).json({ msg });
      }
   } catch (err) {
      throw Error(err);
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
      user = await User.findById(req.params.id);
      if (!user) {
         return res.status(404).json({ message: "Cannot find the user." })
      }
   } catch (err) {
      res.status(500).json({ message: err.message });
   }

   res.user = user;
   next();
}