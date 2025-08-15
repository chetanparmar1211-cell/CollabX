import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  Megaphone,
  Star,
  DollarSign,
  AlertTriangle,
  Shield,
  TrendingUp,
  Activity,
  Eye,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '15,234',
      change: '+234 this week',
      changeType: 'positive',
      icon: Users,
      breakdown: { brands: 2341, reviewers: 12893 }
    },
    {
      title: 'Active Campaigns',
      value: '1,456',
      change: '+89 this week',
      changeType: 'positive',
      icon: Megaphone
    },
    {
      title: 'Reviews This Month',
      value: '8,921',
      change: '+12.5% vs last month',
      changeType: 'positive',
      icon: Star
    },
    {
      title: 'Platform Revenue',
      value: '₹4,56,780',
      change: '+₹45,230 this month',
      changeType: 'positive',
      icon: DollarSign
    }
  ];

  const alertItems = [
    {
      id: '1',
      type: 'fraud',
      title: 'Suspicious Review Pattern Detected',
      description: 'User @reviewer_123 submitted 15 reviews in 2 hours',
      severity: 'high',
      time: '2 hours ago'
    },
    {
      id: '2',
      type: 'dispute',
      title: 'Brand Dispute Escalated',
      description: 'TechGear Co. disputed review verification for Campaign #4521',
      severity: 'medium',
      time: '4 hours ago'
    },
    {
      id: '3',
      type: 'system',
      title: 'Review Verification Backlog',
      description: '245 reviews pending verification for >24 hours',
      severity: 'medium',
      time: '6 hours ago'
    }
  ];

  const recentActivities = [
    {
      id: '1',
      action: 'User Registration',
      user: 'sarah.brand@example.com',
      details: 'New brand account created',
      time: '5 minutes ago',
      type: 'user'
    },
    {
      id: '2',
      action: 'Campaign Approved',
      user: 'TechGear Pro',
      details: 'Wireless Headphones campaign went live',
      time: '12 minutes ago',
      type: 'campaign'
    },
    {
      id: '3',
      action: 'Review Flagged',
      user: 'reviewer_456',
      details: 'Review flagged for potential fraud',
      time: '25 minutes ago',
      type: 'review'
    },
    {
      id: '4',
      action: 'Payout Processed',
      user: 'mike.reviewer@example.com',
      details: '₹2,340 withdrawn to bank account',
      time: '1 hour ago',
      type: 'payment'
    }
  ];

  const pendingApprovals = [
    {
      id: '1',
      type: 'campaign',
      title: 'Smart Watch Pro Campaign',
      submitter: 'WearTech Solutions',
      amount: '₹15,000',
      status: 'pending',
      time: '2 days ago'
    },
    {
      id: '2',
      type: 'reviewer',
      title: 'Reviewer Verification',
      submitter: 'alex.reviewer@example.com',
      amount: '4.9 rating',
      status: 'pending',
      time: '1 day ago'
    },
    {
      id: '3',
      type: 'brand',
      title: 'Brand Account Verification',
      submitter: 'EcoFriendly Products',
      amount: 'Documents submitted',
      status: 'pending',
      time: '3 hours ago'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return Users;
      case 'campaign': return Megaphone;
      case 'review': return Star;
      case 'payment': return DollarSign;
      default: return Activity;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Platform overview and management</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" asChild>
            <Link to="/admin/users">Manage Users</Link>
          </Button>
          <Button asChild>
            <Link to="/admin/reports">View Reports</Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className="text-sm mt-1 text-green-600">{stat.change}</p>
                    {stat.breakdown && (
                      <div className="flex space-x-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {stat.breakdown.brands} brands
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {stat.breakdown.reviewers} reviewers
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-3 rounded-lg bg-blue-100">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts & Issues */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <span>Alerts & Issues</span>
                  <Badge variant="destructive">{alertItems.length}</Badge>
                </CardTitle>
                <CardDescription>Critical issues requiring attention</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/admin/alerts">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertItems.map((alert) => (
                  <div key={alert.id} className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{alert.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {alert.type}
                          </Badge>
                          <span className="text-xs text-gray-500">{alert.time}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className={`${getSeverityColor(alert.severity)} text-xs`}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button size="sm" variant="outline">
                        Investigate
                      </Button>
                      <Button size="sm">
                        Resolve
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Approvals */}
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <span>Pending Approvals</span>
                  <Badge variant="secondary">{pendingApprovals.length}</Badge>
                </CardTitle>
                <CardDescription>Items awaiting review</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApprovals.map((item) => (
                  <div key={item.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{item.title}</p>
                        <p className="text-xs text-gray-600 mb-1">{item.submitter}</p>
                        <p className="text-xs text-gray-500">{item.time}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {item.type}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{item.amount}</span>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline" className="text-xs h-6 px-2">
                          <XCircle className="h-3 w-3" />
                        </Button>
                        <Button size="sm" className="text-xs h-6 px-2">
                          <CheckCircle className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                <Link to="/admin/approvals">View All Approvals</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform activities</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/admin/activity">View Activity Log</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.map((activity) => {
              const Icon = getActivityIcon(activity.type);
              return (
                <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-white rounded-lg">
                    <Icon className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-gray-900 text-sm">{activity.action}</p>
                      <Badge variant="outline" className="text-xs">{activity.type}</Badge>
                    </div>
                    <p className="text-xs text-gray-600">{activity.user} • {activity.details}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" asChild>
              <Link to="/admin/users">
                <Users className="h-6 w-6" />
                <span>Manage Users</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" asChild>
              <Link to="/admin/campaigns">
                <Megaphone className="h-6 w-6" />
                <span>Monitor Campaigns</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" asChild>
              <Link to="/admin/fraud">
                <Shield className="h-6 w-6" />
                <span>Fraud Detection</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" asChild>
              <Link to="/admin/analytics">
                <TrendingUp className="h-6 w-6" />
                <span>Platform Analytics</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;