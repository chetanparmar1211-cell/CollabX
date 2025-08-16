import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { listActiveCollaborations, applyToCollaboration } from '@/services/supabaseCollab';
import {
	Search,
	Star,
	Clock,
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
	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [sortBy, setSortBy] = useState('latest');
	const [version, setVersion] = useState(0);

	useEffect(() => {
		const onChange = () => setVersion((v) => v + 1);
		window.addEventListener('collabx-db-updated', onChange as EventListener);
		return () => window.removeEventListener('collabx-db-updated', onChange as EventListener);
	}, []);

	const campaigns = useMemo(() => listActiveCollaborations(), [version]);

	const categories = useMemo(() => {
		const set = new Set<string>();
		campaigns.forEach((c) => set.add(c.category));
		return Array.from(set).sort();
	}, [campaigns]);

	const getStatusBadge = (status: string) => {
		switch (status) {
			case 'active':
				return <Badge className="bg-green-100 text-green-800">Active</Badge>;
			case 'paused':
				return <Badge className="bg-yellow-100 text-yellow-800">Paused</Badge>;
			case 'completed':
				return <Badge className="bg-gray-100 text-gray-800">Completed</Badge>;
			default:
				return <Badge variant="secondary">{status}</Badge>;
		}
	};

	const filteredCampaigns = campaigns.filter((campaign) => {
		const matchesSearch = campaign.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
			campaign.brandName.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesCategory = selectedCategory === 'all' || campaign.category.toLowerCase() === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	const onApply = (campaignId: string) => {
		if (user?.role === 'brand') {
			navigate(`/collaborations/${campaignId}`);
			return;
		}
		if (!user) return;
		try {
			applyToCollaboration(campaignId, user);
			navigate('/applications');
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<DashboardLayout>
			<div className="space-y-6">
				{/* Header */}
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">Browse Campaigns</h1>
						<p className="text-gray-600 mt-1">Discover exciting review opportunities from top brands</p>
					</div>
					<div className="flex space-x-3">
						<Button variant="outline" asChild>
							<Link to="/applications">My Applications</Link>
						</Button>
					</div>
				</div>

				{/* Search and Filters */}
				<Card>
					<CardContent className="p-6">
						<div className="flex flex-col lg:flex-row gap-4">
							<div className="flex-1">
								<div className="relative">
									<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
									<Input placeholder="Search campaigns or brands..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
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
											<SelectItem key={category} value={category.toLowerCase()}>{category}</SelectItem>
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
							</div>
							<CardContent className="p-6">
								<div className="flex items-start justify-between mb-3">
									<div className="flex-1">
										<h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{campaign.productName}</h3>
										<p className="text-sm text-gray-600">{campaign.brandName}</p>
									</div>
									{getStatusBadge(campaign.status)}
								</div>
								<p className="text-sm text-gray-600 mb-4 line-clamp-2">{campaign.description}</p>
								<div className="space-y-3">
									<div className="flex items-center justify-between text-sm">
										<div className="flex items-center space-x-1">
											<IndianRupee className="h-4 w-4 text-green-600" />
											<span className="font-semibold text-green-600">₹{campaign.compensation}</span>
										</div>
										<div className="flex items-center space-x-1">
											<Users className="h-4 w-4" />
											<span>
												{campaign.creatorsCompleted}/{campaign.creatorsRequired} reviews
											</span>
										</div>
									</div>
									<div className="flex items-center justify-between text-sm text-gray-600">
										<div className="flex items-center space-x-1">
											<Calendar className="h-4 w-4" />
											<span>{new Date(campaign.deadline).toLocaleDateString()}</span>
										</div>
									</div>
								</div>
								<div className="mt-4 pt-4 border-t grid grid-cols-2 gap-2">
									<Button variant="outline" className="w-full" asChild>
										<Link to={`/collaborations/${campaign.id}`}>View</Link>
									</Button>
									<Button className="w-full group-hover:bg-blue-600 transition-colors" onClick={() => onApply(campaign.id)}>
										Apply Now
										<ChevronRight className="ml-2 h-4 w-4" />
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
							<p className="text-gray-600">Try adjusting your search or filter criteria to find more campaigns.</p>
						</CardContent>
					</Card>
				)}
			</div>
		</DashboardLayout>
	);
};

export default BrowseCampaigns;