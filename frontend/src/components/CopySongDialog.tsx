import { useEffect, useRef } from "react";

import type { SongData } from "@lib/shared_types";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import useAlbums from "@/hooks/useAlbums";
import { getAlbum, updateAlbum } from "@/utils/client";

type EditSongDialogProps = {
  song: SongData;
  fetchAlbum: () => void;
  open: boolean;
  onClose: () => void;
};

export default function CopySongDialog({
  song,
  fetchAlbum,
  open,
  onClose,
}: EditSongDialogProps) {
  const { fetchAlbums, albums } = useAlbums();
  const selectedAlbum = useRef<HTMLInputElement>(null);
  const handleAddSong = async () => {
    const albumId = selectedAlbum.current?.value ?? "";
    getAlbum(albumId)
      .then((album) => album.data.songs.map((song) => song.id))
      .then((albumSongs) => {
        if (!albumSongs.includes(song.id)) {
          updateAlbum(albumId, { songs: albumSongs.concat(song.id) });
        }
      })
      .then(() => fetchAlbum())
      .catch((error) => {
        alert(`error adding song to playlist: ${error}`);
      })
      .finally(() => onClose());
  };

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add this song to:</DialogTitle>
      <DialogContent>
        <FormControl sx={{ mt: 2, width: 2 / 3 }}>
          <InputLabel id="album-select-input">Playlist</InputLabel>
          <Select
            inputRef={selectedAlbum}
            labelId="album-select-input"
            id="album-select-input-helper"
            label="Playlist"
            defaultValue={albums.length ? albums[0].id : ""}
          >
            {albums.map((album) => (
              <MenuItem key={album.id} value={album.id}>
                {album.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddSong}>Update</Button>
        <Button onClick={onClose}>cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
