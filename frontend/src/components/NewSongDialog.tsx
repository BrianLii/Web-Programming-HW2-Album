import { useRef } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import { createSong, updateAlbum } from "@/utils/client";
import type { AlbumData } from "@lib/shared_types";

type NewSongDialogProps = {
  album: AlbumData;
  fetchAlbum: () => void;
  open: boolean;
  onClose: () => void;
};

export default function NewSongDialog({ album, fetchAlbum, open, onClose }: NewSongDialogProps) {
  const songNameRef = useRef<HTMLInputElement>(null);
  const songSingerRef = useRef<HTMLInputElement>(null);
  const songLinkRef = useRef<HTMLInputElement>(null);
  const handleAddSong = async () => {
    const inputName = songNameRef.current?.value ?? "";
    if (inputName.trim() === "") {
      alert("Name cannot be empty!");
      return;
    }
    const inputSinger = songSingerRef.current?.value ?? "";
    if (inputSinger.trim() === "") {
      alert("Singer cannot be empty!");
      return;
    }
    const inputLink = songLinkRef.current?.value ?? "";
    if (inputLink.trim() === "") {
      alert("Link cannot be empty!");
      return;
    }
    createSong({
      name: songNameRef.current?.value ?? "",
      singer: songSingerRef.current?.value ?? "",
      link: songLinkRef.current?.value ?? ""
    })
      .then((createSongResponse) => updateAlbum(album.id, {
        songs: album.songs.map((song) => song.id).concat([createSongResponse.data.id])
      }))
      .then(() => fetchAlbum())
      .catch((error) => {
        alert(`error add new song: ${error}`);
      })
      .finally(() => onClose());
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a song</DialogTitle>
      <DialogContent>
        <TextField
          inputRef={songNameRef}
          label="Name"
          variant="outlined"
          sx={{ mt: 2 }}
          autoFocus
        />
        <TextField
          inputRef={songSingerRef}
          label="Singer"
          variant="outlined"
          sx={{ mt: 2 }}
          autoFocus
        />
        <TextField
          inputRef={songLinkRef}
          label="Link"
          variant="outlined"
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddSong}>add</Button>
        <Button onClick={onClose}>cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
