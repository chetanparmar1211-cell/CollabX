import { supabase } from '@/lib/supabase';
import { Application, Collaboration, Content, User } from '@/types';

export async function listActiveCollaborations(): Promise<Collaboration[]> {
	const { data, error } = await supabase.from('collaborations').select('*').eq('status', 'active').order('created_at', { ascending: false });
	if (error) throw error;
	return (data || []) as any;
}

export async function listCollaborationsByBrand(brandId: string): Promise<Collaboration[]> {
	const { data, error } = await supabase.from('collaborations').select('*').eq('brand_id', brandId).order('created_at', { ascending: false });
	if (error) throw error;
	return (data || []) as any;
}

export async function getCollaborationById(id: string): Promise<Collaboration | null> {
	const { data, error } = await supabase.from('collaborations').select('*').eq('id', id).maybeSingle();
	if (error) throw error;
	return (data as any) || null;
}

export async function createCollaboration(brandUser: User, data: Partial<Collaboration> & {
	productName: string;
	productUrl: string;
	description: string;
	requirements: string[];
	category: string;
	creatorsRequired: number;
	collaborationType: Collaboration['collaborationType'];
	deadline: string;
	investment?: number;
}): Promise<Collaboration> {
	const payload = {
		brand_id: brandUser.id,
		brand_name: brandUser.companyName || brandUser.name,
		product_name: data.productName,
		product_url: data.productUrl,
		description: data.description,
		requirements: data.requirements,
		category: data.category,
		creators_required: data.creatorsRequired,
		creators_completed: 0,
		compensation: data.investment ?? 0,
		collaboration_type: data.collaborationType,
		deadline: data.deadline,
		status: 'active',
	};
	const { data: row, error } = await supabase.from('collaborations').insert(payload).select('*').single();
	if (error) throw error;
	return row as any;
}

export async function applyToCollaboration(collaborationId: string, creator: User, message?: string): Promise<Application> {
	const { data, error } = await supabase
		.from('applications')
		.insert({ collaboration_id: collaborationId, creator_id: creator.id, message })
		.select('*')
		.single();
	if (error) throw error;
	return data as any;
}

export async function listApplicationsByCreator(creatorId: string): Promise<Application[]> {
	const { data, error } = await supabase.from('applications').select('*').eq('creator_id', creatorId).order('applied_at', { ascending: false });
	if (error) throw error;
	return (data || []) as any;
}

export async function listApplicationsByBrand(brandId: string): Promise<Application[]> {
	// Select applications for collaborations owned by this brand
	const { data, error } = await supabase
		.from('applications')
		.select('*, collaborations!inner(brand_id)')
		.eq('collaborations.brand_id', brandId)
		.order('applied_at', { ascending: false });
	if (error) throw error;
	return (data || []) as any;
}

export async function approveApplication(applicationId: string): Promise<Application> {
	const { data, error } = await supabase.from('applications').update({ status: 'approved' }).eq('id', applicationId).select('*').single();
	if (error) throw error;
	return data as any;
}

export async function rejectApplication(applicationId: string, reason?: string): Promise<Application> {
	const { data, error } = await supabase.from('applications').update({ status: 'rejected', message: reason || null }).eq('id', applicationId).select('*').single();
	if (error) throw error;
	return data as any;
}

export async function submitContent(params: { collaborationId: string; creator: User; contentUrl: string; screenshot?: string; notes?: string; }): Promise<Content> {
	const { data, error } = await supabase
		.from('contents')
		.insert({ collaboration_id: params.collaborationId, creator_id: params.creator.id, content_url: params.contentUrl, screenshot_url: params.screenshot || null, notes: params.notes || null })
		.select('*')
		.single();
	if (error) throw error;
	return data as any;
}

export async function listPendingContentByBrand(brandId: string): Promise<Array<Content & { collaboration?: Collaboration }>> {
	const { data, error } = await supabase
		.from('contents')
		.select('*, collaborations!inner(*)')
		.eq('collaborations.brand_id', brandId)
		.eq('status', 'pending')
		.order('submitted_at', { ascending: false });
	if (error) throw error;
	return (data || []) as any;
}

export async function approveContent(contentId: string): Promise<Content> {
	const { data, error } = await supabase.from('contents').update({ status: 'approved', verified_at: new Date().toISOString() }).eq('id', contentId).select('*').single();
	if (error) throw error;
	return data as any;
}

export async function rejectContent(contentId: string, notes?: string): Promise<Content> {
	const { data, error } = await supabase.from('contents').update({ status: 'rejected', verified_at: new Date().toISOString(), notes: notes || null }).eq('id', contentId).select('*').single();
	if (error) throw error;
	return data as any;
}