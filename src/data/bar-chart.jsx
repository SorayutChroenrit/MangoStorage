import { BarChart } from "@mui/x-charts/BarChart";

const uData = [10, 20, 30, 40, 50, 60, 70];
const xLabels = [
  "Jan 28",
  "Feb 4",
  "Feb 11",
  "Feb 18",
  "Feb 25",
  "Mar 3",
  "Mar 10",
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
