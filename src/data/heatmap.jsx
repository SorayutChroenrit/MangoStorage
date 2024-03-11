import React from "react";
import ReactApexChart from "react-apexcharts";

function ApexChart() {
  const [series, setSeries] = React.useState([
    // Use useState for data
    {
      name: "Metric1",
      data: generateData(18, { min: 0, max: 90 }),
    },
    {
      name: "Metric2",
      data: generateData(18, { min: 0, max: 90 }),
    },
    {
      name: "Metric3",
      data: generateData(18, { min: 0, max: 90 }),
    },
    {
      name: "Metric4",
      data: generateData(18, { min: 0, max: 90 }),
    },
    {
      name: "Metric5",
      data: generateData(18, { min: 0, max: 90 }),
    },
    {
      name: "Metric6",
      data: generateData(18, { min: 0, max: 90 }),
    },
    {
      name: "Metric7",
      data: generateData(18, { min: 0, max: 90 }),
    },
    {
      name: "Metric8",
      data: generateData(18, { min: 0, max: 90 }),
    },
  ]);

  const [options, setOptions] = React.useState({
    // Use useState for options
    chart: {
      height: 350,
      type: "heatmap",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#008FFB"],
  });

  function generateData(count, { min, max }) {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return data;
  }

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="heatmap"
          height={350}
        />
      </div>
    </div>
  );
}

export default ApexChart;
