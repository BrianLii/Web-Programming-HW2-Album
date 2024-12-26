import { useRef } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import { updateSong } from "@/utils/client";
import type { SongData } from "@lib/shared_types";

type EditSongDialogProps = {
  song: SongData
  fetchAlbum: () => void;
  open: boolean;
  onClose: () => void;
};

export default function EditSongDialog({ song, fetchAlbum, open, onClose }: EditSongDialogProps) {
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
    updateSong(song.id, {
      name: songNameRef.current?.value ?? "",
      singer: songSingerRef.current?.value ?? "",
      link: songLinkRef.current?.value ?? ""
    })
      .then(() => fetchAlbum())
      .catch((error) => {
        alert(`error add new song: ${error}`);
      })
      .finally(() => onClose());
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit the song</DialogTitle>
      <DialogContent>
        <TextField
          inputRef={songNameRef}
          label="Name"
          variant="outlined"
          sx={{ mt: 2 }}
          defaultValue={song.name}
          autoFocus
        />
        <TextField
          inputRef={songSingerRef}
          label="Singer"
          variant="outlined"
          sx={{ mt: 2 }}
          defaultValue={song.singer}
          autoFocus
        />
        <TextField
          inputRef={songLinkRef}
          label="Link"
          variant="outlined"
          defaultValue={song.link}
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddSong}>Update</Button>
        <Button onClick={onClose}>cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
