import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calculator, Plus, X, RotateCcw, Hash } from "lucide-react";
import { evaluate, matrix } from "mathjs";
import { toast } from "sonner";

type Matrix = number[][];

const MatrixCalculator = () => {
  const [matrixA, setMatrixA] = useState<string>("");
  const [matrixB, setMatrixB] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [rows, setRows] = useState<number>(2);
  const [cols, setCols] = useState<number>(2);

  const parseMatrix = (input: string): Matrix | null => {
    try {
      // Parse the string input into a matrix
      const cleanInput = input.trim().replace(/\s+/g, ' ');
      const rows = cleanInput.split(';').map(row => 
        row.trim().split(' ').map(Number)
      );
      
      // Validate matrix dimensions
      const isValid = rows.every(row => row.length === rows[0].length) &&
                     !rows.flat().some(isNaN);
      
      return isValid ? rows : null;
    } catch (error) {
      return null;
    }
  };

  const formatMatrix = (matrix: Matrix): string => {
    return matrix.map(row => row.join(' ')).join(';\n');
  };

  const handleOperation = (operation: string) => {
    try {
      const mA = parseMatrix(matrixA);
      const mB = operation !== 'transpose' && operation !== 'determinant' ? parseMatrix(matrixB) : null;

      if (!mA || (operation !== 'transpose' && operation !== 'determinant' && !mB)) {
        toast.error("Неверный формат матрицы. Используйте пробелы между числами и ; между строками");
        return;
      }

      let resultMatrix;
      switch (operation) {
        case 'add':
          resultMatrix = evaluate(`${JSON.stringify(mA)} + ${JSON.stringify(mB)}`);
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
      toast.error("Ошибка в вычислениях. Проверьте размерности матриц");
    }
  };

  const generateEmptyMatrix = () => {
    const matrix = Array(rows).fill(0).map(() => 
      Array(cols).fill(0).join(' ')
    ).join(';\n');
    return matrix;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <Card className="w-full max-w-4xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
              <Calculator className="h-8 w-8" />
              Матричный калькулятор
            </h1>
            <p className="text-sm text-gray-500">
              Поддержка основных операций с матрицами
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-20">
                  <Label>Строки</Label>
                  <Input 
                    type="number" 
                    min="1" 
                    value={rows} 
                    onChange={(e) => setRows(parseInt(e.target.value))}
                  />
                </div>
                <div className="w-20">
                  <Label>Столбцы</Label>
                  <Input 
                    type="number" 
                    min="1" 
                    value={cols} 
                    onChange={(e) => setCols(parseInt(e.target.value))}
                  />
                </div>
                <Button 
                  className="self-end"
                  variant="outline"
                  onClick={() => setMatrixA(generateEmptyMatrix())}
                >
                  Создать
                </Button>
              </div>

              <div>
                <Label>Матрица A</Label>
                <Textarea
                  value={matrixA}
                  onChange={(e) => setMatrixA(e.target.value)}
                  placeholder="Пример: 1 2; 3 4"
                  className="font-mono"
                  rows={5}
                />
              </div>

              <div>
                <Label>Матрица B</Label>
                <Textarea
                  value={matrixB}
                  onChange={(e) => setMatrixB(e.target.value)}
                  placeholder="Пример: 5 6; 7 8"
                  className="font-mono"
                  rows={5}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={() => handleOperation('add')} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Сложение
                </Button>
                <Button onClick={() => handleOperation('multiply')} className="gap-2">
                  <X className="h-4 w-4" />
                  Умножение
                </Button>
                <Button onClick={() => handleOperation('transpose')} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Транспонирование
                </Button>
                <Button onClick={() => handleOperation('determinant')} className="gap-2">
                  <Hash className="h-4 w-4" />
                  Определитель
                </Button>
              </div>

              <div>
                <Label>Результат</Label>
                <Textarea
                  value={result}
                  readOnly
                  className="font-mono bg-gray-50"
                  rows={8}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MatrixCalculator;