import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CurrencyConverter from './finance/CurrencyConverter';
import CompoundInterest from './finance/CompoundInterest';
import LoanCalculator from './finance/LoanCalculator';

const FinanceCalculator = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Финансовый калькулятор</h1>
      <Tabs defaultValue="currency" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="currency">Конвертер валют</TabsTrigger>
          <TabsTrigger value="compound">Сложные проценты</TabsTrigger>
          <TabsTrigger value="loan">Кредитный калькулятор</TabsTrigger>
        </TabsList>
        <TabsContent value="currency">
          <CurrencyConverter />
        </TabsContent>
        <TabsContent value="compound">
          <CompoundInterest />
        </TabsContent>
        <TabsContent value="loan">
          <LoanCalculator />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinanceCalculator;