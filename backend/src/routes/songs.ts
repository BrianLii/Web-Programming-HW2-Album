// import {} from "../controllers/lists";
import express from "express";
import {
  createSong,
  getSongByIds,
  updateSong,
} from "../controllers/songs";

const router = express.Router();

router.get("/", getSongByIds);
router.post("/", createSong);
router.put("/:id", updateSong);


// export the router
export default router;
