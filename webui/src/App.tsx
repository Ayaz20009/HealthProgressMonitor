import { Route, Routes, useNavigate } from "react-router-dom";
import { NotFound } from "./components/NotFound";
import Loading from "./routes/Loading";
import { HomeComponent } from "./routes/home/Home";

export const App = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<HomeComponent />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
