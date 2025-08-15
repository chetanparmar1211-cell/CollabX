import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  Plus,
  Megaphone,
  Users,
  Star,
  Wallet,
  Settings,
  BarChart3,
  Shield,
  Flag,
  Search,
  UserCheck
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const { user } = useAuth();
  const location = useLocation();

  const getNavigationItems = () => {
    if (!user) return [];

    switch (user.role) {
      case 'brand':
        return [
          { 
            name: 'Dashboard', 
            href: '/dashboard', 
            icon: LayoutDashboard,
            description: 'Overview & analytics'
          },
          { 
            name: 'Create Collaboration', 
            href: '/collaborations/create', 
            icon: Plus,
            description: 'Launch new collaboration campaign'
          },
          { 
            name: 'My Collaborations', 
            href: '/collaborations', 
            icon: Megaphone,
            description: 'Manage active collaborations'
          },
          { 
            name: 'Creators', 
            href: '/creators', 
            icon: Users,
            description: 'Browse creator profiles'
          },
          { 
            name: 'Content', 
            href: '/content', 
            icon: Star,
            description: 'Verify submitted content'
          },
          { 
            name: 'Wallet', 
            href: '/wallet', 
            icon: Wallet,
            description: 'Payments & transactions'
          },
          { 
            name: 'Analytics', 
            href: '/analytics', 
            icon: BarChart3,
            description: 'Performance insights'
          }
        ];

      case 'creator':
        return [
          { 
            name: 'Dashboard', 
            href: '/dashboard', 
            icon: LayoutDashboard,
            description: 'Your activity overview'
          },
          { 
            name: 'Find Collaborations', 
            href: '/collaborations/browse', 
            icon: Search,
            description: 'Browse available collaborations'
          },
          { 
            name: 'My Applications', 
            href: '/applications', 
            icon: UserCheck,
            description: 'Track application status'
          },
          { 
            name: 'Active Collaborations', 
            href: '/collaborations/active', 
            icon: Star,
            description: 'Submit pending content'
          },
          { 
            name: 'Wallet', 
            href: '/wallet', 
            icon: Wallet,
            description: 'Earnings & withdrawals'
          },
          { 
            name: 'Profile', 
            href: '/profile', 
            icon: Users,
            description: 'Update your profile'
          }
        ];

      case 'admin':
        return [
          { 
            name: 'Dashboard', 
            href: '/admin/dashboard', 
            icon: LayoutDashboard,
            description: 'Platform overview'
          },
          { 
            name: 'Users', 
            href: '/admin/users', 
            icon: Users,
            description: 'Manage all users'
          },
          { 
            name: 'Collaborations', 
            href: '/admin/collaborations', 
            icon: Megaphone,
            description: 'Monitor all collaborations'
          },
          { 
            name: 'Content', 
            href: '/admin/content', 
            icon: Star,
            description: 'Content verification'
          },
          { 
            name: 'Disputes', 
            href: '/admin/disputes', 
            icon: Flag,
            description: 'Handle disputes'
          },
          { 
            name: 'Quality Detection', 
            href: '/admin/quality', 
            icon: Shield,
            description: 'Monitor content quality'
          },
          { 
            name: 'Analytics', 
            href: '/admin/analytics', 
            icon: BarChart3,
            description: 'Platform metrics'
          }
        ];

      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full pt-16 lg:pt-0">
          {/* User Role Badge */}
          {user && (
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{user.role} Dashboard</p>
                  <p className="text-xs text-gray-500">Welcome back, {user.name.split(' ')[0]}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className={cn(
                        "group flex flex-col p-3 rounded-lg transition-all duration-200",
                        isActive
                          ? "bg-purple-50 text-purple-700 shadow-sm"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={cn(
                          "h-5 w-5 flex-shrink-0",
                          isActive ? "text-purple-600" : "text-gray-400 group-hover:text-gray-600"
                        )} />
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 ml-8">{item.description}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Settings at bottom */}
          <div className="p-4 border-t border-gray-200">
            <Link
              to="/settings"
              onClick={onClose}
              className="group flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
            >
              <Settings className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-600" />
              <span className="text-sm font-medium">Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;