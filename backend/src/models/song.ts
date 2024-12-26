import type { SongData } from "@lib/shared_types";
import mongoose from "mongoose";
import type { Types } from "mongoose";

// In `SongData`, we have `list_id` and `id` as a string, but in the database, we want to store them as an ObjectId.
interface SongDocument
  extends Omit<SongData, "id" | "album_id">,
    mongoose.Document {
  album_id: Types.ObjectId;
}

interface SongModel extends mongoose.Model<SongDocument> {}

// We enforce the type by adding `<SongDocument>` after `mongoose.Schema`.
const SongSchema = new mongoose.Schema<SongDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    singer: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

const Song = mongoose.model<SongDocument, SongModel>("Song", SongSchema);
export default Song;
