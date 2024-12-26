import { Link } from "react-router-dom";

import type { AlbumData } from "@lib/shared_types";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

import useAlbums from "@/hooks/useAlbums";
import { deleteAlbum } from "@/utils/client";

export type AlbumProps = Omit<AlbumData, "songs"> & {
  numSongs: number;
  isDeleting: boolean;
};

export default function Album({ id, name, numSongs, isDeleting }: AlbumProps) {
  const { fetchAlbums } = useAlbums();
  const handleDelete = async () => {
    try {
      await deleteAlbum(id);
      fetchAlbums();
    } catch (error) {
      alert("Error: Failed to delete list");
    }
  };
  return (
    <div key={id} className="relative w-1/2 p-4 md:w-1/3 lg:w-1/4 xl:w-1/5">
      <IconButton
        sx={{
          backgroundColor: "#b71c1c",
          position: "absolute",
          top: 16,
          right: 16,
          "&:hover": { backgroundColor: "#d32f2f" },
          display: isDeleting ? "block" : "none",
        }}
        size="small"
        onClick={handleDelete}
      >
        <CloseIcon />
      </IconButton>
      <Link to={`album/${id}`}>
        <img src="/700.jpg" className="h-auto w-full" />
      </Link>
      <div
        className="p-4"
        style={{
          whiteSpace: "unset",
          wordBreak: "break-all",
        }}
      >
        <h3 className="text-lg font-semibold text-neutral-100">{name}</h3>
        <p className="text-green-600"> {numSongs} songs</p>
      </div>
    </div>
  );
}
