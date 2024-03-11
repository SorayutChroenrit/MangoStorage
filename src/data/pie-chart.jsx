import  { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Import the entire Chart.js library

const PieChart = () => {
  const chartContainer = useRef(null); // Reference to the chart canvas element
  const myPieChart = useRef(null); // Ref to hold the chart instance

  useEffect(() => {
    if (chartContainer.current) {
      const ctx = chartContainer.current.getContext('2d');
      myPieChart.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ["iPhone", "MacBook", "AirPods", "Apple Watch", "Mac studio"],
          datasets: [{
            data: [54.73, 13.52, 11.05 , 10.54, 10.14],
            backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745','#e6547f'],
          }],
        },
        options: {
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            title: {
              display: true,
              text: 'Sales Distribution',
            },
          },
          
        },
      });
    }

    // Cleanup function
    return () => {
      // Destroy the chart instance when the component unmounts
      if (myPieChart.current) {
        myPieChart.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartContainer} />;
};

export default PieChart;
