import { useState } from "react";
import { Card } from "@/components/ui/card";
import FunctionsList from "./graph/FunctionsList";
import GraphCanvas from "./graph/GraphCanvas";

interface GraphFunction {
  expression: string;
  color: string;
  lineWidth: number;
}

const GraphCalculator = () => {
  const [functions, setFunctions] = useState<GraphFunction[]>([
    { expression: "x^2", color: "#2563eb", lineWidth: 2 },
  ]);
  const [currentExpression, setCurrentExpression] = useState("");
  const [scale, setScale] = useState(50); // пикселей на единицу

  const colors = [
    { name: "Синий", value: "#2563eb" },
    { name: "Красный", value: "#dc2626" },
    { name: "Зеленый", value: "#16a34a" },
    { name: "Фиолетовый", value: "#9333ea" },
    { name: "Оранжевый", value: "#ea580c" },
  ];

  const lineWidths = [
    { name: "Тонкая", value: 1 },
    { name: "Средняя", value: 2 },
    { name: "Толстая", value: 3 },
    { name: "Очень толстая", value: 4 },
  ];

  const handleAddFunction = () => {
    if (!currentExpression) return;
    
    setFunctions([
      ...functions,
      {
        expression: currentExpression,
        color: colors[functions.length % colors.length].value,
        lineWidth: 2,
      },
    ]);
    setCurrentExpression("");
  };

  const handleRemoveFunction = (index: number) => {
    setFunctions(functions.filter((_, i) => i !== index));
  };

  const handleUpdateColor = (index: number, color: string) => {
    const newFunctions = [...functions];
    newFunctions[index] = { ...newFunctions[index], color };
    setFunctions(newFunctions);
  };

  const handleUpdateLineWidth = (index: number, lineWidth: number) => {
    const newFunctions = [...functions];
    newFunctions[index] = { ...newFunctions[index], lineWidth };
    setFunctions(newFunctions);
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
      <Card className="w-full max-w-4xl mx-auto p-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Графический калькулятор
            </h1>
            <p className="text-sm text-gray-500">
              Введите функции для построения графиков (используйте x как переменную)
            </p>
          </div>

          <FunctionsList
            functions={functions}
            currentExpression={currentExpression}
            setCurrentExpression={setCurrentExpression}
            handleAddFunction={handleAddFunction}
            handleRemoveFunction={handleRemoveFunction}
            handleUpdateColor={handleUpdateColor}
            handleUpdateLineWidth={handleUpdateLineWidth}
            colors={colors}
            lineWidths={lineWidths}
          />

          <GraphCanvas 
            functions={functions}
            scale={scale}
            setScale={setScale}
          />
        </div>
      </Card>
    </div>
  );
};

export default GraphCalculator;