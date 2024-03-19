import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const SimplePieChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetch("http://localhost:3001/Product")
      .then((response) => response.json())
      .then((data) => {
        // Process the fetched data
        const colors = [
          "#FF6384", // Red
          "#36A2EB", // Blue
          "#FFCE56", // Yellow
          "#4BC0C0", // Teal
          "#9966FF", // Purple
          "#FF9F40", // Orange
          "#32CD32", // Lime Green
          "#FFD700", // Gold
          "#808080", // Gray
          "#00FFFF", // Cyan
          // Add more colors as needed
        ];
        const processedData = data.map((item, index) => ({
          id: item.P_ID,
          value: item.Quantity,
          label: item.P_Name,
          color: colors[index % colors.length], // Assign color based on position
        }));
        // Set the processed data to state
        setChartData(processedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // Empty dependency array to run the effect only once

  return (
    <PieChart
      series={[
        {
          data: chartData,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      height={300}
      labelAccessor={(d) => `${d.label}: ${d.value}`}
    />
  );
};

export default SimplePieChart;
