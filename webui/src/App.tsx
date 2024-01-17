import { Route, Routes, useNavigate } from "react-router-dom";
import { NotFound } from "./components/NotFound";
import Loading from "./routes/Loading";
import { HomeComponent } from "./routes/home/Home";
import { Upload } from "./routes/Upload/Upload";

export const App = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<HomeComponent />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
