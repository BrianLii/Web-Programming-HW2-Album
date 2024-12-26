import AlbumModel from "../models/album";
import { genericErrorHandler } from "../utils/errors";
import type {
  AlbumData,
  CreateAlbumPayload,
  CreateAlbumResponse,
  GetAlbumsResponse,
  SongData,
  UpdateAlbumPayload,
} from "@lib/shared_types";
import type { Request, Response } from "express";

// Get all albums
export const getAlbums = async (
  _: Request,
  res: Response<GetAlbumsResponse>,
) => {
  try {
    const albums = await AlbumModel.find({});
    const albumsToReturn: GetAlbumsResponse = albums.map((album) => {
      return {
        id: album.id,
        name: album.name,
        desc: album.desc,
        numSongs: album.songs.length,
      };
    });
    return res.status(200).json(albumsToReturn);
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Get a album
export const getAlbum = async (
  req: Request<{ id: string }>,
  res: Response<AlbumData | { error: string }>,
) => {
  try {
    const { id } = req.params;
    const album = await AlbumModel.findById(id).populate("songs");
    if (!album) {
      return res.status(404).json({ error: "invalid id" });
    }
    return res.status(200).json({
      id: album.id,
      name: album.name,
      desc: album.desc,
      songs: album.songs as unknown as SongData[],
    });
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Create a album
export const createAlbum = async (
  req: Request<never, never, CreateAlbumPayload>,
  res: Response<CreateAlbumResponse>,
) => {
  try {
    const { id } = await AlbumModel.create(req.body);
    return res.status(201).json({ id });
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

export const updateAlbum = async (
  req: Request<{ id: string }, never, UpdateAlbumPayload>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const newList = await AlbumModel.findByIdAndUpdate(
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

export const deleteAlbum = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const deletedAlbum = await AlbumModel.findByIdAndDelete(id);
    if (!deletedAlbum) {
      throw new Error("invalid id");
    }
    res.status(200).send("OK");
  } catch (error) {
    console.log(error);
    genericErrorHandler(error, res);
  }
};
