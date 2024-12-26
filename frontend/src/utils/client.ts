import type {
  CreateAlbumPayload,
  CreateAlbumResponse, CreateSongPayload,
  CreateSongResponse,
  DeleteAlbumResponse, GetAlbumResponse,
  GetAlbumsResponse, UpdateAlbumPayload,
  UpdateAlbumResponse, UpdateSongPayload,
  getSongByIdsParam,
  getSongByIdsResponse
} from "@lib/shared_types";
import axios from "axios";

import { env } from "./env";

const client = axios.create({
  baseURL: env.VITE_API_URL,
});

export function createAlbum(input: CreateAlbumPayload) {
  return client.post<CreateAlbumResponse>("/albums", input);
}

export function getAlbums() {
  return client.get<GetAlbumsResponse>("/albums");
}

export function getAlbum(id : string) {
  return client.get<GetAlbumResponse>(`/albums/${id}`);
}

export function updateAlbum(id : string, input : UpdateAlbumPayload) {
  return client.put<UpdateAlbumResponse>(`/albums/${id}`, input);
}

export function deleteAlbum(id: string) {
  return client.delete<DeleteAlbumResponse>(`/albums/${id}`);
}

export function createSong(input: CreateSongPayload) {
  return client.post<CreateSongResponse>("/songs", input); 
}

export function getSongByIds(input : getSongByIdsParam) {
  return client.get<getSongByIdsResponse>(`/songs`, {params : { ...input }});
}

export function updateSong(id : string, input : UpdateSongPayload) {
  return client.put<UpdateAlbumResponse>(`/songs/${id}`, input);
}