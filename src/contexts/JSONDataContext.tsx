import type { DataTable, LineChart, RadarData } from "@/types/global";
import React, { createContext, useContext, useEffect, useState } from "react";

interface DataContextType {
  lineData: LineChart[];
  radarData: RadarData[];
  tableData: DataTable[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lineData, setLineData] = useState<LineChart[]>([]);
  const [radarData, setRadarData] = useState<RadarData[]>([]);
  const [tableData, setTableData] = useState<DataTable[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lineResponse = await fetch("/line.json");
        const radarResponse = await fetch("/radarData.json");
        const tableResponse = await fetch("/promptTable.json");

        const lineJson = await lineResponse.json();
        const radarJson = await radarResponse.json();
        const tableJson = await tableResponse.json();

        setLineData(lineJson);
        setRadarData(radarJson);
        setTableData(tableJson);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ lineData, radarData, tableData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
