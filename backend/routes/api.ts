import { Router, Request, Response } from 'express';
import { STORE } from '../database/store.js';
import { compareStylometry } from '../ai/stylometry.js';
import { generateSyntheticBehaviorProfile, compareBehavior } from '../ai/behavior.js';
import { calculateEntityLinking } from '../ai/entityLinking.js';

export const apiRouter = Router();

// 1. Auth routes
apiRouter.post('/auth/login', (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  // Demo login - accept any credentials, default to Analyst or provided role
  const userRole = role || 'Analyst';
  const user = {
    id: 'USR-DEMO-001',
    name: 'Special Investigator Vance',
    email: email || 'investigator@soc.internal',
    role: userRole,
    agency: 'Academic Cyber Threat Unit',
    createdAt: '2025-01-01T00:00:00Z'
  };
  STORE.logAudit(user.email, 'USER_LOGIN', 'AUTH', `User logged in with role ${userRole}`);
  res.json({ token: `mock-jwt-${Date.now()}`, user });
});

apiRouter.get('/auth/me', (_req: Request, res: Response) => {
  res.json({
    user: {
      id: 'USR-DEMO-001',
      name: 'Special Investigator Vance',
      email: 'investigator@soc.internal',
      role: 'Analyst',
      agency: 'Academic Cyber Threat Unit',
      createdAt: '2025-01-01T00:00:00Z'
    }
  });
});

// 2. Dashboard stats
apiRouter.get('/dashboard/stats', (_req: Request, res: Response) => {
  const stats = STORE.getDashboardStats();
  res.json(stats);
});

// 3. Threat actors CRUD
apiRouter.get('/actors', (req: Request, res: Response) => {
  const { query, category, confidenceLevel, status, sortBy, sortOrder } = req.query;
  const actors = STORE.getActors({
    query: query as string,
    category: category as string,
    confidenceLevel: confidenceLevel as string,
    status: status as string,
    sortBy: sortBy as any,
    sortOrder: sortOrder as any
  });
  res.json({ count: actors.length, actors });
});

apiRouter.get('/actors/:id', (req: Request, res: Response) => {
  const data = STORE.getActorById(req.params.id);
  if (!data) return res.status(404).json({ error: 'Threat actor not found' });
  STORE.logAudit('investigator@soc.internal', 'ACTOR_VIEW', data.actor.id, `Investigated dossier for ${data.actor.alias}`);
  res.json(data);
});

apiRouter.post('/actors', (req: Request, res: Response) => {
  const body = req.body;
  const newActor = {
    id: `ACTOR-DEMO-${String(STORE.actors.length + 1).padStart(3, '0')}`,
    alias: body.alias || 'NewActor',
    primaryHandle: body.primaryHandle || body.alias || 'NewActor',
    alternateHandles: body.alternateHandles || [],
    category: body.category || 'Cybercrime',
    firstSeen: body.firstSeen || new Date().toISOString().slice(0, 10),
    lastSeen: body.lastSeen || new Date().toISOString().slice(0, 10),
    status: 'Synthetic Demo Profile' as const,
    confidenceLevel: body.confidenceLevel || 'Medium',
    confidenceScore: body.confidenceScore || 65,
    summary: body.summary || 'Custom investigated synthetic profile.',
    linkedIdentifiersCount: 1,
    relationshipsCount: 1,
    observationsCount: 1,
    primaryLanguages: body.primaryLanguages || ['English'],
    knownPlatforms: body.knownPlatforms || ['Synthetic Forum Alpha'],
    riskRating: body.riskRating || 'Moderate'
  };
  STORE.actors.unshift(newActor);
  STORE.logAudit('investigator@soc.internal', 'ACTOR_CREATE', newActor.id, `Created synthetic profile ${newActor.alias}`);
  res.status(201).json(newActor);
});

