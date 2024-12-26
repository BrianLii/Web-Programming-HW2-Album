import type { AlbumData } from "@lib/shared_types";
import mongoose from "mongoose";
import type { Types } from "mongoose";

// In `AlbumData`, we have `id` as a string and `cards` as an array of `CardData`, but in the database, we want them both to be stored as an ObjectId.
interface AlbumDocument
  extends Omit<AlbumData, "id" | "songs">,
    mongoose.Document {
  songs: Types.ObjectId[];
}

interface AlbumModel extends mongoose.Model<AlbumDocument> {}

// We enforce the type by adding `<AlbumDocument>` after `mongoose.Schema`.
const AlbumSchema = new mongoose.Schema<AlbumDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Album = mongoose.model<AlbumDocument, AlbumModel>("Album", AlbumSchema);
export default Album;
