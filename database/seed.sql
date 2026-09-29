-- Seed script for Dark Web Threat Actor De-anonymization (PostgreSQL)

INSERT INTO users (id, name, email, role, agency) VALUES
('USR-DEMO-001', 'Special Investigator Vance', 'investigator@soc.internal', 'Analyst', 'Academic Cyber Threat Unit')
ON CONFLICT (id) DO NOTHING;

INSERT INTO threat_actors (id, alias, primary_handle, alternate_handles, category, first_seen, last_seen, status, confidence_level, confidence_score, summary, primary_languages, known_platforms, risk_rating) VALUES
('ACTOR-DEMO-001', 'ShadowX', 'ShadowX', ARRAY['Shadow_X01', 'XShadow', 'ShadowOperator'], 'Cybercrime', '2025-02-14', '2026-08-21', 'Synthetic Demo Profile', 'High', 84, 'High-volume underground broker selling specialized corporate access keys and database credentials.', ARRAY['English', 'Russian'], ARRAY['Synthetic Forum Alpha', 'Synthetic Market Omega', 'CryptID Escrow Hub'], 'Critical'),
('ACTOR-DEMO-002', 'NightCipher', 'NightCipher', ARRAY['CipherNight_24', 'NC_Dev'], 'Data Extortion', '2025-03-01', '2026-08-14', 'Synthetic Demo Profile', 'Medium', 68, 'Extortion affiliate specializing in exfiltrated healthcare and financial CRM archives.', ARRAY['English'], ARRAY['Synthetic Forum Alpha', 'LeakMarket Demo'], 'High'),
('ACTOR-DEMO-003', 'GhostByte', 'GhostByte', ARRAY['Ghost_B8', 'ByteGhost99'], 'Financial Fraud', '2025-01-20', '2026-09-02', 'Synthetic Demo Profile', 'High', 79, 'Laundering operative coordinating cryptocurrency tumbling and multi-hop token mixers.', ARRAY['English', 'German'], ARRAY['Synthetic Market Omega', 'MixerPool Demo'], 'High')
ON CONFLICT (id) DO NOTHING;

INSERT INTO sources (id, name, type, reliability, observations_count, first_ingested, last_ingested, url_sample, is_synthetic, collector_method) VALUES
('SOURCE-DEMO-001', 'Synthetic Forum Alpha', 'Synthetic Forum', 'A (High)', 84, '2025-01-10', '2026-09-25', 'http://synthforumalpha9924.onion/board', TRUE, 'Synthetic Generator'),
('SOURCE-DEMO-002', 'Synthetic Market Omega', 'Synthetic Marketplace', 'A (High)', 68, '2025-01-15', '2026-09-24', 'http://synthmarketomega77.onion/vendor/catalog', TRUE, 'Synthetic Generator'),
('SOURCE-DEMO-007', 'Blockchain Cluster Synthetic Index', 'Synthetic Blockchain Cluster', 'A (High)', 56, '2025-01-05', '2026-09-26', 'https://demo-intel-ledger.internal/clusters', TRUE, 'Synthetic Generator'),
('SOURCE-DEMO-008', 'ThreatInfra Synthetic Telemetry', 'Synthetic Intelligence Feed', 'A (High)', 64, '2025-01-08', '2026-09-25', 'https://demo-intel-infra.internal/dns-passive', TRUE, 'Synthetic Generator')
ON CONFLICT (id) DO NOTHING;

INSERT INTO handles (id, actor_id, handle, platform, first_seen, last_seen, posting_count, stylometric_score, is_primary) VALUES
('HDL-001', 'ACTOR-DEMO-001', 'ShadowX', 'Synthetic Forum Alpha', '2025-02-14', '2026-08-21', 142, 94.0, TRUE),
('HDL-002', 'ACTOR-DEMO-001', 'Shadow_X01', 'Synthetic Market Omega', '2025-07-11', '2026-08-19', 88, 91.0, FALSE),
('HDL-003', 'ACTOR-DEMO-001', 'XShadow', 'CryptID Escrow Hub', '2025-09-03', '2026-07-28', 45, 88.0, FALSE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO pgp_keys (id, actor_id, key_id, fingerprint, algorithm, key_length, created_date, associated_email, source_id, verification_status) VALUES
('PGP-DEMO-001', 'ACTOR-DEMO-001', '0x8A7C93F14E2B5A09', '9B42 81E3 7F04 D291 A48C 5028 8A7C 93F1 4E2B 5A09', 'RSA-4096', 4096, '2025-01-10', 'shadow_sec@demomail.onion', 'SOURCE-DEMO-001', 'Verified Synthetic'),
('PGP-DEMO-004', 'ACTOR-DEMO-002', '0x62CA408B1F5E99DA', '810A 32E9 94C2 55A1 18B3 90C4 62CA 408B 1F5E 99DA', 'RSA-3072', 3072, '2025-02-25', 'cipher_desk@demomail.onion', 'SOURCE-DEMO-001', 'Verified Synthetic')
ON CONFLICT (id) DO NOTHING;

INSERT INTO wallets (id, actor_id, currency, address, first_activity, last_activity, total_transactions, estimated_volume_usd, cluster_tag, source_id) VALUES
('WALLET-DEMO-001', 'ACTOR-DEMO-001', 'BTC', 'bc1q9v8t7z6y5x4w3v2u1t0s9r8q7p6o5n4m3l2k1j', '2025-02-16', '2026-08-20', 148, 1420000.00, 'SYNTHETIC-SHADOW-CLUSTER-A', 'SOURCE-DEMO-007'),
('WALLET-DEMO-004', 'ACTOR-DEMO-001', 'XMR', '888tNkZrPwvH3dFvK91a7mC3kLpQ0xZaV4wYbBnM7sRtU1iOe9pQwErTyUiOpAsDfGhJkLzXcVbNm1234567890abcdef', '2025-04-19', '2026-07-29', 86, 670000.00, 'SYNTHETIC-SHADOW-XMR-POOL', 'SOURCE-DEMO-007')
ON CONFLICT (id) DO NOTHING;

INSERT INTO infrastructure (id, type, value, ip_address, asn, country, certificate_fingerprint, server_banner, first_seen, last_seen, associated_actors, source_id) VALUES
('INFRA-DEMO-001', 'Domain', 'demo-market-01.example', '198.51.100.47', 'AS64501 DEMO-HOST', 'NL', 'CERT-DEMO-001: 4a:9f:1b:22:98:e1:5c:20:9b:14', 'nginx/1.24.0 (custom-hardened)', '2025-02-14', '2026-08-21', ARRAY['ACTOR-DEMO-001', 'ACTOR-DEMO-002'], 'SOURCE-DEMO-008')
ON CONFLICT (id) DO NOTHING;
