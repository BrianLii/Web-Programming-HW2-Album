import NewSongDialog from "@/components/NewSongDialog";
import { getAlbum, updateAlbum } from '@/utils/client';
import type { AlbumData, SongData } from '@lib/shared_types';
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Checkbox,
    Container,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import EditAlbumDialog from "./EditAlbumDialog";
import EditSongDialog from "./EditSongDialog";
import CopySongDialog from './CopySongDialog'
import Loading from "./Loading";

export type AlbumEditProp = Omit<AlbumData, "songs">

export default function AlbumEdit() {
    const { id } = useParams();
    const [newSongDialogOpen, setNewSongDialogOpen] = useState(false);
    const [editAlbumDialogOpen, setEditAlbumDialogOpen] = useState(false);
    const [editSongDialogOpen, setEditSongDialogOpen] = useState(false);
    const [copySongDialogOpen, setCopySongDialogOpen] = useState(false);
    const [editSong, setEditSong] = useState({
        id: "", singer: "", link: "", name: ""
    } as SongData);
    const [album, setAlbum] = useState({
        id: "",
        name: "",
        desc: "",
        songs: [],
    } as AlbumData);
    const [selectedSongs, setSelectedSongs] = useState(new Set<string>());
    const [selectAll, setSelectAll] = useState(false);

    const fetchAlbum = useCallback(() => {
        getAlbum(id as string)
            .then((res) => setAlbum(res.data))
            .catch((error) => console.error('Error fetching album:', error));
    }, [id]);

    useEffect(() => {
        let isSelectAll = album.songs.length > 0;
        album.songs.forEach((song) => {
            if (!selectedSongs.has(song.id)) {
                isSelectAll = false;
            }
        })
        setSelectAll(isSelectAll);
    }, [album.songs, selectedSongs]);

    // fetch album on first render
    useEffect(() => {
        fetchAlbum();
    }, [fetchAlbum]);

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedSongs(new Set<string>());
        }
        else {
            setSelectedSongs(new Set<string>(
                album.songs.map((song) => song.id)
            ));
        }
    };
    const handleSongSelect = (id: string) => {
        const newSelectedSongs = new Set<string>(selectedSongs);
        if (selectedSongs.has(id)) {
            newSelectedSongs.delete(id);
        }
        else {
            newSelectedSongs.add(id);
        }
        setSelectedSongs(newSelectedSongs);
    };
    const handleSongDelete = async () => {
        const updatedSongs = [] as string[];
        let confirmMsg = "Delete these songs?\n"
        album.songs.forEach((song) => {
            if (!selectedSongs.has(song.id)) {
                updatedSongs.push(song.id);
            }
            else {
                confirmMsg += `${song.name} (${song.singer})\n`;
            }
        })
        if (updatedSongs.length == album.songs.length) {
            alert("請勾選歌曲");
        }
        else {
            if (confirm(confirmMsg)) {
                updateAlbum(album.id, { songs: updatedSongs })
                    .catch(() => alert('fail'))
                    .finally(() => fetchAlbum());
            }
        }
    }

    if (!album.id) {
        return (<Loading />);
    }

    return (
        <Container sx={{ width: '90%' }} maxWidth={false}>
            <NewSongDialog
                album={album}
                fetchAlbum={fetchAlbum}
                open={newSongDialogOpen}
                onClose={() => setNewSongDialogOpen(false)}
            />
            <EditAlbumDialog
                album={album}
                fetchAlbum={fetchAlbum}
                open={editAlbumDialogOpen}
                onClose={() => setEditAlbumDialogOpen(false)}
            />
            <EditSongDialog
                song={editSong}
                fetchAlbum={fetchAlbum}
                open={editSongDialogOpen}
                onClose={() => setEditSongDialogOpen(false)}
            />
            <CopySongDialog
                song={editSong}
                fetchAlbum={fetchAlbum}
                open={copySongDialogOpen}
                onClose={() => setCopySongDialogOpen(false)}
            />
            <Card style={{
                whiteSpace: "unset",
                wordBreak: "break-all"
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <CardMedia
                            component="img"
                            alt="Image Description"
                            height="200"
                            image='/700.jpg'
                        />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <CardContent>
                            <Typography variant="h4" gutterBottom>
                                {album.name}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {album.desc}
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>

            <div style={{ display: 'flex', justifyContent: 'right', marginTop: '20px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: 'auto' }}
                    onClick={() => { setEditAlbumDialogOpen(true) }}
                >Edit playlist info
                </Button>
                <Link to="/"><Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: '10px' }}
                >Go back
                </Button></Link>
                <Button
                    className="px-4 py-2 w-24"
                    variant="contained"
                    color="primary"
                    style={{ marginRight: '10px' }}
                    onClick={() => setNewSongDialogOpen(true)}
                >Add
                </Button>
                <Button
                    className="px-4 py-2 w-24"
                    variant="contained"
                    color="secondary"
                    onClick={async () => await handleSongDelete()}
                >Delete
                </Button>
            </div>
            <TableContainer>
                <Table style={{
                    whiteSpace: "unset",
                    wordBreak: "break-all"
                }}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: '1%' }}>
                                <Checkbox
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                    color="primary"
                                />
                            </TableCell>
                            <TableCell style={{ width: '20%' }}>
                                Song Name
                            </TableCell>
                            <TableCell style={{ width: '20%' }}>Singer</TableCell>
                            <TableCell style={{ width: '20%' }}>Link</TableCell>
                            <TableCell style={{ width: '15%' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {album.songs.map((song) => (
                            <TableRow key={song.id}>
                                <TableCell >
                                    <Checkbox
                                        checked={selectedSongs.has(song.id)}
                                        onChange={() => handleSongSelect(song.id)}
                                        color="primary"
                                    />
                                </TableCell>
                                <TableCell>
                                    <span>{song.name}</span>
                                </TableCell>
                                <TableCell>{song.singer}</TableCell>
                                <TableCell onClick={() => {
                                    try { new URL(song.link); window.open(`${song.link}`); }
                                    catch { window.open(`//${song.link}`) }
                                }}>{song.link}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        onClick={() => {
                                            setCopySongDialogOpen(true);
                                            setEditSong(song);
                                        }}
                                        style={{ marginRight: '10px' }}
                                    >Copy
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        onClick={() => {
                                            setEditSongDialogOpen(true);
                                            setEditSong(song);
                                        }}
                                    >Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}