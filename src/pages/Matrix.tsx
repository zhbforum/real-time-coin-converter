import MatrixCalculator from "@/components/calculators/MatrixCalculator";
import Header from "@/components/Header";

const Matrix = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <main className="container mx-auto p-4">
        <MatrixCalculator />
      </main>
    </div>
  );
};

export default Matrix;