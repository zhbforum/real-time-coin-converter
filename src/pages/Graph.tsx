import Header from "@/components/Header";
import GraphCalculator from "@/components/calculators/GraphCalculator";

const Graph = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <GraphCalculator />
      </main>
    </div>
  );
};

export default Graph;