import { BrowserRouter, Route, Routes } from "react-router-dom";

import DataTablePage from "./pages/DataTable";
import LineChartPage from "./pages/LineChart";
import RadarChartPage from "./pages/RadarChart";
import HomePage from "./pages/Home";

import Navbar from "./components/navbar";

import { DataProvider } from "./contexts/JSONDataContext";
import { ThemeProvider } from "./contexts/ThemeContext";

import { THEME_LOCAL_STORAGE_KEY } from "./constants/global";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey={THEME_LOCAL_STORAGE_KEY}>
        <DataProvider>
          <div className="h-screen flex flex-col">
            <Navbar />
            <div className="px-4 py-8 h-full flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/datatable" element={<DataTablePage />} />
                <Route path="/linechart" element={<LineChartPage />} />
                <Route path="/radarchart" element={<RadarChartPage />} />
              </Routes>
            </div>
          </div>
        </DataProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
