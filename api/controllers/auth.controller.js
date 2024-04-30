import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  //hash the password to store in DB
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();

    res.status(201).json({ message: "User Created Successfully!", newUser });
  } catch (error) {
    // res.status(500).json(error.message);
    // next(error);
    next(errorHandler(401, "This is custom error"));
  }
};
