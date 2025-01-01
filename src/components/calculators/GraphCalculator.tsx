import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { evaluate } from "mathjs";

const GraphCalculator = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [expression, setExpression] = useState("x^2");
  const [scale, setScale] = useState(50); // пикселей на единицу
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Очищаем canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Рисуем оси
    ctx.beginPath();
    ctx.strokeStyle = "#666";
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

    // Рисуем график
    ctx.beginPath();
    ctx.strokeStyle = "#2563eb";
    ctx.lineWidth = 2;

    for (let px = 0; px < canvas.width; px++) {
      const x = (px - canvas.width / 2) / scale;
      try {
        const y = evaluate(expression, { x });
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
  };

  useEffect(() => {
    drawGraph();
  }, [expression, scale]);

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
              Введите функцию для построения графика (используйте x как переменную)
            </p>
          </div>

          <div className="flex gap-4">
            <Input
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              placeholder="Например: x^2"
              className="flex-1"
            />
            <Button onClick={handleZoomIn}>+</Button>
            <Button onClick={handleZoomOut}>-</Button>
          </div>

          <div className="relative aspect-video w-full border rounded-lg overflow-hidden">
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