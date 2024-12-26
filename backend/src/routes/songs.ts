// import {} from "../controllers/lists";
import { createSong, getSongByIds, updateSong } from "../controllers/songs";
import express from "express";

const router = express.Router();

router.get("/", getSongByIds);
router.post("/", createSong);
router.put("/:id", updateSong);

// export the router
export default router;
