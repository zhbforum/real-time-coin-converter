import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from "./pages/Index";
import Graph from "./pages/Graph";
import Finance from "./pages/Finance";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/graph" element={<Graph />} />
          <Route path="/finance" element={<Finance />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;