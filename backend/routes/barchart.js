import { Router } from "express";
import db from "../models/schema.js";

const router = Router();

router.get("/bar-chart", async (req, res) => {
  try {
    const month = req.query.month;

    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity },
    ];

    const barChartData = [];

    // Iterate over each price range and count the number of items
    for (const range of priceRanges) {
      const count = await db.countDocuments({
        $expr: {
          $eq: [{ $month: "$dateOfSale" }, parseInt(month)],
        },
        price: { $gte: range.min, $lte: range.max },
      });

      barChartData.push({
        range: `${range.min}-${range.max}`,
        count,
      });
    }

    res.status(200).json(barChartData);
  } catch (error) {
    console.error("Error generating bar chart data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while generating bar chart data" });
  }
});

export default router;
