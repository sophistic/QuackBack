import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import router from "./routes/index";
import { supabase } from "./utils/supabase";
const PORT = 8000;

dotenv.config();

const app = express();

//middlewares
app.use(cors({ origin: "*" })); //Allowing all Origins for now
// app.options("*", cors({ origin: "*" })); // Allow preflight across all routes
// app.options("*", cors()); // Handle preflight
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "App is Live" });
});
app.get("/health", async (req: Request, res: Response) => {
  try {
    const { error } = await supabase.from("users").select("id").limit(1);

    if (error) {
      console.error("❌ Supabase error:", error.message);
      return res.status(500).json({ message: "Database connection failed" });
    }
    res.status(200).json({ message: "Healthy" });
  } catch (err) {
    console.error("❌ Health check failed:", err);
    res.status(500).json({ message: "Server or Supabase connection failed" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`App running on port ${PORT}`);
});
