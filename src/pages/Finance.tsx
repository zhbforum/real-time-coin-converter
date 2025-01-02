import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import CompoundInterest from "@/components/calculators/finance/CompoundInterest";
import CurrencyConverter from "@/components/calculators/finance/CurrencyConverter";
import LoanCalculator from "@/components/calculators/finance/LoanCalculator";
import MatrixCalculator from "@/components/calculators/MatrixCalculator";

const Finance = () => {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <Tabs defaultValue="matrix" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="matrix">Матричный калькулятор</TabsTrigger>
          <TabsTrigger value="currency">Конвертер валют</TabsTrigger>
          <TabsTrigger value="compound">Сложные проценты</TabsTrigger>
          <TabsTrigger value="loan">Кредитный калькулятор</TabsTrigger>
        </TabsList>
        <TabsContent value="matrix">
          <MatrixCalculator />
        </TabsContent>
        <TabsContent value="currency">
          <Card className="p-4">
            <CurrencyConverter />
          </Card>
        </TabsContent>
        <TabsContent value="compound">
          <Card className="p-4">
            <CompoundInterest />
          </Card>
        </TabsContent>
        <TabsContent value="loan">
          <Card className="p-4">
            <LoanCalculator />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Finance;