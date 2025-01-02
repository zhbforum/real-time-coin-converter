import { useEffect, useRef } from "react";
import { evaluate } from "mathjs";

interface GraphFunction {
  expression: string;
  color: string;
  lineWidth: number;
}

interface GraphCanvasProps {
  functions: GraphFunction[];
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
}

const GraphCanvas = ({ functions, scale, setScale }: GraphCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const delta = e.deltaY;
    setScale((prevScale) => {
      if (delta > 0) {
        return prevScale / 1.1; // уменьшаем масштаб
      } else {
        return prevScale * 1.1; // увеличиваем масштаб
      }
    });
  };

  return (
    <div className="relative aspect-video w-full border rounded-lg overflow-hidden bg-white">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="w-full h-full"
        onWheel={handleWheel}
      />
    </div>
  );
};

export default GraphCanvas;