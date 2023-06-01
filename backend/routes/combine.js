import { Router } from "express";
import axios from "axios"

const router = Router();

router.get("/combined-data", async (req, res) => {
  try {
    const month = req.query.month;

    const statisticsResponse = await axios.get(
      `http://localhost:3000/statistics/?month=${month}`
    );
    const barChartResponse = await axios.get(
      `http://localhost:3000/bar-chart/?month=${month}`
    );
    const pieChartResponse = await axios.get(
      `http://localhost:3000/pie-chart/?month=${month}`
    );

    // Combine the responses into a single JSON object
    const combinedData = {
      statistics: statisticsResponse.data,
      barChart: barChartResponse.data,
      pieChart: pieChartResponse.data,
    };

    res.status(200).json(combinedData);
  } catch (error) {
    console.error("Error fetching combined data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching combined data" });
  }
});

export default router;
