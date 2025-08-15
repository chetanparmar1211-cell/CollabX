import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import {
  Search,
  Filter,
  Star,
  Clock,
  MapPin,
  IndianRupee,
  Users,
  Calendar,
  Package,
  ChevronRight,
  Heart,
  Share2
} from 'lucide-react';

const BrowseCampaigns = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  const campaigns = [
    {
      id: '1',
      title: 'Wireless Bluetooth Headphones Pro',
      brand: 'AudioTech Solutions',
      category: 'Electronics',
      image: '/api/placeholder/300/200',
      compensation: 650,
      compensationType: 'cash',
      reviewsNeeded: 25,
      reviewsCompleted: 8,
      deadline: '2024-08-25',
      rating: 4.8,
      location: 'India',
      description: 'Premium wireless headphones with active noise cancellation. Looking for honest reviews from audio enthusiasts.',
      requirements: ['Must be 18+', 'Amazon Prime member', 'Include unboxing photos'],
      tags: ['Electronics', 'Audio', 'Wireless'],
      status: 'active',
      featured: true
    },
    {
      id: '2',
      title: 'Organic Protein Powder - Vanilla',
      brand: 'HealthyLife Nutrition',
      category: 'Health',
      image: '/api/placeholder/300/200',
      compensation: 450,
      compensationType: 'refund',
      reviewsNeeded: 15,
      reviewsCompleted: 12,
      deadline: '2024-08-20',
      rating: 4.6,
      location: 'India',
      description: 'Natural protein powder made from organic ingredients. Perfect for fitness enthusiasts.',
      requirements: ['Fitness enthusiast', 'Regular gym goer', 'Post workout photos'],
      tags: ['Health', 'Nutrition', 'Organic'],
      status: 'active',
      featured: false
    },
    {
      id: '3',
      title: 'Smart Home LED Light Strips',
      brand: 'TechHome Pro',
      category: 'Electronics',
      image: '/api/placeholder/300/200',
      compensation: 380,
      compensationType: 'cash',
      reviewsNeeded: 30,
      reviewsCompleted: 5,
      deadline: '2024-08-30',
      rating: 4.5,
      location: 'India',
      description: 'WiFi-enabled LED strips with app control and voice commands. Great for home automation.',
      requirements: ['Tech-savvy', 'Smart home setup', 'Installation photos required'],
      tags: ['Electronics', 'Smart Home', 'LED'],
      status: 'active',
      featured: false
    }
  ];

  const categories = [
    'Electronics', 'Health', 'Home & Garden', 'Sports', 'Fashion', 
    'Beauty', 'Books', 'Toys', 'Automotive', 'Kitchen'
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'ending_soon':
        return <Badge className="bg-yellow-100 text-yellow-800">Ending Soon</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-800">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getCompensationDisplay = (amount: number, type: string) => {
    const baseAmount = `₹${amount}`;
    switch (type) {
      case 'cash':
        return `${baseAmount} Cash`;
      case 'refund':
        return `${baseAmount} Refund`;
      case 'both':
        return `${baseAmount} Cash + Refund`;
      default:
        return baseAmount;
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || campaign.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Browse Campaigns</h1>
            <p className="text-gray-600 mt-1">
              Discover exciting review opportunities from top brands
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" asChild>
              <Link to="/applications">My Applications</Link>
            </Button>
            {user?.role === 'brand' && (
              <Button asChild>
                <Link to="/campaigns/create">Create Campaign</Link>
              </Button>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search campaigns or brands..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Latest</SelectItem>
                    <SelectItem value="compensation_high">Highest Pay</SelectItem>
                    <SelectItem value="compensation_low">Lowest Pay</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <Card key={campaign.id} className="hover:shadow-lg transition-shadow group">
              <div className="relative">
                <div className="aspect-video bg-gray-100 rounded-t-lg flex items-center justify-center">
                  <Package className="h-12 w-12 text-gray-400" />
                </div>
                {campaign.featured && (
                  <Badge className="absolute top-3 left-3 bg-yellow-500 text-white">
                    Featured
                  </Badge>
                )}
                <div className="absolute top-3 right-3 flex space-x-2">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                      {campaign.title}
                    </h3>
                    <p className="text-sm text-gray-600">{campaign.brand}</p>
                  </div>
                  {getStatusBadge(campaign.status)}
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {campaign.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <IndianRupee className="h-4 w-4 text-green-600" />
                      <span className="font-semibold text-green-600">
                        {getCompensationDisplay(campaign.compensation, campaign.compensationType)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{campaign.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{campaign.reviewsCompleted}/{campaign.reviewsNeeded} reviews</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(campaign.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {campaign.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {campaign.tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{campaign.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <Button className="w-full group-hover:bg-blue-600 transition-colors" asChild>
                    <Link to={`/campaigns/${campaign.id}`} className="flex items-center justify-center">
                      Apply Now
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria to find more campaigns.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BrowseCampaigns;