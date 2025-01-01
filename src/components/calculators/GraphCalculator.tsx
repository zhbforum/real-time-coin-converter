import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { evaluate } from "mathjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface GraphFunction {
  expression: string;
  color: string;
  lineWidth: number;
}

const GraphCalculator = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

  const drawGrid = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const gridSize = scale;
    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 0.5;

    // Вертикальные линии
    for (let x = 0; x <= canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
      
      // Подписи по X
      const value = Math.round((x - canvas.width / 2) / scale);
      ctx.fillStyle = "#666";
      ctx.fillText(value.toString(), x - 10, canvas.height / 2 + 20);
    }

    // Горизонтальные линии
    for (let y = 0; y <= canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
      
      // Подписи по Y
      const value = Math.round((canvas.height / 2 - y) / scale);
      ctx.fillStyle = "#666";
      ctx.fillText(value.toString(), canvas.width / 2 + 5, y + 5);
    }
  };

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Очищаем canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Рисуем сетку
    drawGrid(ctx, canvas);

    // Рисуем оси
    ctx.beginPath();
    ctx.strokeStyle = "#666";
    ctx.lineWidth = 1;
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

    // Рисуем все графики
    functions.forEach((func) => {
      ctx.beginPath();
      ctx.strokeStyle = func.color;
      ctx.lineWidth = func.lineWidth;

      for (let px = 0; px < canvas.width; px++) {
        const x = (px - canvas.width / 2) / scale;
        try {
          const y = evaluate(func.expression, { x });
          const py = canvas.height / 2 - y * scale;
          
          if (px === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        } catch (error) {
          console.error("Error evaluating expression:", error);
        }
      }
      ctx.stroke();
    });
  };

  useEffect(() => {
    drawGraph();
  }, [functions, scale]);

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

  const handleZoomIn = () => setScale(prev => prev * 1.2);
  const handleZoomOut = () => setScale(prev => prev / 1.2);

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

          <div className="flex gap-4">
            <Input
              value={currentExpression}
              onChange={(e) => setCurrentExpression(e.target.value)}
              placeholder="Например: x^2"
              className="flex-1"
            />
            <Button onClick={handleAddFunction}>Добавить график</Button>
            <Button onClick={handleZoomIn}>+</Button>
            <Button onClick={handleZoomOut}>-</Button>
          </div>

          <div className="space-y-2">
            {functions.map((func, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-sm">
                <span className="text-sm font-medium">{func.expression}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-24" style={{ color: func.color }}>
                      Цвет
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {colors.map((color) => (
                      <DropdownMenuItem
                        key={color.value}
                        onClick={() => handleUpdateColor(index, color.value)}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: color.value }}
                          />
                          {color.name}
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-32">
                      Толщина: {func.lineWidth}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {lineWidths.map((width) => (
                      <DropdownMenuItem
                        key={width.value}
                        onClick={() => handleUpdateLineWidth(index, width.value)}
                      >
                        {width.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemoveFunction(index)}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>

          <div className="relative aspect-video w-full border rounded-lg overflow-hidden bg-white">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="w-full h-full"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GraphCalculator;