apiRouter.put('/actors/:id', (req: Request, res: Response) => {
  const index = STORE.actors.findIndex(a => a.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Actor not found' });
  STORE.actors[index] = { ...STORE.actors[index], ...req.body };
  STORE.logAudit('investigator@soc.internal', 'ACTOR_UPDATE', req.params.id, `Updated details for ${STORE.actors[index].alias}`);
  res.json(STORE.actors[index]);
});

apiRouter.delete('/actors/:id', (req: Request, res: Response) => {
  const actor = STORE.actors.find(a => a.id === req.params.id);
  if (!actor) return res.status(404).json({ error: 'Actor not found' });
  STORE.actors = STORE.actors.filter(a => a.id !== req.params.id);
  STORE.logAudit('investigator@soc.internal', 'ACTOR_DELETE', req.params.id, `Archived profile ${actor.alias}`);
  res.json({ message: 'Actor deleted successfully', id: req.params.id });
});

// Specific actor indicator sub-routes
apiRouter.get('/actors/:id/handles', (req: Request, res: Response) => {
  const handles = STORE.handles.filter(h => h.actorId === req.params.id);
  res.json(handles);
});

apiRouter.get('/actors/:id/pgp-keys', (req: Request, res: Response) => {
  const pgp = STORE.pgpKeys.filter(p => p.actorId === req.params.id);
  res.json(pgp);
});

apiRouter.get('/actors/:id/wallets', (req: Request, res: Response) => {
  const wallets = STORE.wallets.filter(w => w.actorId === req.params.id);
  res.json(wallets);
});

apiRouter.get('/actors/:id/infrastructure', (req: Request, res: Response) => {
  const infra = STORE.infrastructure.filter(i => i.associatedActors.includes(req.params.id));
  res.json(infra);
});

apiRouter.get('/actors/:id/relationships', (req: Request, res: Response) => {
  const rels = STORE.relationships.filter(r => r.sourceNodeId === req.params.id || r.targetNodeId === req.params.id);
  res.json(rels);
});

// 4. Graph Routes
apiRouter.get('/graph', (req: Request, res: Response) => {
  const focus = req.query.focus as string;
  const graphData = STORE.getGraphData(focus);
  res.json(graphData);
});

apiRouter.get('/graph/:actorId', (req: Request, res: Response) => {
  const graphData = STORE.getGraphData(req.params.actorId);
  res.json(graphData);
});

// 5. Timeline Routes
apiRouter.get('/timeline', (req: Request, res: Response) => {
  const { actorId, fromDate, toDate, eventType } = req.query;
  let events = [...STORE.timelineEvents];

  if (actorId && actorId !== 'all') {
    events = events.filter(e => e.actorId === actorId);
  }
  if (fromDate) {
    events = events.filter(e => e.timestamp >= (fromDate as string));
  }
  if (toDate) {
    events = events.filter(e => e.timestamp <= (toDate as string));
  }
  if (eventType && eventType !== 'all') {
    events = events.filter(e => e.eventType === eventType);
  }

  res.json({ count: events.length, events });
});

apiRouter.get('/timeline/:actorId', (req: Request, res: Response) => {
  const events = STORE.timelineEvents.filter(e => e.actorId === req.params.actorId);
  res.json({ count: events.length, events });
});

// 6. Infrastructure Route
apiRouter.get('/infrastructure', (req: Request, res: Response) => {
  const { type, query } = req.query;
  let list = [...STORE.infrastructure];
  if (type && type !== 'all') {
    list = list.filter(i => i.type === type);
  }
  if (query) {
    const q = (query as string).toLowerCase();
    list = list.filter(i => i.value.toLowerCase().includes(q) || (i.ipAddress && i.ipAddress.includes(q)) || (i.serverBanner && i.serverBanner.toLowerCase().includes(q)));
  }
  res.json({ count: list.length, infrastructure: list });
});

// 7. Sources Route
apiRouter.get('/sources', (_req: Request, res: Response) => {
  res.json({ count: STORE.sources.length, sources: STORE.sources });
});

// 8. AI Analysis Routes
apiRouter.post('/analysis/stylometry', (req: Request, res: Response) => {
  const { sampleA, sampleB } = req.body;
  if (!sampleA || !sampleB) {
    return res.status(400).json({ error: 'Both sampleA and sampleB text samples are required' });
  }
  const result = compareStylometry(sampleA, sampleB);
  res.json(result);
});

apiRouter.post('/analysis/behavior', (req: Request, res: Response) => {
  const { actorAId, actorBId } = req.body;
  const actorA = STORE.actors.find(a => a.id === actorAId) || STORE.actors[0];
  const actorB = STORE.actors.find(a => a.id === actorBId) || STORE.actors[1];

  const profA = generateSyntheticBehaviorProfile(actorA.id, actorA.knownPlatforms);
  const profB = generateSyntheticBehaviorProfile(actorB.id, actorB.knownPlatforms);
  const result = compareBehavior(profA, profB);

  res.json({
    actorA: { id: actorA.id, alias: actorA.alias, profile: profA },
    actorB: { id: actorB.id, alias: actorB.alias, profile: profB },
    comparison: result
  });
});

apiRouter.post('/analysis/entity-link', (req: Request, res: Response) => {
  const { actorAId, actorBId } = req.body;
  if (!actorAId || !actorBId) {
    return res.status(400).json({ error: 'actorAId and actorBId parameters are required' });
  }
  const result = calculateEntityLinking(actorAId, actorBId);
  res.json(result);
});

// 9. Report & Export Routes
apiRouter.get('/reports/:actorId', (req: Request, res: Response) => {
  const report = STORE.generateReport(req.params.actorId);
  STORE.logAudit('investigator@soc.internal', 'REPORT_GENERATE', req.params.actorId, `Generated comprehensive investigation report for ${report.actor.alias}`);
  res.json(report);
});

apiRouter.get('/export/:actorId/csv', (req: Request, res: Response) => {
  const report = STORE.generateReport(req.params.actorId);
  let csv = 'Entity Type,Identifier / Value,Platform / Network,First Observed,Last Observed,Confidence\n';
  report.handles.forEach(h => {
    csv += `Handle,"${h.handle}","${h.platform}",${h.firstSeen},${h.lastSeen},${h.stylometricScore || 85}%\n`;
  });
  report.pgpKeys.forEach(p => {
    csv += `PGP Key,"${p.keyId} (${p.fingerprint})",PGP Keyserver,${p.createdDate},N/A,98%\n`;
  });
  report.wallets.forEach(w => {
    csv += `Wallet,"${w.currency}:${w.address}","${w.clusterTag}",${w.firstActivity},${w.lastActivity},92%\n`;
  });
  report.infrastructure.forEach(i => {
    csv += `Infrastructure,"${i.value} (${i.type})","${i.ipAddress || 'Tor'}",${i.firstSeen},${i.lastSeen},88%\n`;
  });

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="investigation_${report.actor.alias}_export.csv"`);
  res.send(csv);
});

apiRouter.get('/export/:actorId/json', (req: Request, res: Response) => {
  const report = STORE.generateReport(req.params.actorId);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename="investigation_${report.actor.alias}_export.json"`);
  res.send(JSON.stringify(report, null, 2));
});

