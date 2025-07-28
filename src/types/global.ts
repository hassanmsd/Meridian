interface LineChart {
  user: number;
  date: string;
}

interface RadarData {
  dimension: string;
  value: number;
}

interface DataTable {
  prompt: string;
  response: string;
  location: string;
  date: string;
}

type DataRow = {
  prompt: string;
  response: string;
  location: string;
  date: string;
};

export type { LineChart, RadarData, DataTable, DataRow };
