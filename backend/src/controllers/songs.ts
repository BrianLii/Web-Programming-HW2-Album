import SongModel from "../models/song";
import { genericErrorHandler } from "../utils/errors";
import type {
  CreateSongPayload,
  CreateSongResponse,
  getSongByIdsResponse,
  SongData,
  UpdateSongPayload,
} from "@lib/shared_types";
import type { Request, Response } from "express";

export const getSongByIds = async (
  req: Request,
  res: Response<getSongByIdsResponse | { error: string }>,
) => {
  try {
    const { songIds } = req.query;
    const songs = await SongModel.find({ _id: { $in: songIds } });
    const songData = songs.map((song) => song as SongData);
    res.json(songData);
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

export const createSong = async (
  req: Request<never, never, CreateSongPayload>,
  res: Response<CreateSongResponse>,
) => {
  try {
    const { id } = await SongModel.create(req.body);
    return res.status(201).json({ id });
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

export const updateSong = async (
  req: Request<{ id: string }, never, UpdateSongPayload>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const newList = await SongModel.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      { new: true },
    );
    if (!newList) {
      return res.status(404).json({ error: "id is not valid" });
    }
    return res.status(200).send("OK");
  } catch (error) {
    genericErrorHandler(error, res);
  }
};
