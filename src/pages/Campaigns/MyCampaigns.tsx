import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import {
  Search,
  Plus,
  Eye,
  Edit,
  Pause,
  Play,
  MoreHorizontal,
  Users,
  Star,
  Calendar,
  IndianRupee,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Package
} from 'lucide-react';

const MyCampaigns = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const campaigns = [
    {
      id: '1',
      title: 'Wireless Bluetooth Headphones Pro',
      product: 'AudioTech ANC-Pro 3000',
      status: 'active',
      created: '2024-08-01',
      deadline: '2024-08-25',
      budget: 16250,
      spent: 5200,
      reviewsTarget: 25,
      reviewsReceived: 8,
      reviewsApproved: 6,
      reviewsPending: 2,
      applications: 45,
      avgRating: 4.8,
      compensation: 650,
      conversionRate: 17.8,
      performance: 'excellent'
    },
    {
      id: '2',
      title: 'Smart Home LED Light Strips',
      product: 'TechHome Pro RGB-X1',
      status: 'paused',
      created: '2024-07-28',
      deadline: '2024-08-30',
      budget: 11400,
      spent: 1900,
      reviewsTarget: 30,
      reviewsReceived: 5,
      reviewsApproved: 4,
      reviewsPending: 1,
      applications: 23,
      avgRating: 4.5,
      compensation: 380,
      conversionRate: 21.7,
      performance: 'good'
    },
    {
      id: '3',
      title: 'Eco-Friendly Bamboo Kitchen Set',
      product: 'GreenLiving Bamboo Deluxe',
      status: 'completed',
      created: '2024-07-15',
      deadline: '2024-08-10',
      budget: 10400,
      spent: 10400,
      reviewsTarget: 20,
      reviewsReceived: 20,
      reviewsApproved: 18,
      reviewsPending: 0,
      applications: 67,
      avgRating: 4.7,
      compensation: 520,
      conversionRate: 29.9,
      performance: 'excellent'
    },
    {
      id: '4',
      title: 'Premium Yoga Mat Collection',
      product: 'ZenFit Pro Alignment Mat',
      status: 'draft',
      created: '2024-08-13',
      deadline: '2024-09-05',
      budget: 7560,
      spent: 0,
      reviewsTarget: 18,
      reviewsReceived: 0,
      reviewsApproved: 0,
      reviewsPending: 0,
      applications: 0,
      avgRating: 0,
      compensation: 420,
      conversionRate: 0,
      performance: 'new'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return Play;
      case 'paused': return Pause;
      case 'completed': return CheckCircle;
      case 'draft': return Edit;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case 'excellent':
        return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
      case 'good':
        return <Badge className="bg-blue-100 text-blue-800">Good</Badge>;
      case 'average':
        return <Badge className="bg-yellow-100 text-yellow-800">Average</Badge>;
      case 'poor':
        return <Badge className="bg-red-100 text-red-800">Needs Attention</Badge>;
      default:
        return <Badge variant="secondary">New</Badge>;
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.product.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: campaigns.length,
    active: campaigns.filter(c => c.status === 'active').length,
    completed: campaigns.filter(c => c.status === 'completed').length,
    totalSpent: campaigns.reduce((sum, c) => sum + c.spent, 0),
    totalReviews: campaigns.reduce((sum, c) => sum + c.reviewsReceived, 0),
    avgRating: campaigns.filter(c => c.avgRating > 0).reduce((sum, c) => sum + c.avgRating, 0) / campaigns.filter(c => c.avgRating > 0).length || 0
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Campaigns</h1>
            <p className="text-gray-600 mt-1">
              Manage and track your review campaigns
            </p>
          </div>
          <Button asChild>
            <Link to="/collaborations/create">
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-sm text-gray-600">Total Campaigns</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                <p className="text-sm text-gray-600">Active</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">₹{stats.totalSpent.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Spent</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{stats.totalReviews}</p>
                <p className="text-sm text-gray-600">Reviews</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">{stats.avgRating.toFixed(1)}</p>
                <p className="text-sm text-gray-600">Avg Rating</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search campaigns..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Campaigns List */}
        <div className="space-y-4">
          {filteredCampaigns.map((campaign) => {
            const StatusIcon = getStatusIcon(campaign.status);
            const progressPercentage = Math.round((campaign.reviewsReceived / campaign.reviewsTarget) * 100);
            const budgetUsed = Math.round((campaign.spent / campaign.budget) * 100);
            
            return (
              <Card key={campaign.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Campaign Info */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {campaign.title}
                          </h3>
                          <p className="text-sm text-gray-600">{campaign.product}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getPerformanceBadge(campaign.performance)}
                          <Badge className={`${getStatusColor(campaign.status)} flex items-center space-x-1`}>
                            <StatusIcon className="h-3 w-3" />
                            <span className="capitalize">{campaign.status}</span>
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">Created: {new Date(campaign.created).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">Deadline: {new Date(campaign.deadline).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">{campaign.applications} applications</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <IndianRupee className="h-4 w-4 text-green-600" />
                          <span className="text-green-600">₹{campaign.compensation} per review</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress & Stats */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-600">Reviews Progress</span>
                          <span className="font-medium">{campaign.reviewsReceived}/{campaign.reviewsTarget}</span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Approved: {campaign.reviewsApproved}</span>
                          <span>Pending: {campaign.reviewsPending}</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-600">Budget Used</span>
                          <span className="font-medium">₹{campaign.spent.toLocaleString()}/₹{campaign.budget.toLocaleString()}</span>
                        </div>
                        <Progress value={budgetUsed} className="h-2" />
                        <div className="text-xs text-gray-500 mt-1">
                          {budgetUsed}% of budget used
                        </div>
                      </div>

                      {campaign.avgRating > 0 && (
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{campaign.avgRating}</span>
                          <span className="text-xs text-gray-500">avg rating</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-2">
                      <Button size="sm" asChild>
                        <Link to={`/collaborations/${campaign.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Link>
                      </Button>
                      
                      {campaign.status === 'draft' && (
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/collaborations/${campaign.id}/edit`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Campaign
                          </Link>
                        </Button>
                      )}
                      
                      {campaign.status === 'active' && (
                        <Button size="sm" variant="outline">
                          <Pause className="h-4 w-4 mr-2" />
                          Pause
                        </Button>
                      )}
                      
                      {campaign.status === 'paused' && (
                        <Button size="sm" variant="outline">
                          <Play className="h-4 w-4 mr-2" />
                          Resume
                        </Button>
                      )}

                      <Button size="sm" variant="outline" asChild>
                        <Link to={`/collaborations/${campaign.id}/analytics`}>
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Analytics
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredCampaigns.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : "You haven't created any campaigns yet."
                }
              </p>
              {!searchQuery && statusFilter === 'all' && (
                <Button asChild>
                  <Link to="/collaborations/create">Create Your First Campaign</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyCampaigns;