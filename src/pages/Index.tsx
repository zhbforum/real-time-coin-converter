import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArrowLeftRight } from "lucide-react";

const Index = () => {
  const [amount, setAmount] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [result, setResult] = useState<number>(0);

  const { data: rates, isLoading } = useQuery({
    queryKey: ["exchangeRates"],
    queryFn: async () => {
      const response = await axios.get(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      return response.data.rates;
    },
    refetchInterval: 60000, // Обновляем курсы каждую минуту
  });

  useEffect(() => {
    if (rates && amount) {
      const baseAmount = parseFloat(amount);
      if (!isNaN(baseAmount)) {
        const baseRate = rates[fromCurrency];
        const targetRate = rates[toCurrency];
        const converted = (baseAmount / baseRate) * targetRate;
        setResult(Number(converted.toFixed(2)));
      }
    }
  }, [rates, amount, fromCurrency, toCurrency]);

  const currencies = rates ? Object.keys(rates) : [];

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center mb-6">Конвертер валют</h1>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Сумма</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Введите сумму"
              min="0"
            />
          </div>

          <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-center">
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger>
                <SelectValue placeholder="От" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency} value={currency}>
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <button
              onClick={handleSwapCurrencies}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </button>

            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger>
                <SelectValue placeholder="В" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency} value={currency}>
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg">
            <div className="text-sm text-gray-600">Результат:</div>
            <div className="text-2xl font-bold">
              {isLoading ? (
                "Загрузка..."
              ) : (
                `${amount} ${fromCurrency} = ${result} ${toCurrency}`
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Index;