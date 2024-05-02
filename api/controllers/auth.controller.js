import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

//create a new user

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
    next(errorHandler(401, error.message));
  }
};

// SignIn controller
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //check if user exists in the DB
    const validUser = await User.findOne({ email });

    // if user does not exist
    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }
    // check password matches with encrypted password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid Credentials"));
    }
    //create a token
    // passing id as payload because its the most unique thing and cannot be guessed.
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    // remove password from the valid user to pass it to client
    const { password: hashedPassword, ...rest } = validUser._doc;

    const expires = new Date(Date.now() + 86400000); // 1 day in milliseconds

    // send token to the user in the form of cookie
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
