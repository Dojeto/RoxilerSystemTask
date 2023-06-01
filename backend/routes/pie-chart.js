import { Router } from "express";
import db from "../models/schema.js";

const router = Router();

router.get("/pie-chart", async (req, res) => {
  try {
    const month = req.query.month;

    const pieChartData = await db.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: "$dateOfSale" }, parseInt(month)],
          },
        },
      },
      {
        $group: {
          _id: "$category",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    res.status(200).json(pieChartData);
  } catch (error) {
    console.error("Error generating pie chart data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while generating pie chart data" });
  }
});

export default router;
