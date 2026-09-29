// Neo4j Seed Data: Persona Nodes and Relational Edges

// Create Actors
MERGE (a1:Actor {id: 'ACTOR-DEMO-001', alias: 'ShadowX', category: 'Cybercrime', confidenceScore: 84})
MERGE (a2:Actor {id: 'ACTOR-DEMO-002', alias: 'NightCipher', category: 'Data Extortion', confidenceScore: 68})
MERGE (a3:Actor {id: 'ACTOR-DEMO-003', alias: 'GhostByte', category: 'Financial Fraud', confidenceScore: 79});

// Create Handles
MERGE (h1:Handle {id: 'HDL-001', handle: 'ShadowX', platform: 'Synthetic Forum Alpha'})
MERGE (h2:Handle {id: 'HDL-002', handle: 'Shadow_X01', platform: 'Synthetic Market Omega'})
MERGE (h3:Handle {id: 'HDL-003', handle: 'XShadow', platform: 'CryptID Escrow Hub'});

// Create PGP Key
MERGE (p1:PGPKey {id: 'PGP-DEMO-001', keyId: '0x8A7C93F14E2B5A09', fingerprint: '9B42 81E3 7F04 D291 A48C 5028 8A7C 93F1 4E2B 5A09'});

// Create Wallets
MERGE (w1:Wallet {id: 'WALLET-DEMO-001', currency: 'BTC', address: 'bc1q9v8t7z6y5x4w3v2u1t0s9r8q7p6o5n4m3l2k1j', cluster: 'SYNTHETIC-SHADOW-CLUSTER-A'})
MERGE (w4:Wallet {id: 'WALLET-DEMO-004', currency: 'XMR', address: '888tNkZrPwvH3dFvK91a7mC3kLpQ0xZaV4wYbBnM7sRtU1iOe9pQwErTyUiOpAsDfGhJkLzXcVbNm1234567890abcdef'});

// Create Infrastructure
MERGE (i1:Infrastructure {id: 'INFRA-DEMO-001', type: 'Domain', value: 'demo-market-01.example', ip: '198.51.100.47'});

// Create Relationships
MERGE (a1)-[:USES {confidence: 100}]->(h1)
MERGE (a1)-[:USES {confidence: 94}]->(h2)
MERGE (a1)-[:USES {confidence: 90}]->(h3)
MERGE (a1)-[:USES {confidence: 98}]->(p1)
MERGE (a1)-[:USES {confidence: 92}]->(w1)
MERGE (a1)-[:USES {confidence: 89}]->(w4)
MERGE (a1)-[:ASSOCIATED_WITH {confidence: 88}]->(i1)
MERGE (a2)-[:ASSOCIATED_WITH {confidence: 74}]->(i1)
MERGE (a1)-[:CONNECTED_TO {confidence: 68, evidence: 'Shared /24 hosting IP block'}]->(a2)
MERGE (a1)-[:LINKED_TO {confidence: 79, evidence: 'Direct transaction cascade to mixer'}]->(a3);
