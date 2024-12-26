import { BrowserRouter, Route, Routes } from "react-router-dom";

import AlbumEdit from "@/components/AlbumEdit";
import HeaderBar from "@/components/HeaderBar";
import Home from "@/components/Home";

function App() {
  return (
    <>
      <HeaderBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="album/:id" element={<AlbumEdit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
