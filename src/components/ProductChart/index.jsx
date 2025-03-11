import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProductChart = () => {
  const data = {
    labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
    datasets: [
      {
        label: "Number of Products",
        data: [5, 10, 20, 35, 50], // Example data
        backgroundColor: "#1976d2",
      },
    ],
  };

  return <Bar data={data} />;
};

export default ProductChart;
