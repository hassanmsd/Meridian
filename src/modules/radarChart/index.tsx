import React from "react";
import {
  RadarChart as RechartsRadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useData } from "../../contexts/JSONDataContext";

const RadarChart: React.FC = () => {
  const { radarData } = useData();

  return (
    <Card className="p-4 bg-white dark:bg-gray-800 h-full flex flex-col flex-grow">
      <CardHeader className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
        <CardTitle>Radar Chart - Dots</CardTitle>
        <CardDescription>Performance Evaluation</CardDescription>
      </CardHeader>
      <ResponsiveContainer width="100%" height={500}>
        <RechartsRadarChart outerRadius="80%" data={radarData}>
          <PolarAngleAxis dataKey="dimension" />
          <PolarGrid />
          <PolarRadiusAxis />
          <Radar
            name="Score"
            dataKey="value"
            stroke="var(--desktop-1)"
            fill="var(--desktop-1)"
            fillOpacity={0.6}
            dot={{
              r: 4,
              fillOpacity: 1,
            }}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default RadarChart;
