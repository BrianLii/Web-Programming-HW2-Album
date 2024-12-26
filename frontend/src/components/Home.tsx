import React, { useEffect, useState } from "react";

import { Button, TextField, Typography } from "@mui/material";

import Album from "@/components/Album";
import NewAlbumDialog from "@/components/NewAlbumDialog";
import useAlbums from "@/hooks/useAlbums";

export default function Home() {
  const { albums, fetchAlbums } = useAlbums();
  const [newAlbumDialogOpen, setNewAlbumDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };
  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  return (
    <div className="px-[5%] py-5">
      <div className="flex items-center justify-between">
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          My Playlists
        </Typography>
        <div className="space-x-4">
          <TextField
            label="Search playlists"
            variant="outlined"
            value={searchKeyword}
            onChange={handleInputChange}
          />
          <Button
            className="w-24 px-4 py-2"
            variant="contained"
            onClick={() => setNewAlbumDialogOpen(true)}
          >
            Add
          </Button>
          <Button
            className="w-24 px-4 py-2"
            variant="contained"
            color="secondary"
            onClick={() => setIsDeleting(!isDeleting)}
          >
            {isDeleting ? "Done" : "Delete"}
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap">
        {albums.map((album) => {
          if (searchKeyword === "" || album.name.includes(searchKeyword))
            return <Album {...album} key={album.id} isDeleting={isDeleting} />;
          else return <></>;
        })}
      </div>
      <NewAlbumDialog
        open={newAlbumDialogOpen}
        onClose={() => setNewAlbumDialogOpen(false)}
      />
    </div>
  );
}
