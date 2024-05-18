import { config } from "dotenv";
import fs from "fs";
import path from "path";
config({ path: "./.env" });

// Import necessary modules
import express from "express";
import cors from "cors";
import connectDB from "./db/connect.js";
import ProductRoutes from "./routes/products.js";
import userRoutes from "./routes/users.js";
import { cloudinaryConfig } from "./config/cloudinaryconfig.js";

const app = express();
const PORT = process.env.PORT || 5000;


  app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST'], // Allow only specified HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow only specified headers
  }));
  

app.use(express.json());
app.disable("x-powered-by"); // Less hacker know about our stack now

app.use("*", cloudinaryConfig);

app.get("/", (req, res) => {
  res.send("Hello from server");
});

// Routes
app.use("/api/products", ProductRoutes);
app.use("/auth", userRoutes);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);

    // Read and parse the JSON file
    const productJsonPath = new URL("./product.json", import.meta.url);
    const productJsonData = fs.readFileSync(productJsonPath, "utf8");
    const productData = JSON.parse(productJsonData);

    // Dynamically import the Product model
    const { default: Product } = await import("./models/product.js");

    // Connect and send data from productJson to MongoDB
    await Product.deleteMany(); // Optional: Clear existing data
    await Product.create(productData); // Insert product data

    app.listen(PORT, () => {
      console.log(`${PORT} I am Connected`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
