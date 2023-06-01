import { Router } from "express";
import db from "../models/schema.js";
import axios from "axios";
const router = Router();

router.get("/api/initialize-database", async (req, res) => {
  try {

    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const jsonData = response.data;

    await db.insertMany(jsonData);

    res.status(200).json({ message: "Database initialized successfully" });
  } catch (error) {
    console.error("Error initializing database:", error);
    res.status(500).json({ error: "Database initialization failed" });
  }
});

export default router