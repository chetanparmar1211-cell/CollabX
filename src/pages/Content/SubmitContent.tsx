import React, { useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { getCollaborationById, submitContent, listApplicationsByCreator } from '@/services/db';

const SubmitContent: React.FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { user } = useAuth();
	const [contentUrl, setContentUrl] = useState('');
	const [screenshot, setScreenshot] = useState('');
	const [notes, setNotes] = useState('');
	const [error, setError] = useState('');

	const campaign = useMemo(() => (id ? getCollaborationById(id) : undefined), [id]);
	const myApp = useMemo(() => {
		if (!user || !id) return undefined;
		return listApplicationsByCreator(user.id).find((a) => a.collaborationId === id);
	}, [user, id]);

	if (!campaign) {
		return (
			<DashboardLayout>
				<div className="max-w-xl mx-auto">
					<Card>
						<CardContent className="p-6">Campaign not found.</CardContent>
					</Card>
				</div>
			</DashboardLayout>
		);
	}

	const canSubmit = user && myApp && myApp.status === 'approved';

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		if (!user || !id) return;
		if (!contentUrl.trim()) {
			setError('Content URL is required');
			return;
		}
		submitContent({ collaborationId: id, creator: user, contentUrl, screenshot, notes });
		navigate('/dashboard');
	};

	return (
		<DashboardLayout>
			<div className="max-w-2xl mx-auto space-y-6">
				<Card>
					<CardHeader>
						<CardTitle>Submit Content</CardTitle>
						<CardDescription>
							Submit proof for <span className="font-medium">{campaign.productName}</span>
						</CardDescription>
					</CardHeader>
					<CardContent>
						{!canSubmit ? (
							<div className="text-gray-700">
								Your application is not approved yet. Please wait for brand approval.
							</div>
						) : (
							<form onSubmit={onSubmit} className="space-y-4">
								<div>
									<label className="text-sm font-medium text-gray-700">Content URL *</label>
									<Input placeholder="https://..." value={contentUrl} onChange={(e) => setContentUrl(e.target.value)} />
									{error && <div className="text-sm text-red-600 mt-1">{error}</div>}
								</div>
								<div>
									<label className="text-sm font-medium text-gray-700">Screenshot URL</label>
									<Input placeholder="https://... (optional)" value={screenshot} onChange={(e) => setScreenshot(e.target.value)} />
								</div>
								<div>
									<label className="text-sm font-medium text-gray-700">Notes</label>
									<Textarea rows={4} placeholder="Add any additional notes for the brand (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} />
								</div>
								<div className="flex justify-end">
									<Button type="submit">Submit</Button>
								</div>
							</form>
						)}
					</CardContent>
				</Card>
			</div>
		</DashboardLayout>
	);
};

export default SubmitContent;