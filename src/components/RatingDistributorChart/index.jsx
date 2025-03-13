import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const RatingDistributionChart = ({ products }) => {
  const ratingCounts = products.reduce((acc, product) => {
    const rating = Math.round(product.rating);
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(ratingCounts).map((rating) => `⭐ ${rating} Stars`),
    datasets: [
      {
        label: "Product Ratings",
        data: Object.values(ratingCounts),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        hoverOffset: 4,
      },
    ],
  };

  return <Pie style={{maxWidth:"360px", maxHeight:"360px", margin:"0 auto"} } data={data} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />;
};

export default RatingDistributionChart;
