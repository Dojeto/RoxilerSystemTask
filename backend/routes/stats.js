import { Router } from "express";
import db from "../models/schema.js";

const router = Router();

router.get("/statistics", async (req, res) => {
  try {
    const month = req.query.month;

    const totalSaleAmount = await db.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: "$dateOfSale" }, parseInt(month)],
          },
          sold: true,
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$price",
          },
        },
      },
    ]);

    const totalSoldItems = await db.countDocuments({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, parseInt(month)],
      },
      sold: true,
    });

    const totalNotSoldItems = await db.countDocuments({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, parseInt(month)],
      },
      sold: false,
    });

    res.status(200).json({
      totalSaleAmount:
        totalSaleAmount.length > 0 ? totalSaleAmount[0].total : 0,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching statistics" });
  }
});

export default router;
