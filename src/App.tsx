import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopNavigation } from "@/components/TopNavigation";
import Index from "./pages/Index";
import JobScheduling from "./pages/JobScheduling";
import StaffManagement from "./pages/StaffManagement";
import NotFound from "./pages/NotFound";
import ClientCRM from "./pages/ClientCRM";
import FinancePayroll from "./pages/FinancePayroll";
import InventoryEquipment from "./pages/InventoryEquipment";

// Create QueryClient outside of component to avoid recreation on each render
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="min-h-screen flex w-full bg-background">
              <AppSidebar />
              <div className="flex-1 flex flex-col">
                <TopNavigation />
                <main className="flex-1 overflow-auto">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/scheduling" element={<JobScheduling />} />
                    <Route path="/staff" element={<StaffManagement />} />
                    <Route path="/clients" element={<ClientCRM />} />
                    <Route path="/finance" element={<FinancePayroll />} />
                    <Route path="/inventory" element={<InventoryEquipment />} />
                    <Route path="/reports" element={<div className="p-6"><h1 className="text-2xl font-bold">Reports & Analytics (Coming Soon)</h1></div>} />
                    <Route path="/settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings (Coming Soon)</h1></div>} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
