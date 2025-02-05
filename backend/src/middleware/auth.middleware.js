import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        //
    }
    catch (error) {
    console.log("Error in protectRoute middleware: ", error?.message);
    res.status(500).json({ message: "Internal server error" });
  }
};