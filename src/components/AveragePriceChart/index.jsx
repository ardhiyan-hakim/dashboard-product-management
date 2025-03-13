import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AveragePriceChart = ({ products }) => {
  const categoryPrices = products.reduce((acc, product) => {
    acc[product.category] = acc[product.category] || { total: 0, count: 0 };
    acc[product.category].total += product.price;
    acc[product.category].count += 1;
    return acc;
  }, {});

  const avgPrices = Object.keys(categoryPrices).map(
    (category) => categoryPrices[category].total / categoryPrices[category].count
  );

  const data = {
    labels: Object.keys(categoryPrices),
    datasets: [
      {
        label: "Average Price",
        data: avgPrices,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />;
};

export default AveragePriceChart;
