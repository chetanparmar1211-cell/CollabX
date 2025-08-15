import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import {
  Search,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  IndianRupee,
  MessageSquare,
  FileText,
  Package,
  ArrowRight,
  RefreshCw,
  Eye
} from 'lucide-react';

const ApplicationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const applications = [
    {
      id: '1',
      campaignId: 'camp_001',
      campaignTitle: 'Wireless Bluetooth Headphones Pro',
      brand: 'AudioTech Solutions',
      appliedDate: '2024-08-10',
      status: 'approved',
      compensation: 650,
      deadline: '2024-08-25',
      reviewDeadline: '2024-08-20',
      requirements: ['Must be 18+', 'Amazon Prime member', 'Include unboxing photos'],
      message: 'Congratulations! Your application has been approved. Please complete your review by August 20th.',
      nextAction: 'submit_review',
      progress: 75
    },
    {
      id: '2',
      campaignId: 'camp_002',
      campaignTitle: 'Organic Protein Powder - Vanilla',
      brand: 'HealthyLife Nutrition',
      appliedDate: '2024-08-12',
      status: 'pending',
      compensation: 450,
      deadline: '2024-08-20',
      reviewDeadline: null,
      requirements: ['Fitness enthusiast', 'Regular gym goer', 'Post workout photos'],
      message: 'Your application is under review. We will notify you within 24-48 hours.',
      nextAction: 'wait',
      progress: 25
    },
    {
      id: '3',
      campaignId: 'camp_003',
      campaignTitle: 'Smart Home LED Light Strips',
      brand: 'TechHome Pro',
      appliedDate: '2024-08-08',
      status: 'completed',
      compensation: 380,
      deadline: '2024-08-30',
      reviewDeadline: '2024-08-15',
      requirements: ['Tech-savvy', 'Smart home setup', 'Installation photos required'],
      message: 'Campaign completed successfully! Payment has been processed.',
      nextAction: 'none',
      progress: 100
    },
    {
      id: '4',
      campaignId: 'camp_004',
      campaignTitle: 'Premium Yoga Mat with Alignment',
      brand: 'ZenFit Studio',
      appliedDate: '2024-08-13',
      status: 'rejected',
      compensation: 420,
      deadline: '2024-08-18',
      reviewDeadline: null,
      requirements: ['Regular yoga practice', 'Social media presence', 'Video review preferred'],
      message: 'Unfortunately, your application was not selected. The brand was looking for reviewers with more social media presence.',
      nextAction: 'none',
      progress: 0
    },
    {
      id: '5',
      campaignId: 'camp_005',
      campaignTitle: 'Eco-Friendly Bamboo Kitchen Set',
      brand: 'Green Living Co',
      appliedDate: '2024-08-11',
      status: 'review_submitted',
      compensation: 520,
      deadline: '2024-09-05',
      reviewDeadline: '2024-08-25',
      requirements: ['Eco-conscious lifestyle', 'Cooking enthusiast', 'Usage photos required'],
      message: 'Review submitted successfully! It is currently under verification by the brand.',
      nextAction: 'wait_verification',
      progress: 85
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return CheckCircle;
      case 'pending': return Clock;
      case 'rejected': return XCircle;
      case 'completed': return CheckCircle;
      case 'review_submitted': return FileText;
      case 'revision_required': return AlertCircle;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'review_submitted': return 'bg-purple-100 text-purple-800';
      case 'revision_required': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Approved';
      case 'pending': return 'Pending';
      case 'rejected': return 'Rejected';
      case 'completed': return 'Completed';
      case 'review_submitted': return 'Review Submitted';
      case 'revision_required': return 'Revision Required';
      default: return status;
    }
  };

  const getNextActionButton = (application: any) => {
    switch (application.nextAction) {
      case 'submit_review':
        return (
          <Button size="sm" asChild>
            <Link to={`/reviews/submit/${application.campaignId}`}>
              Submit Review
            </Link>
          </Button>
        );
      case 'revise_review':
        return (
          <Button size="sm" variant="outline" asChild>
            <Link to={`/reviews/edit/${application.campaignId}`}>
              Revise Review
            </Link>
          </Button>
        );
      case 'wait':
      case 'wait_verification':
        return (
          <Button size="sm" variant="outline" disabled>
            <RefreshCw className="h-4 w-4 mr-2" />
            Waiting
          </Button>
        );
      default:
        return (
          <Button size="sm" variant="outline" asChild>
            <Link to={`/campaigns/${application.campaignId}`}>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Link>
          </Button>
        );
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.campaignTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    approved: applications.filter(app => app.status === 'approved').length,
    completed: applications.filter(app => app.status === 'completed').length,
    totalEarnings: applications
      .filter(app => app.status === 'completed')
      .reduce((sum, app) => sum + app.compensation, 0)
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
            <p className="text-gray-600 mt-1">
              Track your campaign applications and review progress
            </p>
          </div>
          <Button asChild>
            <Link to="/campaigns/browse">Browse More Campaigns</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-sm text-gray-600">Total Applications</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                <p className="text-sm text-gray-600">Approved</p>
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
                <p className="text-2xl font-bold text-green-600">₹{stats.totalEarnings}</p>
                <p className="text-sm text-gray-600">Total Earned</p>
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
                    placeholder="Search applications..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="review_submitted">Review Submitted</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.map((application) => {
            const StatusIcon = getStatusIcon(application.status);
            
            return (
              <Card key={application.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {application.campaignTitle}
                          </h3>
                          <p className="text-sm text-gray-600">{application.brand}</p>
                        </div>
                        <Badge className={`${getStatusColor(application.status)} flex items-center space-x-1`}>
                          <StatusIcon className="h-3 w-3" />
                          <span>{getStatusText(application.status)}</span>
                        </Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Applied: {new Date(application.appliedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <IndianRupee className="h-4 w-4 text-green-600" />
                          <span className="text-green-600 font-medium">₹{application.compensation}</span>
                        </div>
                        {application.reviewDeadline && (
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4 text-orange-500" />
                            <span>Review by: {new Date(application.reviewDeadline).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>

                      {application.status !== 'rejected' && application.status !== 'completed' && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{application.progress}%</span>
                          </div>
                          <Progress value={application.progress} className="h-2" />
                        </div>
                      )}

                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <MessageSquare className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700">{application.message}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 lg:ml-6">
                      {getNextActionButton(application)}
                      <Button size="sm" variant="outline" asChild>
                        <Link to={`/campaigns/${application.campaignId}`}>
                          View Campaign
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredApplications.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : "You haven't applied to any campaigns yet."
                }
              </p>
              {!searchQuery && statusFilter === 'all' && (
                <Button asChild>
                  <Link to="/campaigns/browse">Browse Campaigns</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ApplicationsPage;