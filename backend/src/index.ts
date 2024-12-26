import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import AlbumRoutes from "./routes/albums";
import SongRoutes from "./routes/songs";
// We use a custom env.ts file to make sure that all the environment variables are in correct types.
import { env } from "./utils/env";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api/albums", AlbumRoutes);
app.use("/api/songs", SongRoutes);

// Connect to MongoDB
mongoose
  .connect(env.MONGO_URL)
  .then(() => {
    app.listen(env.PORT, () =>
      console.log(`Server running on port http://localhost:${env.PORT}`),
    );
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB");
    console.log(error.message);
  });
