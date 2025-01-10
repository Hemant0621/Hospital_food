import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose, { ConnectOptions } from "mongoose";
import manager from "./routes/manager";
import pantry from "./routes/pantry";
import delivery from "./routes/delivery";
import auth from "./routes/auth";

const app = express();

mongoose.connect(process.env.MONGOOSE_CONNECTING_STRING || "", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

app.use(cors());
app.use(bodyParser.json());

app.use("/manager", manager );
app.use("/pantry", pantry);
app.use("/delivery", delivery);
app.use("/auth", auth);

export default app;
