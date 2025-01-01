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
    refetchInterval: 60000,
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <Card className="w-full max-w-md p-8 space-y-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Конвертер валют
          </h1>
          <p className="text-sm text-gray-500">
            Актуальные курсы валют в реальном времени
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Сумма</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Введите сумму"
              min="0"
              className="h-12 text-lg font-medium"
            />
          </div>

          <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="h-12">
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
              className="p-3 hover:bg-blue-50 rounded-full transition-colors duration-200"
            >
              <ArrowLeftRight className="h-5 w-5 text-blue-600" />
            </button>

            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className="h-12">
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

          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="text-sm text-gray-600 mb-1">Результат:</div>
            <div className="text-3xl font-bold text-gray-900">
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                </div>
              ) : (
                <div className="flex items-baseline space-x-2">
                  <span>{amount} {fromCurrency}</span>
                  <span className="text-gray-400 text-xl">=</span>
                  <span className="text-blue-600">{result} {toCurrency}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500">
          Курсы валют обновляются каждую минуту
        </div>
      </Card>
    </div>
  );
};

export default Index;