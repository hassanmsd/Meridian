import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useData } from "../../contexts/JSONDataContext";

const LineChart: React.FC = () => {
  const { lineData } = useData();

  return (
    <Card className="p-4 bg-white dark:bg-gray-800">
      <CardHeader className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
        <CardTitle>Line Chart</CardTitle>
        <CardDescription>User Growth Over Time</CardDescription>
      </CardHeader>
      <ResponsiveContainer width={"100%"} height={500}>
        <RechartsLineChart
          data={lineData}
          accessibilityLayer
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <ChartTooltip
            content={
              <ChartTooltipContent
                className="w-[150px]"
                nameKey="views"
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });
                }}
              />
            }
          />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default LineChart;
