import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DataUpload from "./pages/DataUpload";
import DataProcess from "./pages/DataProcess";
import Search from "./pages/Search";
import NoPage from "./pages/NoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="data-upload" element={<DataUpload />} />
        <Route path="data-process" element={<DataProcess />} />
        <Route path="search" element={<Search />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
