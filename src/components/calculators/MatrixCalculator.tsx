import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calculator, Plus, X, RotateCcw, Hash, ArrowLeft, ArrowRight, Trash2, Share2 } from "lucide-react";
import { evaluate, matrix } from "mathjs";
import { toast } from "sonner";

type Matrix = number[][];

const MatrixCalculator = () => {
  const [matrixA, setMatrixA] = useState<string>("");
  const [matrixB, setMatrixB] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [rows, setRows] = useState<number>(3);
  const [cols, setCols] = useState<number>(3);
  const [showDecimals, setShowDecimals] = useState<boolean>(true);

  const parseMatrix = (input: string): Matrix | null => {
    try {
      const cleanInput = input.trim().replace(/\s+/g, ' ');
      const rows = cleanInput.split(';').map(row => 
        row.trim().split(' ').map(Number)
      );
      
      const isValid = rows.every(row => row.length === rows[0].length) &&
                     !rows.flat().some(isNaN);
      
      return isValid ? rows : null;
    } catch (error) {
      return null;
    }
  };

  const formatMatrix = (matrix: Matrix): string => {
    return matrix.map(row => 
      row.map(val => showDecimals ? val.toString() : Math.round(val).toString())
         .join(' ')
    ).join(';\n');
  };

  const handleOperation = (operation: string) => {
    try {
      const mA = parseMatrix(matrixA);
      const mB = operation !== 'transpose' && operation !== 'determinant' ? parseMatrix(matrixB) : null;

      if (!mA || (operation !== 'transpose' && operation !== 'determinant' && !mB)) {
        toast.error("Неверный формат матрицы");
        return;
      }

      let resultMatrix;
      switch (operation) {
        case 'add':
          resultMatrix = evaluate(`${JSON.stringify(mA)} + ${JSON.stringify(mB)}`);
          break;
        case 'subtract':
          resultMatrix = evaluate(`${JSON.stringify(mA)} - ${JSON.stringify(mB)}`);
          break;
        case 'multiply':
          resultMatrix = evaluate(`${JSON.stringify(mA)} * ${JSON.stringify(mB)}`);
          break;
        case 'transpose':
          resultMatrix = evaluate(`transpose(${JSON.stringify(mA)})`);
          break;
        case 'determinant':
          const det = evaluate(`det(${JSON.stringify(mA)})`);
          setResult(det.toString());
          return;
        default:
          return;
      }

      setResult(formatMatrix(resultMatrix));
    } catch (error) {
      toast.error("Ошибка в вычислениях");
    }
  };

  const generateEmptyMatrix = () => {
    const matrix = Array(rows).fill(0).map(() => 
      Array(cols).fill(0).join(' ')
    ).join(';\n');
    return matrix;
  };

  return (
    <div className="space-y-6 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Matrix A */}
        <div className="space-y-4">
          <div className="text-xl font-bold">Matrix A:</div>
          <div className="bg-slate-800 p-4 rounded-lg">
            <Textarea
              value={matrixA}
              onChange={(e) => setMatrixA(e.target.value)}
              placeholder="Пример: 1 2 3; 4 5 6; 7 8 9"
              className="font-mono bg-slate-700 border-slate-600 text-white"
              rows={5}
            />
            <div className="flex gap-2 mt-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setMatrixA(generateEmptyMatrix())}
              >
                Cells
              </Button>
              <Input 
                type="number" 
                min="1" 
                value={rows} 
                onChange={(e) => setRows(parseInt(e.target.value))}
                className="w-16 bg-slate-700 border-slate-600"
              />
              <Input 
                type="number" 
                min="1" 
                value={cols} 
                onChange={(e) => setCols(parseInt(e.target.value))}
                className="w-16 bg-slate-700 border-slate-600"
              />
            </div>
          </div>
        </div>

        {/* Matrix B */}
        <div className="space-y-4">
          <div className="text-xl font-bold">Matrix B:</div>
          <div className="bg-slate-800 p-4 rounded-lg">
            <Textarea
              value={matrixB}
              onChange={(e) => setMatrixB(e.target.value)}
              placeholder="Пример: 9 8 7; 6 5 4; 3 2 1"
              className="font-mono bg-slate-700 border-slate-600 text-white"
              rows={5}
            />
          </div>
        </div>
      </div>

      {/* Operations */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button 
          onClick={() => handleOperation('multiply')} 
          className="bg-slate-700 hover:bg-slate-600"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          A × B
        </Button>
        <Button 
          onClick={() => handleOperation('add')} 
          className="bg-slate-700 hover:bg-slate-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          A + B
        </Button>
        <Button 
          onClick={() => handleOperation('subtract')} 
          className="bg-slate-700 hover:bg-slate-600"
        >
          <X className="h-4 w-4 mr-2" />
          A - B
        </Button>
        <Button 
          onClick={() => handleOperation('transpose')} 
          className="bg-slate-700 hover:bg-slate-600"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Transpose
        </Button>
      </div>

      {/* Additional Operations */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button 
          onClick={() => handleOperation('determinant')} 
          className="bg-slate-700 hover:bg-slate-600"
        >
          <Hash className="h-4 w-4 mr-2" />
          Determinant
        </Button>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showDecimals}
            onChange={(e) => setShowDecimals(e.target.checked)}
            className="w-4 h-4"
          />
          <Label>Display decimals</Label>
        </div>
      </div>

      {/* Result */}
      <div className="space-y-4">
        <div className="text-xl font-bold">Result:</div>
        <div className="bg-slate-800 p-4 rounded-lg">
          <Textarea
            value={result}
            readOnly
            className="font-mono bg-slate-700 border-slate-600 text-white"
            rows={5}
          />
          <div className="flex gap-2 mt-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setResult("")}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Clean
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(result);
                toast.success("Результат скопирован");
              }}
              className="gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatrixCalculator;