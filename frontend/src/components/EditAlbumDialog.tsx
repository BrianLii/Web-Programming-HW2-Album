import { useRef } from "react";

import type { AlbumData } from "@lib/shared_types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import useAlbums from "@/hooks/useAlbums";
import { updateAlbum } from "@/utils/client";

type EditAlbumDialogProps = {
  album: AlbumData;
  fetchAlbum: () => void;
  open: boolean;
  onClose: () => void;
};

export default function EditAlbumDialog({
  album,
  fetchAlbum,
  open,
  onClose,
}: EditAlbumDialogProps) {
  // using a ref to get the dom element is one way to get the value of a input
  // another way is to use a state variable and update it on change, which can be found in SongDialog.tsx
  const albumNameRef = useRef<HTMLInputElement>(null);
  const albumDescRef = useRef<HTMLInputElement>(null);

  const { fetchAlbums } = useAlbums();
  const handleAddAlbum = async () => {
    const inputName = albumNameRef.current?.value ?? "";
    if (inputName.trim() === "") {
      alert("Name cannot be empty!");
      return;
    }
    const inputDesc = albumDescRef.current?.value ?? "";
    if (inputDesc.trim() === "") {
      alert("Description cannot be empty!");
      return;
    }

    updateAlbum(album.id, {
      name: albumNameRef.current?.value ?? "",
      desc: albumDescRef.current?.value ?? "",
    })
      .then(() => fetchAlbums())
      .then(() => fetchAlbum())
      .catch((error) => alert(error))
      .finally(() => onClose());
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit playlist</DialogTitle>
      <DialogContent>
        <TextField
          inputRef={albumNameRef}
          label="Name"
          defaultValue={album.name}
          variant="outlined"
          sx={{ mt: 2 }}
          autoFocus
        />
        <TextField
          inputRef={albumDescRef}
          defaultValue={album.desc}
          label="Description"
          variant="outlined"
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddAlbum}>Update</Button>
        <Button onClick={onClose}>cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
