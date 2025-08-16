import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import BrowseCollaborations from './pages/Campaigns/BrowseCampaigns';
import CreateCollaboration from './pages/Campaigns/CreateCampaign';
import MyCollaborations from './pages/Campaigns/MyCampaigns';
import Applications from './pages/Applications';
import Wallet from './pages/Wallet';
import NotFound from './pages/NotFound';
import CampaignDetails from './pages/Campaigns/CampaignDetails';
import SubmitContent from './pages/Content/SubmitContent';
import PendingContent from './pages/Content/PendingContent';

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Public Route Component (redirect to dashboard if logged in)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <PublicRoute>
                <Landing />
              </PublicRoute>
            } />
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/signup" element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            } />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/collaborations/browse" element={
              <ProtectedRoute>
                <BrowseCollaborations />
              </ProtectedRoute>
            } />
            <Route path="/collaborations/create" element={
              <ProtectedRoute>
                <CreateCollaboration />
              </ProtectedRoute>
            } />
            <Route path="/collaborations" element={
              <ProtectedRoute>
                <MyCollaborations />
              </ProtectedRoute>
            } />
            <Route path="/collaborations/:id" element={
              <ProtectedRoute>
                <CampaignDetails />
              </ProtectedRoute>
            } />
            <Route path="/content/submit/:id" element={
              <ProtectedRoute>
                <SubmitContent />
              </ProtectedRoute>
            } />
            <Route path="/content/pending" element={
              <ProtectedRoute>
                <PendingContent />
              </ProtectedRoute>
            } />
            <Route path="/applications" element={
              <ProtectedRoute>
                <Applications />
              </ProtectedRoute>
            } />
            <Route path="/wallet" element={
              <ProtectedRoute>
                <Wallet />
              </ProtectedRoute>
            } />
            
            {/* Catch all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;