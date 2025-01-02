import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import CompoundInterest from "@/components/calculators/finance/CompoundInterest";
import CurrencyConverter from "@/components/calculators/finance/CurrencyConverter";
import LoanCalculator from "@/components/calculators/finance/LoanCalculator";
import Header from "@/components/Header";

const Finance = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto p-4 space-y-4">
        <Tabs defaultValue="currency" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="currency">Конвертер валют</TabsTrigger>
            <TabsTrigger value="compound">Сложные проценты</TabsTrigger>
            <TabsTrigger value="loan">Кредитный калькулятор</TabsTrigger>
          </TabsList>
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
    </div>
  );
};

export default Finance;