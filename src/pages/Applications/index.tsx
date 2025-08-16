import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
import { useAuth } from '@/contexts/AuthContext';
import { listApplicationsByCreator } from '@/services/supabaseCollab';

const ApplicationsPage = () => {
	const { user } = useAuth();
	const [searchQuery, setSearchQuery] = useState('');
	const [statusFilter, setStatusFilter] = useState('all');
	const [version, setVersion] = useState(0);

	useEffect(() => {
		const onChange = () => setVersion((v) => v + 1);
		window.addEventListener('collabx-db-updated', onChange as EventListener);
		return () => window.removeEventListener('collabx-db-updated', onChange as EventListener);
	}, []);

	const applications = useMemo(() => (user ? listApplicationsByCreator(user.id) : []), [user, version]);

	const getStatusIcon = (status: string) => {
		switch (status) {
			case 'approved':
				return CheckCircle;
			case 'pending':
				return Clock;
			case 'rejected':
				return XCircle;
			default:
				return Clock;
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'approved':
				return 'bg-green-100 text-green-800';
			case 'pending':
				return 'bg-yellow-100 text-yellow-800';
			case 'rejected':
				return 'bg-red-100 text-red-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	const getStatusText = (status: string) => {
		switch (status) {
			case 'approved':
				return 'Approved';
			case 'pending':
				return 'Pending';
			case 'rejected':
				return 'Rejected';
			default:
				return status;
		}
	};

	const filteredApplications = applications.filter((app) => {
		const matchesSearch = app.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) || app.collaborationId.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
		return matchesSearch && matchesStatus;
	});

	const stats = {
		total: applications.length,
		pending: applications.filter((app) => app.status === 'pending').length,
		approved: applications.filter((app) => app.status === 'approved').length,
		completed: 0,
		totalEarnings: 0,
	};

	return (
		<DashboardLayout>
			<div className="space-y-6">
				{/* Header */}
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
						<p className="text-gray-600 mt-1">Track your campaign applications and review progress</p>
					</div>
					<Button asChild>
						<Link to="/collaborations/browse">Browse More Campaigns</Link>
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
									<Input placeholder="Search applications..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
								</div>
							</div>
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
													<h3 className="font-semibold text-gray-900 mb-1">{application.collaborationId}</h3>
													<p className="text-sm text-gray-600">Creator: {application.creatorName}</p>
												</div>
												<Badge className={`${getStatusColor(application.status)} flex items-center space-x-1`}>
													<StatusIcon className="h-3 w-3" />
													<span>{getStatusText(application.status)}</span>
												</Badge>
											</div>
											<div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
												<div className="flex items-center space-x-1">
													<Calendar className="h-4 w-4" />
													<span>Applied: {new Date(application.appliedAt).toLocaleDateString()}</span>
												</div>
											</div>
											<div className="bg-gray-50 p-3 rounded-lg">
												<div className="flex items-start space-x-2">
													<MessageSquare className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
													<p className="text-sm text-gray-700">{application.message || 'Application submitted'}</p>
												</div>
											</div>
										</div>
										<div className="flex flex-col space-y-2 lg:ml-6">
											<Button size="sm" variant="outline" asChild>
												<Link to={`/collaborations/${application.collaborationId}`}>
													<Eye className="h-4 w-4 mr-2" />View Campaign
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
							<p className="text-gray-600 mb-4">{searchQuery || statusFilter !== 'all' ? 'Try adjusting your search or filter criteria.' : "You haven't applied to any campaigns yet."}</p>
							{!searchQuery && statusFilter === 'all' && (
								<Button asChild>
									<Link to="/collaborations/browse">Browse Campaigns</Link>
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