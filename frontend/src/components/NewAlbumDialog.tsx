import { useRef } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import useAlbums from "@/hooks/useAlbums";
import { createAlbum } from "@/utils/client";

type NewAlbumDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function NewAlbumDialog({ open, onClose }: NewAlbumDialogProps) {
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

    createAlbum({
      name: albumNameRef.current?.value ?? "",
      desc: albumDescRef.current?.value ?? "",
    })
      .then(() => fetchAlbums())
      .catch((error) => alert(error))
      .finally(() => onClose());
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a playlist</DialogTitle>
      <DialogContent>
        <TextField
          inputRef={albumNameRef}
          label="Name"
          variant="outlined"
          sx={{ mt: 2 }}
          autoFocus
        />
        <TextField
          inputRef={albumDescRef}
          label="Description"
          variant="outlined"
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddAlbum}>add</Button>
        <Button onClick={onClose}>cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
