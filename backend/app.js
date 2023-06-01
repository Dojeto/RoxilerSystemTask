import express from "express";
import cors from "cors";
import { config } from "dotenv";
import home from "./routes/home.js";
import init from "./routes/init.js";
import stats from "./routes/stats.js";
import mongo from "./models/db.js";
import barchart from "./routes/barchart.js";
import piechart from "./routes/pie-chart.js";
import combine from "./routes/combine.js"

import corsOptions from "./config/corsOptions.js";

const port = process.env.PORT || 3000;

const app = express();
config();

app.use(express.json());
app.use(cors(corsOptions));

app.use("/", home);
app.use("/", init);
app.use("/", stats);
app.use("/", barchart);
app.use("/", piechart);
app.use("/", combine);

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
