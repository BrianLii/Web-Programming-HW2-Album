// The beauty of using TypeScript on both ends of the application is that we can
// share types between the client and the server very easily. This is a great way
// to keep the client and server in sync and avoid bugs. JavaScript makes you move
// fast, but TypeScript makes you move fast and not break things.


// A "type" can be defined with the `type` keyword or the `interface` keyword.
// They may seem similar, but there are some differences. For more information,
// see: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces
// A general rule of thumb is to always use `type` unless you have a good reason
// to use `interface`. `interface` is more powerful, at the cost of baring more
// footguns.
export type AlbumData = {
  id: string;
  name: string;
  desc: string;
  songs: SongData[];
};

export type SongData = {
  id: string;
  name: string;
  singer: string;
  link: string;
};

export type GetAlbumsResponse = (Omit<AlbumData, "songs"> & { numSongs: number })[];

export type GetAlbumResponse = AlbumData;

export type CreateAlbumPayload = Omit<AlbumData, "id" | "songs">;

export type CreateAlbumResponse = Pick<AlbumData, "id">;

export type UpdateAlbumPayload = Partial<Omit<AlbumData, "id" | "songs"> & { songs: string[] }>;
export type UpdateAlbumResponse = "OK";

export type DeleteAlbumResponse = "OK";

export type getSongByIdsParam = { songIds: string[] };
export type getSongByIdsResponse = SongData[];

export type CreateSongPayload = Omit<SongData, "id">;
export type CreateSongResponse = Pick<SongData, "id">;

export type UpdateSongPayload = Partial<Omit<SongData, "id">>
export type UpdateSongResponse = "OK";