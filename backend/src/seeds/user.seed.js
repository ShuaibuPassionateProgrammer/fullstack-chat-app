import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
    // Female Users
    {
    email: "emma.thompson@example.com",
    fullName: "Emma Thompson",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    email: "olivia.miller@example.com",
    fullName: "Olivia Miller",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
  },
];