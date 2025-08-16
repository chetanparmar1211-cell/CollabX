import React, { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { listPendingContentByBrand, approveContent, rejectContent } from '@/services/supabaseCollab';
import { CheckCircle, XCircle, Link as LinkIcon } from 'lucide-react';

const PendingContent: React.FC = () => {
	const { user } = useAuth();
	const [version, setVersion] = useState(0);
	const [rejectionNotes, setRejectionNotes] = useState<Record<string, string>>({});

	useEffect(() => {
		const onChange = () => setVersion((v) => v + 1);
		window.addEventListener('collabx-db-updated', onChange as EventListener);
		return () => window.removeEventListener('collabx-db-updated', onChange as EventListener);
	}, []);

	const pending = useMemo(() => (user?.role === 'brand' ? listPendingContentByBrand(user.id) : []), [user, version]);

	const onApprove = (id: string) => approveContent(id);
	const onReject = (id: string) => rejectContent(id, rejectionNotes[id] || undefined);

	return (
		<DashboardLayout>
			<div className="max-w-5xl mx-auto space-y-6">
				<Card>
					<CardHeader>
						<CardTitle>Pending Content</CardTitle>
						<CardDescription>Review submitted proofs from creators</CardDescription>
					</CardHeader>
					<CardContent>
						{pending.length === 0 ? (
							<div className="text-gray-700">No content awaiting review.</div>
						) : (
							<div className="space-y-4">
								{pending.map((ct) => (
									<div key={ct.id} className="border rounded-lg p-4">
										<div className="flex items-start justify-between mb-2">
											<div>
												<div className="font-medium text-gray-900">{ct.creatorName}</div>
												<div className="text-sm text-gray-600">Campaign: {ct.collaboration?.productName}</div>
											</div>
											<Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
										</div>
										<div className="flex items-center gap-2 text-sm">
											<LinkIcon className="h-4 w-4" />
											<a href={ct.contentUrl} target="_blank" className="text-blue-600 underline">View Content</a>
										</div>
										{ct.screenshot && (
											<div className="mt-2">
												<img src={ct.screenshot} alt="Screenshot" className="w-full max-w-md rounded border" />
											</div>
										)}
										<div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
											<Button onClick={() => onApprove(ct.id)} className="w-full">
												<CheckCircle className="h-4 w-4 mr-2" /> Approve
											</Button>
											<div className="md:col-span-2 flex gap-2">
												<Input placeholder="Notes (optional)" value={rejectionNotes[ct.id] || ''} onChange={(e) => setRejectionNotes((prev) => ({ ...prev, [ct.id]: e.target.value }))} />
												<Button variant="outline" onClick={() => onReject(ct.id)} className="whitespace-nowrap">
													<XCircle className="h-4 w-4 mr-2" /> Reject
												</Button>
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</DashboardLayout>
	);
};

export default PendingContent;