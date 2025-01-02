import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface FunctionsListProps {
  functions: GraphFunction[];
  currentExpression: string;
  setCurrentExpression: (value: string) => void;
  handleAddFunction: () => void;
  handleRemoveFunction: (index: number) => void;
  handleUpdateColor: (index: number, color: string) => void;
  handleUpdateLineWidth: (index: number, lineWidth: number) => void;
  colors: { name: string; value: string }[];
  lineWidths: { name: string; value: number }[];
}

const FunctionsList = ({
  functions,
  currentExpression,
  setCurrentExpression,
  handleAddFunction,
  handleRemoveFunction,
  handleUpdateColor,
  handleUpdateLineWidth,
  colors,
  lineWidths,
}: FunctionsListProps) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          value={currentExpression}
          onChange={(e) => setCurrentExpression(e.target.value)}
          placeholder="Например: x^2"
          className="flex-1"
        />
        <Button onClick={handleAddFunction}>Добавить график</Button>
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
    </div>
  );
};

export default FunctionsList;