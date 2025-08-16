import { Application, Collaboration, Content, User } from '@/types';

const DB_KEY = 'collabx_db_v1';

interface LocalDb {
	collaborations: Collaboration[];
	applications: Application[];
	contents: Content[];
}

function generateId(prefix: string = 'id'): string {
	return `${prefix}_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}

function nowIso(): string {
	return new Date().toISOString();
}

function loadDb(): LocalDb {
	const raw = localStorage.getItem(DB_KEY);
	if (raw) {
		try {
			return JSON.parse(raw) as LocalDb;
		} catch {}
	}
	const seeded: LocalDb = seedDb();
	saveDb(seeded);
	return seeded;
}

function saveDb(db: LocalDb) {
	localStorage.setItem(DB_KEY, JSON.stringify(db));
	window.dispatchEvent(new CustomEvent('collabx-db-updated'));
}

function seedDb(): LocalDb {
	const sampleBrandId = 'brand_seed_1';
	const collab1: Collaboration = {
		id: generateId('collab'),
		brandId: sampleBrandId,
		brandName: 'AudioTech Solutions',
		productName: 'Wireless Bluetooth Headphones Pro',
		productUrl: 'https://example.com/headphones',
		productImages: [],
		creatorsRequired: 25,
		creatorsCompleted: 8,
		compensation: 650,
		collaborationType: 'product_sample',
		deadline: new Date(Date.now() + 9 * 24 * 3600 * 1000).toISOString(),
		status: 'active',
		description: 'Premium wireless headphones with ANC. Honest reviews from audio enthusiasts desired.',
		requirements: ['Must be 18+', 'Amazon Prime member', 'Include unboxing photos'],
		category: 'Electronics',
		createdAt: nowIso(),
		updatedAt: nowIso(),
	};
	const collab2: Collaboration = {
		id: generateId('collab'),
		brandId: sampleBrandId,
		brandName: 'HealthyLife Nutrition',
		productName: 'Organic Protein Powder - Vanilla',
		productUrl: 'https://example.com/protein',
		productImages: [],
		creatorsRequired: 15,
		creatorsCompleted: 12,
		compensation: 450,
		collaborationType: 'product_sample',
		deadline: new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString(),
		status: 'active',
		description: 'Natural protein powder made from organic ingredients. Perfect for fitness enthusiasts.',
		requirements: ['Fitness enthusiast', 'Regular gym goer', 'Post workout photos'],
		category: 'Health',
		createdAt: nowIso(),
		updatedAt: nowIso(),
	};
	return {
		collaborations: [collab1, collab2],
		applications: [],
		contents: [],
	};
}

// Collaborations
export function listCollaborations(): Collaboration[] {
	return loadDb().collaborations;
}

export function listActiveCollaborations(): Collaboration[] {
	return loadDb().collaborations.filter((c) => c.status === 'active');
}

export function listCollaborationsByBrand(brandId: string): Collaboration[] {
	return loadDb().collaborations.filter((c) => c.brandId === brandId);
}

export function getCollaborationById(id: string): Collaboration | undefined {
	return loadDb().collaborations.find((c) => c.id === id);
}

export function createCollaboration(brandUser: User, data: Partial<Collaboration> & {
	productName: string;
	productUrl: string;
	description: string;
	requirements: string[];
	category: string;
	creatorsRequired: number;
	collaborationType: Collaboration['collaborationType'];
	deadline: string; // ISO date string
	investment?: number; // per creator compensation
	productImages?: string[];
}): Collaboration {
	const db = loadDb();
	const newCollab: Collaboration = {
		id: generateId('collab'),
		brandId: brandUser.id,
		brandName: brandUser.companyName || brandUser.name,
		productName: data.productName,
		productUrl: data.productUrl,
		productImages: data.productImages || [],
		creatorsRequired: data.creatorsRequired,
		creatorsCompleted: 0,
		compensation: data.investment ?? 0,
		collaborationType: data.collaborationType,
		deadline: data.deadline,
		status: 'active',
		description: data.description,
		requirements: data.requirements,
		category: data.category,
		createdAt: nowIso(),
		updatedAt: nowIso(),
	};
	db.collaborations.unshift(newCollab);
	saveDb(db);
	return newCollab;
}

// Applications
export function applyToCollaboration(collaborationId: string, creator: User, message?: string): Application {
	const db = loadDb();
	const existing = db.applications.find((a) => a.collaborationId === collaborationId && a.creatorId === creator.id);
	if (existing) return existing;

	const collab = db.collaborations.find((c) => c.id === collaborationId);
	if (!collab) throw new Error('Collaboration not found');

	const app: Application = {
		id: generateId('app'),
		collaborationId,
		creatorId: creator.id,
		creatorName: creator.name,
		creatorRating: creator.rating ?? 0,
		status: 'pending',
		appliedAt: nowIso(),
		message,
	};
	db.applications.unshift(app);
	saveDb(db);
	return app;
}

export function listApplicationsByCreator(creatorId: string): Application[] {
	const db = loadDb();
	return db.applications.filter((a) => a.creatorId === creatorId);
}

export function listApplicationsByBrand(brandId: string): Application[] {
	const db = loadDb();
	const brandCollabIds = new Set(db.collaborations.filter((c) => c.brandId === brandId).map((c) => c.id));
	return db.applications.filter((a) => brandCollabIds.has(a.collaborationId));
}

export function approveApplication(applicationId: string): Application {
	const db = loadDb();
	const app = db.applications.find((a) => a.id === applicationId);
	if (!app) throw new Error('Application not found');
	app.status = 'approved';
	saveDb(db);
	return app;
}

export function rejectApplication(applicationId: string, reason?: string): Application {
	const db = loadDb();
	const app = db.applications.find((a) => a.id === applicationId);
	if (!app) throw new Error('Application not found');
	app.status = 'rejected';
	app.message = reason || 'Application was not selected.';
	saveDb(db);
	return app;
}

// Content submissions
export function submitContent(params: {
	collaborationId: string;
	creator: User;
	contentUrl: string;
	screenshot?: string;
	notes?: string;
}): Content {
	const db = loadDb();
	const collab = db.collaborations.find((c) => c.id === params.collaborationId);
	if (!collab) throw new Error('Collaboration not found');

	const content: Content = {
		id: generateId('content'),
		collaborationId: params.collaborationId,
		creatorId: params.creator.id,
		creatorName: params.creator.name,
		contentUrl: params.contentUrl,
		screenshot: params.screenshot || '',
		status: 'pending',
		submittedAt: nowIso(),
		notes: params.notes,
	};
	db.contents.unshift(content);

	// Update creator application progress state
	const app = db.applications.find((a) => a.collaborationId === params.collaborationId && a.creatorId === params.creator.id);
	if (app && app.status === 'approved') {
		app.message = 'Review submitted. Awaiting brand verification.';
	}

	saveDb(db);
	return content;
}

export function listPendingContentByBrand(brandId: string): Array<Content & { collaboration?: Collaboration }>
{
	const db = loadDb();
	const brandCollabIds = new Set(db.collaborations.filter((c) => c.brandId === brandId).map((c) => c.id));
	return db.contents
		.filter((ct) => brandCollabIds.has(ct.collaborationId) && ct.status === 'pending')
		.map((ct) => ({ ...ct, collaboration: db.collaborations.find((c) => c.id === ct.collaborationId) }));
}

export function listApprovedApplicationsForCreatorPendingSubmission(creatorId: string): Array<Application & { collaboration?: Collaboration }>
{
	const db = loadDb();
	return db.applications
		.filter((a) => a.creatorId === creatorId && a.status === 'approved')
		.map((a) => ({ ...a, collaboration: db.collaborations.find((c) => c.id === a.collaborationId) }));
}

export function approveContent(contentId: string): Content {
	const db = loadDb();
	const ct = db.contents.find((c) => c.id === contentId);
	if (!ct) throw new Error('Content not found');
	ct.status = 'approved';
	ct.verifiedAt = nowIso();

	// Update collaboration counters
	const collab = db.collaborations.find((c) => c.id === ct.collaborationId);
	if (collab) {
		collab.creatorsCompleted = Math.min(collab.creatorsCompleted + 1, collab.creatorsRequired);
		collab.updatedAt = nowIso();
	}

	// Mark related application as completed
	const app = db.applications.find((a) => a.collaborationId === ct.collaborationId && a.creatorId === ct.creatorId);
	if (app) {
		app.status = 'approved'; // keep approved for application, completion shown via content
		app.message = 'Content approved. Payment will be processed shortly.';
	}

	saveDb(db);
	return ct;
}

export function rejectContent(contentId: string, notes?: string): Content {
	const db = loadDb();
	const ct = db.contents.find((c) => c.id === contentId);
	if (!ct) throw new Error('Content not found');
	ct.status = 'rejected';
	ct.notes = notes || 'Content needs revisions. Please update and resubmit.';
	ct.verifiedAt = nowIso();

	// Update related application message
	const app = db.applications.find((a) => a.collaborationId === ct.collaborationId && a.creatorId === ct.creatorId);
	if (app) {
		app.message = 'Revision required. Please update your submission.';
	}

	saveDb(db);
	return ct;
}

export function listContentsByCreator(creatorId: string): Content[] {
	return loadDb().contents.filter((c) => c.creatorId === creatorId);
}

export function resetDb() {
	localStorage.removeItem(DB_KEY);
	const seeded = seedDb();
	saveDb(seeded);
}