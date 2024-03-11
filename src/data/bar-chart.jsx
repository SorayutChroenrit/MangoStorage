import { BarChart } from "@mui/x-charts/BarChart";

const uData = [10, 20, 30, 40, 50, 60, 70];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];

export default function SimpleBarChart() {
  return (
    <BarChart
      width={800}
      height={400}
      series={[
        { data: uData, label: "Completed", id: "uvId", color: "#73C088" },
      ]}
      xAxis={[{ data: xLabels, scaleType: "band" }]}
    />
  );
}
