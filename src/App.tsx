
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProgramPuteshestvie from "./pages/ProgramPuteshestvie";
import ProgramLadovanie from "./pages/ProgramLadovanie";
import ProgramTransformaciya from "./pages/ProgramTransformaciya";
import ProgramZhenskaya from "./pages/ProgramZhenskaya";
import ProgramKrepost from "./pages/ProgramKrepost";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/programmy/puteshestvie" element={<ProgramPuteshestvie />} />
          <Route path="/programmy/ladovanie" element={<ProgramLadovanie />} />
          <Route path="/programmy/transformaciya" element={<ProgramTransformaciya />} />
          <Route path="/programmy/zhenskaya-garmoniya" element={<ProgramZhenskaya />} />
          <Route path="/programmy/krepost-duha" element={<ProgramKrepost />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;