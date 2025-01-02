import Header from "@/components/Header";
import FinanceCalculator from "@/components/calculators/FinanceCalculator";

const Finance = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <FinanceCalculator />
      </main>
    </div>
  );
};

export default Finance;