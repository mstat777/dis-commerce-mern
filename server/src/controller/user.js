import { User } from "../models/user.js";
import { hash, compare } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

const { sign } = jsonwebtoken;
const { SK } = process.env;
const SALT = 10;

export const checkToken = async (req, res) => {
   try {
      res.json({
         msg: "authentifié",
         email: req.user.email,
         id: req.user.id,
         roles: req.user.roles
      });
   } catch (err) {
      res.status(500).json({ msg: err.message });
   }
}

export const getOneUser = (req, res) => {
   console.log("res.user = ");
   console.log(res.user);
   res.send(res.user);
}

export const getAllUsers = async (req, res) => {
   try {
      const users = await User.find();
      res.json(users);
   } catch (err) {
      res.status(500).json({ msg: err.message });
   }
}

export const createUser = async (req, res) => {
   try {
      console.log(req.body);
      const user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
         console.log("res.user.name = ", res.user.name);
         msg = "Un utilisateur avec cette adresse mail existe déjà. ";
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
         res.status(201).json({ msg: 'Utilisateur créé' });
      }
   } catch (err) {
      res.status(400).json({ msg: err.message });
   }
}

export const logUser = async (req, res) => {
   try {
      let msg;
      const user = await User.findOne({ email: req.body.email });
      // if user is found in the DB
      if (user) {
         console.log(user.id);
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
         msg = "Mauvais identifiant";
         res.status(409).json({ msg });
      }
   } catch (err) {
      throw Error(err);
   }
}

export const updateUser = async (req, res) => {
   if (req.body.name) {
      res.user.name = req.body.name;
   }
   if (req.body.address) {
      res.user.address = req.body.address;
   }

   try {
      const updatedUser = await res.user.save();
      res.json(updatedUser);
   } catch (err) {
      res.status(400).json({ msg: err.message });
   }
}

export const deleteUser = async (req, res) => {
   try {
      await res.user.deleteOne();
      res.json({ msg: "Utilisateur supprimé" });
   } catch (err) {
      res.status(400).json({ msg: err.message });
   }
}

// middleware function:  find an user by ID
export const getUser = async (req, res, next) => {
   let user;
   try {
      console.log(req.params.id);
      user = await User.findById(req.params.id);
      if (!user) {
         return res.status(404).json({ msg: "L'utilisateur n'a pas été trouvé" })
      }
   } catch (err) {
      res.status(500).json({ msg: err.message });
   }

   res.user = user;
   next();
}