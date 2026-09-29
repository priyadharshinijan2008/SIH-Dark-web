import React, { useState } from 'react';
import {
  Code2, Send, CheckCircle2, Copy, ChevronDown, ChevronUp,
  Key, Globe, Database, Terminal
} from 'lucide-react';
import { ExplanationBox } from '../components/common/ExplanationBox';

export const ApiDocsPage: React.FC = () => {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(id);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const apiGroups = [
    {
      group: 'Authentication & Access',
      endpoints: [
        {
          id: 'auth-login',
          method: 'POST',
          path: '/api/auth/login',
          description: 'Authenticate investigator credentials and obtain JWT session token.',
          params: [
            { name: 'email', type: 'string', required: false, desc: 'Investigator email address' },
            { name: 'password', type: 'string', required: false, desc: 'Account password' },
            { name: 'role', type: 'string', required: false, desc: 'Security role (Admin, Analyst, Viewer)' }
          ],
          exampleReq: `{ "email": "investigator@soc.internal", "role": "Analyst" }`,
          exampleRes: `{
  "token": "mock-jwt-1743510000000",
  "user": {
    "id": "USR-DEMO-001",
    "name": "Special Investigator Vance",
    "role": "Analyst"
  }
}`
        }
      ]
    },
    {
      group: 'Dashboard & Telemetry',
      endpoints: [
        {
          id: 'dashboard-stats',
          method: 'GET',
          path: '/api/dashboard/stats',
          description: 'Returns real-time dynamic KPI metrics, timelines, and distributions.',
          params: [],
          exampleReq: `curl -X GET http://localhost:3000/api/dashboard/stats`,
          exampleRes: `{
  "kpis": {
    "totalThreatActors": 24,
    "totalHandles": 68,
    "totalPgpKeys": 18,
    "totalWallets": 31,
    "totalInfrastructure": 42,
    "totalRelationships": 184,
    "totalSources": 38,
    "recentObservations": 215
  },
  "activityTimeline": [ ... ]
}`
        }
      ]
    },
    {
      group: 'Threat Actors',
      endpoints: [
        {
          id: 'actors-list',
          method: 'GET',
          path: '/api/actors',
          description: 'Query threat actors with filtering by category, confidence level, and sorting.',
          params: [
            { name: 'query', type: 'string', required: false, desc: 'Search substring across alias, handles, or summary' },
            { name: 'category', type: 'string', required: false, desc: 'Cybercrime category filter' },
            { name: 'confidenceLevel', type: 'string', required: false, desc: 'High, Medium, Low' },
            { name: 'sortBy', type: 'string', required: false, desc: 'lastSeen, firstSeen, confidenceScore, alias' }
          ],
          exampleReq: `curl -X GET "http://localhost:3000/api/actors?category=Cybercrime&confidenceLevel=High"`,
          exampleRes: `{
  "count": 5,
  "actors": [
    {
      "id": "ACTOR-DEMO-001",
      "alias": "ShadowX",
      "category": "Cybercrime",
      "confidenceScore": 84,
      "linkedIdentifiersCount": 7
    }
  ]
}`
        },
        {
          id: 'actors-get',
          method: 'GET',
          path: '/api/actors/:id',
          description: 'Retrieve complete dossier for an actor including all handles, PGP keys, wallets, and infra.',
          params: [
            { name: 'id', type: 'string', required: true, desc: 'Actor ID (e.g. ACTOR-DEMO-001) or alias' }
          ],
          exampleReq: `curl -X GET http://localhost:3000/api/actors/ACTOR-DEMO-001`,
          exampleRes: `{
  "actor": { "id": "ACTOR-DEMO-001", "alias": "ShadowX", ... },
  "handles": [ ... ],
  "pgpKeys": [ ... ],
  "wallets": [ ... ],
  "infrastructure": [ ... ]
}`
        }
      ]
    },
    {
      group: 'Graph Network',
      endpoints: [
        {
          id: 'graph-query',
          method: 'GET',
          path: '/api/graph',
          description: 'Fetch node and edge topology for interactive graph visualization.',
          params: [
            { name: 'focus', type: 'string', required: false, desc: 'Target actor ID to center subgraph around' }
          ],
          exampleReq: `curl -X GET "http://localhost:3000/api/graph?focus=ACTOR-DEMO-001"`,
          exampleRes: `{
  "nodes": [
    { "id": "ACTOR-DEMO-001", "label": "ShadowX", "type": "Actor" },
    { "id": "PGP-DEMO-001", "label": "0x8A7C93F14E2B5A09", "type": "PGPKey" }
  ],
  "edges": [
    { "id": "REL-004", "source": "ACTOR-DEMO-001", "target": "PGP-DEMO-001", "type": "USES" }
  ]
}`
        }
      ]
    },
    {
      group: 'Timeline Audit',
      endpoints: [
        {
          id: 'timeline-query',
          method: 'GET',
          path: '/api/timeline',
          description: 'Query chronologically sorted threat events with timestamp bounds.',
          params: [
            { name: 'actorId', type: 'string', required: false, desc: 'Filter by specific actor ID' },
            { name: 'fromDate', type: 'string', required: false, desc: 'ISO 8601 start timestamp' },
            { name: 'toDate', type: 'string', required: false, desc: 'ISO 8601 end timestamp' }
          ],
          exampleReq: `curl -X GET "http://localhost:3000/api/timeline?actorId=ACTOR-DEMO-001&fromDate=2025-01-01"`,
          exampleRes: `{
  "count": 6,
  "events": [
    { "id": "EVT-001", "timestamp": "2025-02-14T09:20:00Z", "eventType": "Initial Observation" }
  ]
}`
        }
      ]
    },
    {
      group: 'AI-Assisted Analysis',
      endpoints: [
        {
          id: 'ai-stylometry',
          method: 'POST',
          path: '/api/analysis/stylometry',
          description: 'Calculate cosine lexical similarity, character trigrams, and syntactic scores between two text samples.',
          params: [
            { name: 'sampleA', type: 'string', required: true, desc: 'Primary observed text sample' },
            { name: 'sampleB', type: 'string', required: true, desc: 'Comparison text sample' }
          ],
          exampleReq: `{
  "sampleA": "Payment must be completed before delivery.",
  "sampleB": "Payment should be completed before delivery."
}`,
          exampleRes: `{
  "similarityScore": 78,
  "cosineSimilarity": 0.82,
  "jaccardTrigramSimilarity": 0.74,
  "disclaimer": "The model detected similarities in vocabulary, sentence structure and writing patterns..."
}`
        },
        {
          id: 'ai-entity-link',
          method: 'POST',
          path: '/api/analysis/entity-link',
          description: 'Execute transparent 5-factor mathematical attribution model between two personas.',
          params: [
            { name: 'actorAId', type: 'string', required: true, desc: 'Subject Actor ID' },
            { name: 'actorBId', type: 'string', required: true, desc: 'Comparison Actor ID' }
          ],
          exampleReq: `{ "actorAId": "ACTOR-DEMO-001", "actorBId": "ACTOR-DEMO-002" }`,
          exampleRes: `{
  "overallConfidence": 68,
  "associationStrength": "Moderate Association",
  "factors": {
    "identifierOverlap": { "score": 65, "weight": 30, "contribution": 19.5 },
    "behavioralSimilarity": { "score": 74, "weight": 20, "contribution": 14.8 },
    "stylometricSimilarity": { "score": 78, "weight": 20, "contribution": 15.6 }
  }
}`
        }
      ]
    },
    {
      group: 'Reports & Export',
      endpoints: [
        {
          id: 'reports-get',
          method: 'GET',
          path: '/api/reports/:actorId',
          description: 'Generates comprehensive forensic investigation dossier.',
          params: [{ name: 'actorId', type: 'string', required: true, desc: 'Target actor ID' }],
          exampleReq: `curl -X GET http://localhost:3000/api/reports/ACTOR-DEMO-001`,
          exampleRes: `{ "id": "REP-ACTOR-DEMO-001-9924", "classification": "ACADEMIC RESEARCH", ... }`
        },
        {
          id: 'export-csv',
          method: 'GET',
          path: '/api/export/:actorId/csv',
          description: 'Streams standard CSV spreadsheet with all identified entities and timestamps.',
          params: [{ name: 'actorId', type: 'string', required: true, desc: 'Target actor ID' }],
          exampleReq: `curl -X GET http://localhost:3000/api/export/ACTOR-DEMO-001/csv`,
          exampleRes: `Entity Type,Identifier / Value,Platform / Network,First Observed,Last Observed,Confidence...`
        }
      ]
    }
  ];

  return (
    <div className="space-y-6 py-4 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Terminal className="w-6 h-6 text-blue-600" />
          <span>API Architecture & Endpoints Documentation</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Complete REST API documentation for programmatic intelligence queries and automated ingestion.
        </p>
      </div>

      <ExplanationBox
        title="REST API Architecture"
        shortSummary="Built with Node.js, Express, and TypeScript. All endpoints return standard JSON responses."
        details="Controllers and data stores support full CRUD operations, live graph lookups, multi-factor AI scoring, and standard CSV/JSON downloads."
      />

      {/* Endpoints List Grouped */}
      <div className="space-y-6">
        {apiGroups.map((group, gIdx) => (
          <div key={gIdx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>{group.group}</span>
            </h3>

            <div className="space-y-3">
              {group.endpoints.map((ep, eIdx) => {
                const uniqueIdx = gIdx * 10 + eIdx;
                const isExpanded = expandedIndex === uniqueIdx;

                return (
                  <div key={ep.id} className="border border-slate-200 rounded-xl overflow-hidden">
                    <div
                      onClick={() => setExpandedIndex(isExpanded ? null : uniqueIdx)}
                      className="p-3 bg-slate-50 hover:bg-slate-100/70 transition-colors flex items-center justify-between cursor-pointer text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`px-2 py-0.5 rounded-md font-mono font-bold text-[10px] ${
                          ep.method === 'GET' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {ep.method}
                        </span>
                        <span className="font-mono font-semibold text-slate-800">{ep.path}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-slate-500 text-[11px] hidden sm:inline">{ep.description}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-4 bg-white border-t border-slate-200 space-y-4 text-xs animate-in fade-in duration-100">
                        <p className="text-slate-700 leading-relaxed">{ep.description}</p>

                        {/* Query / Body Parameters */}
                        {ep.params.length > 0 && (
                          <div>
                            <div className="font-semibold text-slate-700 text-[11px] uppercase mb-1.5">Parameters:</div>
                            <table className="w-full text-left text-[11px] border border-slate-200 rounded-lg">
                              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                                <tr>
                                  <th className="p-2">Name</th>
                                  <th className="p-2">Type</th>
                                  <th className="p-2">Required</th>
                                  <th className="p-2">Description</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {ep.params.map(p => (
                                  <tr key={p.name}>
                                    <td className="p-2 font-mono font-bold text-slate-800">{p.name}</td>
                                    <td className="p-2 font-mono text-slate-500">{p.type}</td>
                                    <td className="p-2">{p.required ? <span className="text-red-600 font-semibold">Yes</span> : 'No'}</td>
                                    <td className="p-2 text-slate-600">{p.desc}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* Example Request */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-slate-700 text-[11px] uppercase">Example Request:</span>
                            <button
                              onClick={() => copyToClipboard(ep.exampleReq, `${ep.id}-req`)}
                              className="text-[10px] text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                            >
                              <Copy className="w-3 h-3" />
                              <span>{copiedEndpoint === `${ep.id}-req` ? 'Copied!' : 'Copy'}</span>
                            </button>
                          </div>
                          <pre className="p-3 bg-slate-900 text-slate-200 rounded-xl font-mono text-[11px] overflow-x-auto">
                            {ep.exampleReq}
                          </pre>
                        </div>

                        {/* Example Response */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-slate-700 text-[11px] uppercase">Example Response (200 OK):</span>
                            <button
                              onClick={() => copyToClipboard(ep.exampleRes, `${ep.id}-res`)}
                              className="text-[10px] text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                            >
                              <Copy className="w-3 h-3" />
                              <span>{copiedEndpoint === `${ep.id}-res` ? 'Copied!' : 'Copy'}</span>
                            </button>
                          </div>
                          <pre className="p-3 bg-slate-900 text-slate-200 rounded-xl font-mono text-[11px] overflow-x-auto">
                            {ep.exampleRes}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
