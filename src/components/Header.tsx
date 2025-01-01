import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Calculator, ChartLine, DollarSign, Code, Grid } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Калькуляторы</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
                  <Link to="/" className="flex items-center gap-2 p-2 hover:bg-accent rounded-md transition-colors">
                    <Calculator className="h-5 w-5" />
                    <div>
                      <div className="font-medium">Инженерный</div>
                      <div className="text-sm text-muted-foreground">Тригонометрия и сложные вычисления</div>
                    </div>
                  </Link>
                  <Link to="/graph" className="flex items-center gap-2 p-2 hover:bg-accent rounded-md transition-colors">
                    <ChartLine className="h-5 w-5" />
                    <div>
                      <div className="font-medium">Графический</div>
                      <div className="text-sm text-muted-foreground">Построение графиков функций</div>
                    </div>
                  </Link>
                  <Link to="/finance" className="flex items-center gap-2 p-2 hover:bg-accent rounded-md transition-colors">
                    <DollarSign className="h-5 w-5" />
                    <div>
                      <div className="font-medium">Финансовый</div>
                      <div className="text-sm text-muted-foreground">Кредиты и инвестиции</div>
                    </div>
                  </Link>
                  <Link to="/matrix" className="flex items-center gap-2 p-2 hover:bg-accent rounded-md transition-colors">
                    <Grid className="h-5 w-5" />
                    <div>
                      <div className="font-medium">Матричный</div>
                      <div className="text-sm text-muted-foreground">Операции с матрицами</div>
                    </div>
                  </Link>
                  <Link to="/programming" className="flex items-center gap-2 p-2 hover:bg-accent rounded-md transition-colors">
                    <Code className="h-5 w-5" />
                    <div>
                      <div className="font-medium">Программируемый</div>
                      <div className="text-sm text-muted-foreground">Выполнение скриптов</div>
                    </div>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;