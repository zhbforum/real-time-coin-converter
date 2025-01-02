import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Calculator, ChartLine, DollarSign, Grid } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: <Calculator className="h-8 w-8" />,
      title: "Инженерный калькулятор",
      description: "Выполняйте сложные математические вычисления, включая тригонометрические функции",
      link: "/engineering"
    },
    {
      icon: <ChartLine className="h-8 w-8" />,
      title: "Графический калькулятор",
      description: "Стройте графики функций с возможностью масштабирования и настройки",
      link: "/graph"
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: "Финансовый калькулятор",
      description: "Рассчитывайте кредиты, инвестиции и конвертируйте валюты",
      link: "/finance"
    },
    {
      icon: <Grid className="h-8 w-8" />,
      title: "Матричный калькулятор",
      description: "Выполняйте операции с матрицами: сложение, умножение, транспонирование",
      link: "/matrix"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Многофункциональный калькулятор
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Мощный инструмент для математических, финансовых и инженерных расчетов
          </p>
        </section>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {features.map((feature, index) => (
            <Link key={index} to={feature.link}>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="mb-4 text-primary">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            </Link>
          ))}
        </section>

        <section className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Как использовать</h2>
          <div className="text-muted-foreground space-y-4">
            <p>
              1. Выберите нужный тип калькулятора из представленных выше
            </p>
            <p>
              2. Введите данные в соответствующие поля
            </p>
            <p>
              3. Получите мгновенный результат вычислений
            </p>
            <p>
              4. Используйте дополнительные функции для более сложных расчетов
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;