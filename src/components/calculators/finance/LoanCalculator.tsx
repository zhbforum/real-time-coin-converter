import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PaymentSchedule {
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

const LoanCalculator = () => {
  const [amount, setAmount] = useState<string>('1000000');
  const [rate, setRate] = useState<string>('10');
  const [term, setTerm] = useState<string>('12');
  const [schedule, setSchedule] = useState<PaymentSchedule[]>([]);
  const [totalPayment, setTotalPayment] = useState<number>(0);

  const calculateAnnuityPayment = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(term);
    
    const monthlyPayment = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    let balance = p;
    const newSchedule: PaymentSchedule[] = [];
    let total = 0;

    for (let i = 0; i < n; i++) {
      const interest = balance * r;
      const principal = monthlyPayment - interest;
      balance -= principal;
      
      newSchedule.push({
        payment: monthlyPayment,
        principal: principal,
        interest: interest,
        remainingBalance: Math.max(0, balance)
      });
      
      total += monthlyPayment;
    }

    setSchedule(newSchedule);
    setTotalPayment(total);
  };

  const calculateDifferentiatedPayment = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(term);
    
    const principalPayment = p / n;
    let balance = p;
    const newSchedule: PaymentSchedule[] = [];
    let total = 0;

    for (let i = 0; i < n; i++) {
      const interest = balance * r;
      const payment = principalPayment + interest;
      balance -= principalPayment;
      
      newSchedule.push({
        payment: payment,
        principal: principalPayment,
        interest: interest,
        remainingBalance: Math.max(0, balance)
      });
      
      total += payment;
    }

    setSchedule(newSchedule);
    setTotalPayment(total);
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Сумма кредита</label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Годовая процентная ставка (%)</label>
          <Input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            min="0"
            step="0.1"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Срок (месяцев)</label>
          <Input
            type="number"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            min="1"
          />
        </div>

        <Tabs defaultValue="annuity" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="annuity">Аннуитетный</TabsTrigger>
            <TabsTrigger value="differential">Дифференцированный</TabsTrigger>
          </TabsList>
          <TabsContent value="annuity">
            <Button onClick={calculateAnnuityPayment} className="w-full">
              Рассчитать аннуитетный платеж
            </Button>
          </TabsContent>
          <TabsContent value="differential">
            <Button onClick={calculateDifferentiatedPayment} className="w-full">
              Рассчитать дифференцированный платеж
            </Button>
          </TabsContent>
        </Tabs>

        {schedule.length > 0 && (
          <div className="pt-4 border-t">
            <p className="text-lg font-semibold mb-4">
              Общая сумма выплат: {totalPayment.toFixed(2)}
              <br />
              Переплата: {(totalPayment - parseFloat(amount)).toFixed(2)}
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">№</th>
                    <th className="text-left p-2">Платёж</th>
                    <th className="text-left p-2">Основной долг</th>
                    <th className="text-left p-2">Проценты</th>
                    <th className="text-left p-2">Остаток</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((payment, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{payment.payment.toFixed(2)}</td>
                      <td className="p-2">{payment.principal.toFixed(2)}</td>
                      <td className="p-2">{payment.interest.toFixed(2)}</td>
                      <td className="p-2">{payment.remainingBalance.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default LoanCalculator;