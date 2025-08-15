import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DollarSign,
  Star,
  TrendingUp,
  Clock,
  Search,
  Upload,
  CheckCircle,
  AlertCircle,
  Calendar,
  Wallet,
  Target,
  Zap,
  BarChart3,
  Gift,
  TrendingDown,
  ArrowUpRight
} from 'lucide-react';

const CreatorDashboard = () => {
  const stats = [
    {
      title: 'Total Earnings',
      value: '₹12,450',
      change: '+₹2,340 this month',
      changeType: 'positive',
      icon: DollarSign,
      action: 'View Wallet',
      actionLink: '/wallet'
    },
    {
      title: 'Collaborations Completed',
      value: '45',
      change: '+8 this month',
      changeType: 'positive',
      icon: Star,
      action: 'View History',
      actionLink: '/collaborations/history'
    },
    {
      title: 'Success Rate',
      value: '98.2%',
      change: '+2.1% improvement',
      changeType: 'positive',
      icon: TrendingUp,
      action: 'View Analytics',
      actionLink: '/analytics'
    },
    {
      title: 'Pending Content',
      value: '3',
      change: 'Due in 2 days',
      changeType: 'neutral',
      icon: Clock,
      action: 'View Pending',
      actionLink: '/content/pending'
    }
  ];

  const quickActions = [
    {
      title: 'Find Collaborations',
      description: 'Browse new collaboration opportunities',
      icon: Search,
      action: 'Browse Now',
      link: '/collaborations/browse',
      color: 'bg-purple-500'
    },
    {
      title: 'Submit Content',
      description: 'Upload your completed content',
      icon: Upload,
      action: 'Submit Now',
      link: '/content/submit',
      color: 'bg-green-500'
    },
    {
      title: 'View Earnings',
      description: 'Check your wallet balance',
      icon: Wallet,
      action: 'View Wallet',
      link: '/wallet',
      color: 'bg-pink-500'
    },
    {
      title: 'Update Profile',
      description: 'Keep your profile current',
      icon: Target,
      action: 'Edit Profile',
      link: '/profile',
      color: 'bg-orange-500'
    }
  ];

  const activeCollaborations = [
    {
      id: '1',
      collaborationId: 'collab_1',
      productName: 'Wireless Bluetooth Headphones Pro',
      brandName: 'TechGear',
      compensation: '₹450',
      deadline: '2024-08-18',
      status: 'product_received',
      progress: 50,
      nextStep: 'Submit Content',
      daysLeft: 4,
      priority: 'high'
    },
    {
      id: '2',
      collaborationId: 'collab_2',
      productName: 'Smart Fitness Tracker',
      brandName: 'FitLife',
      compensation: '₹380',
      deadline: '2024-08-20',
      status: 'testing',
      progress: 25,
      nextStep: 'Test Product',
      daysLeft: 6,
      priority: 'medium'
    },
    {
      id: '3',
      collaborationId: 'collab_3',
      productName: 'Organic Protein Powder',
      brandName: 'HealthPlus',
      compensation: '₹520',
      deadline: '2024-08-16',
      status: 'submitted',
      progress: 90,
      nextStep: 'Awaiting Verification',
      daysLeft: 2,
      priority: 'low'
    }
  ];

  const availableCollaborations = [
    {
      id: '1',
      productName: 'LED Desk Lamp with USB Charging',
      brandName: 'ModernWork',
      category: 'Electronics',
      compensation: '₹350',
      creatorsNeeded: 8,
      totalCreators: 15,
      deadline: '2024-08-25',
      difficulty: 'Easy',
      estimatedTime: '2-3 days'
    },
    {
      id: '2',
      productName: 'Natural Face Moisturizer',
      brandName: 'BeautyPure',
      category: 'Beauty',
      compensation: '₹420',
      creatorsNeeded: 12,
      totalCreators: 20,
      deadline: '2024-08-28',
      difficulty: 'Medium',
      estimatedTime: '3-5 days'
    },
    {
      id: '3',
      productName: 'Portable Bluetooth Speaker',
      brandName: 'SoundWave',
      category: 'Electronics',
      compensation: '₹380',
      creatorsNeeded: 6,
      totalCreators: 10,
      deadline: '2024-08-22',
      difficulty: 'Easy',
      estimatedTime: '2-3 days'
    }
  ];

  const recentEarnings = [
    {
      id: '1',
      collaboration: 'Wireless Headphones',
      amount: '₹450',
      date: '2024-08-15',
      status: 'completed',
      type: 'collaboration_payment'
    },
    {
      id: '2',
      collaboration: 'Smart Watch',
      amount: '₹520',
      date: '2024-08-14',
      status: 'completed',
      type: 'collaboration_payment'
    },
    {
      id: '3',
      collaboration: 'Protein Powder',
      amount: '₹380',
      date: '2024-08-13',
      status: 'completed',
      type: 'collaboration_payment'
    }
  ];

  const achievements = [
    {
      title: 'First Collaboration',
      description: 'Completed your first collaboration',
      icon: Star,
      unlocked: true,
      progress: 100
    },
    {
      title: 'Top Creator',
      description: 'Maintain 4.8+ rating for 10 collaborations',
      icon: TrendingUp,
      unlocked: false,
      progress: 70
    },
    {
      title: 'Speed Demon',
      description: 'Complete 5 collaborations in 7 days',
      icon: Zap,
      unlocked: false,
      progress: 40
    },
    {
      title: 'Quality Master',
      description: 'Get 5 approved collaborations in a row',
      icon: CheckCircle,
      unlocked: false,
      progress: 60
    }
  ];

  const tips = [
    'Take high-quality photos of the product in use',
    'Create authentic, engaging content with specific examples',
    'Submit content before the deadline to maintain good standing',
    'Communicate with brands if you have questions about requirements'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, Marcus! 👋</h1>
          <p className="text-gray-600 mt-2">Here's your collaboration dashboard and available opportunities</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button variant="outline" size="sm">
            <Gift className="h-4 w-4 mr-2" />
            Rewards
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
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Collaborations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-orange-500" />
                Active Collaborations
              </CardTitle>
              <CardDescription>
                {activeCollaborations.length} collaborations in progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeCollaborations.map((collaboration) => (
                  <div key={collaboration.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-medium text-gray-900">{collaboration.productName}</h3>
                          <Badge 
                            variant={collaboration.priority === 'high' ? 'destructive' : collaboration.priority === 'medium' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {collaboration.priority} priority
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Brand: {collaboration.brandName}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Compensation: {collaboration.compensation}</span>
                          <span>Deadline: {collaboration.deadline}</span>
                          <span className="text-orange-600 font-medium">{collaboration.daysLeft} days left</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900 mb-1">{collaboration.nextStep}</div>
                        <Badge variant="outline" className="text-xs">
                          {collaboration.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{collaboration.progress}%</span>
                      </div>
                      <Progress value={collaboration.progress} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Due in {collaboration.daysLeft} days</span>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <Link to={`/collaborations/${collaboration.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link to="/collaborations/active">
                  View All Active Collaborations
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Available Collaborations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="h-5 w-5 mr-2 text-purple-500" />
                Available Collaborations
              </CardTitle>
              <CardDescription>
                {availableCollaborations.length} new opportunities available
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableCollaborations.map((collaboration) => (
                  <div key={collaboration.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{collaboration.productName}</h3>
                        <p className="text-sm text-gray-600 mb-2">Brand: {collaboration.brandName}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Category: {collaboration.category}</span>
                          <span>Compensation: {collaboration.compensation}</span>
                          <span>Creators needed: {collaboration.creatorsNeeded}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900 mb-1">{collaboration.compensation}</div>
                        <Badge variant="outline" className="text-xs mb-2">
                          {collaboration.difficulty}
                        </Badge>
                        <div className="text-xs text-gray-500">{collaboration.estimatedTime}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Deadline: {collaboration.deadline}</span>
                        <span>Total creators: {collaboration.totalCreators}</span>
                      </div>
                      <Button size="sm" asChild>
                        <Link to={`/collaborations/${collaboration.id}`}>
                          Apply Now
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link to="/collaborations/browse">
                  Browse All Collaborations
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Recent Earnings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-green-500" />
                Recent Earnings
              </CardTitle>
              <CardDescription>
                Your latest collaboration payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentEarnings.map((earning) => (
                  <div key={earning.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-green-900 text-sm">{earning.collaboration}</p>
                      <p className="text-green-700 text-xs">{earning.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-900">{earning.amount}</p>
                      <Badge variant="secondary" className="text-xs">
                        {earning.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link to="/wallet">
                  View Full History
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gift className="h-5 w-5 mr-2 text-purple-500" />
                Achievements
              </CardTitle>
              <CardDescription>
                Track your progress and unlock rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          achievement.unlocked ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          <Icon className={`h-4 w-4 ${
                            achievement.unlocked ? 'text-green-600' : 'text-gray-400'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h4 className={`text-sm font-medium ${
                            achievement.unlocked ? 'text-green-900' : 'text-gray-700'
                          }`}>
                            {achievement.title}
                          </h4>
                          <p className="text-xs text-gray-600">{achievement.description}</p>
                        </div>
                      </div>
                      <div className="ml-11">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} className="h-1" />
                      </div>
                    </div>
                  );
                })}
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
                {tips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;