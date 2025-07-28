"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./routes/index"));
const supabase_1 = require("./utils/supabase");
const PORT = 8000;
dotenv_1.default.config();
const app = (0, express_1.default)();
//middlewares
app.use((0, cors_1.default)({ origin: "*" })); //Allowing all Origins for now
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use("/api", index_1.default);
app.get("/", (req, res) => {
    res.json({ message: "App is Live" });
});
app.get("/health", async (req, res) => {
    try {
        const { error } = await supabase_1.supabase.from("users").select("id").limit(1);
        if (error) {
            console.error("❌ Supabase error:", error.message);
            return res.status(500).json({ message: "Database connection failed" });
        }
        res.status(200).json({ message: "Healthy" });
    }
    catch (err) {
        console.error("❌ Health check failed:", err);
        res.status(500).json({ message: "Server or Supabase connection failed" });
    }
});
app.listen(PORT, "0.0.0.0", () => {
    console.log(`App running on port ${PORT}`);
});
