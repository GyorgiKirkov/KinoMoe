import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";


ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface DonutChartProps {
  value: number;
  maxValue: number;
  label: string;
}

const DonutChart: React.FC<DonutChartProps> = ({ value, maxValue, label }) => {
  const data = {
    datasets: [
      {
        data: [Math.min(value, maxValue), maxValue - Math.min(value, maxValue)],
        backgroundColor: ["#519c3c", "#1c1c1c"],
        hoverBackgroundColor: ["#4fd529", "#333"],
        borderWidth: 0,
      },
    ],
    labels: [label, "Remaining"],
  };

  const options = {
    cutout: "70%",
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
  };

  const percentage = Math.min((value / maxValue) * 100, 100);

  return (
    <div style={{ width: "150px", margin: "0 auto" }}>
      <Doughnut data={data} options={options} />
      <div style={{ textAlign: "center", color: "white", marginTop: "0px" }}>
        {Math.round(percentage)}%
      </div>
      <p style={{ textAlign: "center", color: "white", marginTop: "5px" }}>
        {label}
      </p>
    </div>
  );
};

export default DonutChart;
