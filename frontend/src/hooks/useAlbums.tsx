import { createContext, useCallback, useContext, useState } from "react";

import type { GetAlbumsResponse } from "@lib/shared_types";

import { getAlbums } from "@/utils/client";

// context is a way to share data between components without having to pass props down the component tree
type AlbumContextType = {
  albums: GetAlbumsResponse;
  fetchAlbums: () => Promise<void>;
};

const AlbumContext = createContext<AlbumContextType>({
  albums: [],
  fetchAlbums: async () => {},
});

type AlbumProviderProps = {
  children: React.ReactNode;
};

export function AlbumProvider({ children }: AlbumProviderProps) {
  const [albums, setAlbums] = useState<GetAlbumsResponse>([]);
  const fetchAlbums = useCallback(async () => {
    getAlbums()
      .then((res) => setAlbums(res.data))
      .catch((error) => console.error("Error fetching albums:", error));
  }, []);
  return (
    <AlbumContext.Provider
      value={{
        albums,
        fetchAlbums,
      }}
    >
      {children}
    </AlbumContext.Provider>
  );
}
export default function useAlbums() {
  return useContext(AlbumContext);
}
