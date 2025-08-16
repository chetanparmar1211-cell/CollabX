import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Plus,
  TrendingUp,
  Users,
  Star,
  DollarSign,
  Eye,
  AlertCircle,
  Calendar,
  ArrowUpRight,
  Target,
  Zap,
  BarChart3,
  Settings,
  Download,
  Share2,
  Handshake,
  Gift
} from 'lucide-react';

const BrandDashboard = () => {
  const stats = [
    {
      title: 'Active Collaborations',
      value: '12',
      change: '+2 this week',
      changeType: 'positive',
      icon: TrendingUp,
      action: 'Create New Collaboration',
      actionLink: '/collaborations/create'
    },
    {
      title: 'Total Partnerships',
      value: '348',
      change: '+45 this month',
      changeType: 'positive',
      icon: Handshake,
      action: 'View All Partnerships',
      actionLink: '/partnerships'
    },
    {
      title: 'Active Creators',
      value: '89',
      change: '+12 this week',
      changeType: 'positive',
      icon: Users,
      action: 'Browse Creators',
      actionLink: '/creators'
    },
    {
      title: 'Total Investment',
      value: '₹42,850',
      change: '+₹5,200 this month',
      changeType: 'neutral',
      icon: DollarSign,
      action: 'View Analytics',
      actionLink: '/analytics'
    }
  ];

  const quickActions = [
    {
      title: 'Create Collaboration',
      description: 'Launch a new product collaboration',
      icon: Plus,
      action: 'Get Started',
      link: '/collaborations/create',
      color: 'bg-purple-500'
    },
    {
      title: 'Find Creators',
      description: 'Browse verified creators',
      icon: Users,
      action: 'Browse Now',
      link: '/creators',
      color: 'bg-green-500'
    },
    {
      title: 'View Analytics',
      description: 'Track collaboration performance',
      icon: BarChart3,
      action: 'View Reports',
      link: '/analytics',
      color: 'bg-pink-500'
    },
    {
      title: 'Product Samples',
      description: 'Manage product sample inventory',
      icon: Gift,
      action: 'Manage Samples',
      link: '/samples',
      color: 'bg-orange-500'
    }
  ];

  const recentCollaborations = [
    {
      id: '1',
      productName: 'Wireless Bluetooth Headphones Pro',
      status: 'active',
      progress: 75,
      creatorsCompleted: 15,
      creatorsRequired: 20,
      daysLeft: 5,
      investment: '₹8,000',
      roi: '+340%',
      engagementRate: '12.5%'
    },
    {
      id: '2',
      productName: 'Smart Fitness Tracker',
      status: 'active',
      progress: 40,
      creatorsCompleted: 8,
      creatorsRequired: 20,
      daysLeft: 12,
      investment: '₹6,000',
      roi: '+280%',
      engagementRate: '9.8%'
    },
    {
      id: '3',
      productName: 'Organic Protein Powder',
      status: 'completed',
      progress: 100,
      creatorsCompleted: 25,
      creatorsRequired: 25,
      daysLeft: 0,
      investment: '₹10,000',
      roi: '+420%',
      engagementRate: '15.2%'
    },
    {
      id: '4',
      productName: 'LED Desk Lamp with USB',
      status: 'pending',
      progress: 0,
      creatorsCompleted: 0,
      creatorsRequired: 15,
      daysLeft: 14,
      investment: '₹4,500',
      roi: 'N/A',
      engagementRate: 'N/A'
    }
  ];

  const pendingContent = [
    {
      id: '1',
      creator: 'Sarah M.',
      rating: 4.9,
      product: 'Wireless Headphones Pro',
      submittedAt: '2 hours ago',
      status: 'pending_verification',
      priority: 'high'
    },
    {
      id: '2',
      creator: 'Mike R.',
      rating: 5.0,
      product: 'Smart Fitness Tracker',
      submittedAt: '4 hours ago',
      status: 'pending_verification',
      priority: 'medium'
    },
    {
      id: '3',
      creator: 'Lisa K.',
      rating: 4.7,
      product: 'Organic Protein Powder',
      submittedAt: '6 hours ago',
      status: 'pending_verification',
      priority: 'low'
    }
  ];

  const insights = [
    {
      title: 'Collaboration Performance',
      description: 'Your collaborations are performing 23% above industry average',
      metric: '+23%',
      trend: 'up',
      action: 'View Details'
    },
    {
      title: 'Creator Engagement',
      description: 'Creator response rate increased by 15% this month',
      metric: '+15%',
      trend: 'up',
      action: 'Optimize Collaborations'
    },
    {
      title: 'ROI Improvement',
      description: 'Average ROI improved from 280% to 340%',
      metric: '+60%',
      trend: 'up',
      action: 'Scale Successful Collaborations'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, TechGear Pro! 👋</h1>
          <p className="text-gray-600 mt-2">Here's what's happening with your collaboration campaigns today</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.changeType === 'positive' ? 'bg-green-100' : stat.changeType === 'negative' ? 'bg-red-100' : 'bg-purple-100'} rounded-lg flex items-center justify-center`}>
                    <Icon className={`h-6 w-6 ${stat.changeType === 'positive' ? 'text-green-600' : stat.changeType === 'negative' ? 'text-red-600' : 'text-purple-600'}`} />
                  </div>
                  <Badge variant={stat.changeType === 'positive' ? 'default' : stat.changeType === 'negative' ? 'destructive' : 'secondary'} className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <div className="mb-4">
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.title}</div>
                </div>
                <Button variant="ghost" size="sm" className="w-full text-xs" asChild>
                  <Link to={stat.actionLink}>
                    {stat.action}
                    <ArrowUpRight className="h-3 w-3 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                  <Button size="sm" className="w-full" asChild>
                    <Link to={action.link}>
                      {action.action}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Collaborations */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Collaborations</h2>
            <Button asChild>
              <Link to="/collaborations">
                View All
                <ArrowUpRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="space-y-4">
            {recentCollaborations.map((collaboration) => (
              <Card key={collaboration.id} className="hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{collaboration.productName}</h3>
                        <Badge 
                          variant={collaboration.status === 'active' ? 'default' : collaboration.status === 'completed' ? 'secondary' : 'outline'}
                        >
                          {collaboration.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <span>Progress: {collaboration.progress}%</span>
                        <span>Creators: {collaboration.creatorsCompleted}/{collaboration.creatorsRequired}</span>
                        <span>Investment: {collaboration.investment}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      {collaboration.roi !== 'N/A' && (
                        <div className="text-green-600 font-semibold text-sm">{collaboration.roi}</div>
                      )}
                      {collaboration.engagementRate !== 'N/A' && (
                        <div className="text-purple-600 text-xs">{collaboration.engagementRate} engagement</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{collaboration.progress}%</span>
                    </div>
                    <Progress value={collaboration.progress} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {collaboration.daysLeft} days left
                      </span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                                             <Link to={`/collaborations/${collaboration.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Pending Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-orange-500" />
                Pending Content
              </CardTitle>
              <CardDescription>
                {pendingContent.length} content pieces awaiting verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingContent.map((content) => (
                  <div key={content.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{content.creator.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{content.creator}</p>
                      <p className="text-xs text-gray-600 truncate">{content.product}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${i < content.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <Badge 
                          variant={content.priority === 'high' ? 'destructive' : content.priority === 'medium' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {content.priority}
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Verify
                    </Button>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link to="/content/pending">
                  View All Pending
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                Key Insights
              </CardTitle>
              <CardDescription>
                Performance highlights and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <div key={index} className="p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-purple-900 text-sm">{insight.title}</h4>
                      <span className="text-green-600 font-semibold text-sm">{insight.metric}</span>
                    </div>
                    <p className="text-purple-800 text-xs mb-3">{insight.description}</p>
                    <Button size="sm" variant="ghost" className="text-purple-700 hover:text-purple-800 p-0 h-auto text-xs">
                      {insight.action}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-purple-500" />
                Quick Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Optimize your product images for better creator engagement</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Set clear collaboration requirements to avoid misunderstandings</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Respond quickly to creator questions for better completion rates</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BrandDashboard;