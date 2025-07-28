import express, { Request, Response } from "express";
const app = express();
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

app.get("/health", (req: Request, res: Response) => {
  res.json({ message: "API is healthy" });
});