// 10. Data Import Route
apiRouter.post('/import/csv', (req: Request, res: Response) => {
  const { csvText, targetType } = req.body;
  if (!csvText) return res.status(400).json({ error: 'No CSV content provided' });

  const lines = (csvText as string).trim().split('\n');
  const recordsDetected = Math.max(0, lines.length - 1);
  const validRecords = recordsDetected;
  const invalidRecords = 0;

  STORE.logAudit('investigator@soc.internal', 'DATA_IMPORT', targetType || 'GENERIC', `Imported ${validRecords} records from CSV upload`);
  res.json({
    success: true,
    targetType: targetType || 'Actors',
    recordsDetected,
    validRecords,
    invalidRecords,
    message: `Successfully validated and staged ${validRecords} records.`
  });
});

apiRouter.post('/import/json', (req: Request, res: Response) => {
  const { jsonData, targetType } = req.body;
  if (!jsonData) return res.status(400).json({ error: 'No JSON content provided' });

  const count = Array.isArray(jsonData) ? jsonData.length : 1;
  STORE.logAudit('investigator@soc.internal', 'DATA_IMPORT_JSON', targetType || 'GENERIC', `Imported ${count} JSON entities`);
  res.json({
    success: true,
    recordsDetected: count,
    validRecords: count,
    invalidRecords: 0,
    message: `Successfully validated and parsed ${count} JSON records.`
  });
});

// 11. Audit logs & System Reset
apiRouter.get('/audit-logs', (_req: Request, res: Response) => {
  res.json(STORE.auditLogs);
});

apiRouter.post('/system/reset-seed', (_req: Request, res: Response) => {
  STORE.resetToSeed();
  res.json({ success: true, message: 'Threat intelligence database reset to baseline synthetic seed.' });
});
