import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import {
	getCollaborationById,
	applyToCollaboration,
	listApplicationsByCreator,
	listApplicationsByBrand,
	approveApplication,
	rejectApplication,
} from '@/services/db';
import { Calendar, IndianRupee, Users, CheckCircle, XCircle } from 'lucide-react';

const CampaignDetails: React.FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { user } = useAuth();
	const [version, setVersion] = useState(0);
	const [rejectReason, setRejectReason] = useState<Record<string, string>>({});

	useEffect(() => {
		const onChange = () => setVersion((v) => v + 1);
		window.addEventListener('collabx-db-updated', onChange as EventListener);
		return () => window.removeEventListener('collabx-db-updated', onChange as EventListener);
	}, []);

	const campaign = useMemo(() => (id ? getCollaborationById(id) : undefined), [id, version]);
	const myApplication = useMemo(() => {
		if (!user || user.role !== 'creator' || !id) return undefined;
		return listApplicationsByCreator(user.id).find((a) => a.collaborationId === id);
	}, [user, id, version]);

	const brandApplications = useMemo(() => {
		if (!user || user.role !== 'brand' || !campaign) return [];
		return listApplicationsByBrand(user.id).filter((a) => a.collaborationId === campaign.id);
	}, [user, campaign, version]);

	if (!campaign) {
		return (
			<DashboardLayout>
				<div className="max-w-3xl mx-auto">
					<Card>
						<CardContent className="p-6">Campaign not found.</CardContent>
					</Card>
				</div>
			</DashboardLayout>
		);
	}

	const handleApply = () => {
		if (!user) return;
		try {
			applyToCollaboration(campaign.id, user);
			navigate('/applications');
		} catch (e) {
			console.error(e);
		}
	};

	const handleApproveApp = (applicationId: string) => {
		approveApplication(applicationId);
	};

	const handleRejectApp = (applicationId: string) => {
		rejectApplication(applicationId, rejectReason[applicationId] || undefined);
		setRejectReason((prev) => ({ ...prev, [applicationId]: '' }));
	};

	return (
		<DashboardLayout>
			<div className="max-w-5xl mx-auto space-y-6">
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl">{campaign.productName}</CardTitle>
						<CardDescription>by {campaign.brandName}</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="flex items-center space-x-2">
								<IndianRupee className="h-4 w-4 text-green-600" />
								<span className="font-medium text-green-700">₹{campaign.compensation}</span>
							</div>
							<div className="flex items-center space-x-2">
								<Users className="h-4 w-4" />
								<span>
									{campaign.creatorsCompleted}/{campaign.creatorsRequired} reviews
								</span>
							</div>
							<div className="flex items-center space-x-2">
								<Calendar className="h-4 w-4" />
								<span>Deadline: {new Date(campaign.deadline).toLocaleDateString()}</span>
							</div>
						</div>

						<Separator />

						<div>
							<h3 className="font-semibold text-gray-900 mb-2">Description</h3>
							<p className="text-gray-700 whitespace-pre-line">{campaign.description}</p>
						</div>

						<div>
							<h3 className="font-semibold text-gray-900 mb-2">Requirements</h3>
							<ul className="list-disc pl-5 space-y-1 text-gray-700">
								{campaign.requirements.map((r, idx) => (
									<li key={idx}>{r}</li>
								))}
							</ul>
						</div>

						{user?.role === 'creator' && (
							<div className="pt-4 border-t">
								{!myApplication && (
									<Button onClick={handleApply} className="w-full md:w-auto">Apply to this Campaign</Button>
								)}
								{myApplication && (
									<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
										<Badge className={`w-fit ${myApplication.status === 'approved' ? 'bg-green-100 text-green-800' : myApplication.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800' }`}>
											{myApplication.status}
										</Badge>
										{myApplication.status === 'approved' ? (
											<Button asChild>
												<Link to={`/content/submit/${campaign.id}`}>Submit Content</Link>
											</Button>
										) : (
											<Button variant="outline" disabled>
												Awaiting brand decision
											</Button>
										)}
									</div>
								)}
							</div>
						)}
					</CardContent>
				</Card>

				{user?.role === 'brand' && (
					<Card>
						<CardHeader>
							<CardTitle>Applications</CardTitle>
							<CardDescription>Review and manage applications for this campaign</CardDescription>
						</CardHeader>
						<CardContent>
							{brandApplications.length === 0 ? (
								<div className="text-gray-600">No applications yet.</div>
							) : (
								<div className="space-y-4">
									{brandApplications.map((app) => (
										<div key={app.id} className="border rounded-lg p-4">
											<div className="flex items-start justify-between">
												<div>
													<div className="font-medium text-gray-900">{app.creatorName}</div>
													<div className="text-sm text-gray-600">Applied {new Date(app.appliedAt).toLocaleString()}</div>
												</div>
												<Badge className={`${app.status === 'approved' ? 'bg-green-100 text-green-800' : app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{app.status}</Badge>
											</div>
											{app.status === 'pending' && (
												<div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
													<Button onClick={() => handleApproveApp(app.id)} className="w-full">
														<CheckCircle className="h-4 w-4 mr-2" /> Approve
													</Button>
													<div className="md:col-span-2 flex gap-2">
														<Input placeholder="Reason (optional)" value={rejectReason[app.id] || ''} onChange={(e) => setRejectReason((prev) => ({ ...prev, [app.id]: e.target.value }))} />
														<Button variant="outline" onClick={() => handleRejectApp(app.id)} className="whitespace-nowrap">
															<XCircle className="h-4 w-4 mr-2" /> Reject
														</Button>
													</div>
												</div>
											)}
										</div>
									))}
								</div>
							)}
						</CardContent>
					</Card>
				)}
			</div>
		</DashboardLayout>
	);
};

export default CampaignDetails;