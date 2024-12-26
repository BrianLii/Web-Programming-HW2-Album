import express from "express";
import {
  createAlbum,
  deleteAlbum,
  getAlbum,
  getAlbums,
  updateAlbum,
} from "../controllers/albums";

const router = express.Router();

// GET /api/albums
router.get("/", getAlbums);
// GET /api/albums/:id
router.get("/:id", getAlbum);
// POST /api/albums
router.post("/", createAlbum);
// DELETE /api/albums/:id
router.delete("/:id", deleteAlbum);

router.put("/:id", updateAlbum);

// export the router
export default router;
