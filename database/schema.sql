-- Dark Web Threat Actor De-anonymization
-- PostgreSQL Relational Schema

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(32) NOT NULL DEFAULT 'Analyst',
    agency VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS threat_actors (
    id VARCHAR(64) PRIMARY KEY,
    alias VARCHAR(255) NOT NULL,
    primary_handle VARCHAR(255) NOT NULL,
    alternate_handles TEXT[] DEFAULT '{}',
    category VARCHAR(64) NOT NULL,
    first_seen DATE NOT NULL,
    last_seen DATE NOT NULL,
    status VARCHAR(64) NOT NULL DEFAULT 'Synthetic Demo Profile',
    confidence_level VARCHAR(32) NOT NULL,
    confidence_score INTEGER NOT NULL,
    summary TEXT,
    primary_languages TEXT[] DEFAULT '{}',
    known_platforms TEXT[] DEFAULT '{}',
    risk_rating VARCHAR(32) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS handles (
    id VARCHAR(64) PRIMARY KEY,
    actor_id VARCHAR(64) REFERENCES threat_actors(id) ON DELETE CASCADE,
    handle VARCHAR(255) NOT NULL,
    platform VARCHAR(255) NOT NULL,
    first_seen DATE NOT NULL,
    last_seen DATE NOT NULL,
    posting_count INTEGER DEFAULT 0,
    stylometric_score NUMERIC(5,2),
    is_primary BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS pgp_keys (
    id VARCHAR(64) PRIMARY KEY,
    actor_id VARCHAR(64) REFERENCES threat_actors(id) ON DELETE CASCADE,
    key_id VARCHAR(64) NOT NULL,
    fingerprint VARCHAR(128) NOT NULL,
    algorithm VARCHAR(64) NOT NULL,
    key_length INTEGER NOT NULL,
    created_date DATE NOT NULL,
    associated_email VARCHAR(255),
    source_id VARCHAR(64),
    verification_status VARCHAR(64) DEFAULT 'Verified Synthetic'
);

CREATE TABLE IF NOT EXISTS wallets (
    id VARCHAR(64) PRIMARY KEY,
    actor_id VARCHAR(64) REFERENCES threat_actors(id) ON DELETE CASCADE,
    currency VARCHAR(16) NOT NULL,
    address VARCHAR(255) NOT NULL,
    first_activity DATE NOT NULL,
    last_activity DATE NOT NULL,
    total_transactions INTEGER DEFAULT 0,
    estimated_volume_usd NUMERIC(15,2) DEFAULT 0,
    cluster_tag VARCHAR(128),
    source_id VARCHAR(64)
);

CREATE TABLE IF NOT EXISTS infrastructure (
    id VARCHAR(64) PRIMARY KEY,
    type VARCHAR(64) NOT NULL,
    value VARCHAR(255) NOT NULL,
    ip_address VARCHAR(64),
    asn VARCHAR(128),
    country VARCHAR(8),
    certificate_fingerprint VARCHAR(255),
    server_banner TEXT,
    first_seen DATE NOT NULL,
    last_seen DATE NOT NULL,
    associated_actors TEXT[] DEFAULT '{}',
    source_id VARCHAR(64)
);

CREATE TABLE IF NOT EXISTS sources (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(64) NOT NULL,
    reliability VARCHAR(32) NOT NULL,
    observations_count INTEGER DEFAULT 0,
    first_ingested DATE NOT NULL,
    last_ingested DATE NOT NULL,
    url_sample VARCHAR(512),
    is_synthetic BOOLEAN DEFAULT TRUE,
    collector_method VARCHAR(64)
);

CREATE TABLE IF NOT EXISTS observations (
    id VARCHAR(64) PRIMARY KEY,
    actor_id VARCHAR(64) REFERENCES threat_actors(id) ON DELETE CASCADE,
    entity_type VARCHAR(64) NOT NULL,
    entity_value VARCHAR(255) NOT NULL,
    source_id VARCHAR(64) REFERENCES sources(id),
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    event_description TEXT NOT NULL,
    raw_sample_snippet TEXT,
    confidence_score INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS relationships (
    id VARCHAR(64) PRIMARY KEY,
    source_node_id VARCHAR(64) NOT NULL,
    source_node_type VARCHAR(64) NOT NULL,
    target_node_id VARCHAR(64) NOT NULL,
    target_node_type VARCHAR(64) NOT NULL,
    relationship_type VARCHAR(64) NOT NULL,
    confidence_score INTEGER NOT NULL,
    first_observed DATE NOT NULL,
    last_observed DATE NOT NULL,
    evidence_summary TEXT,
    source_id VARCHAR(64) REFERENCES sources(id)
);

CREATE TABLE IF NOT EXISTS timeline_events (
    id VARCHAR(64) PRIMARY KEY,
    actor_id VARCHAR(64) REFERENCES threat_actors(id) ON DELETE CASCADE,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    event_type VARCHAR(64) NOT NULL,
    entity VARCHAR(255) NOT NULL,
    source VARCHAR(255) NOT NULL,
    evidence TEXT NOT NULL,
    confidence INTEGER NOT NULL,
    severity VARCHAR(32) DEFAULT 'Info'
);

CREATE TABLE IF NOT EXISTS analysis_results (
    id VARCHAR(64) PRIMARY KEY,
    actor_a_id VARCHAR(64) REFERENCES threat_actors(id) ON DELETE CASCADE,
    actor_b_id VARCHAR(64) REFERENCES threat_actors(id) ON DELETE CASCADE,
    overall_confidence INTEGER NOT NULL,
    association_strength VARCHAR(64) NOT NULL,
    factors_json JSONB NOT NULL,
    why_suggested TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reports (
    id VARCHAR(64) PRIMARY KEY,
    actor_id VARCHAR(64) REFERENCES threat_actors(id) ON DELETE CASCADE,
    generated_at TIMESTAMP WITH TIME ZONE NOT NULL,
    generated_by VARCHAR(255) NOT NULL,
    classification VARCHAR(128) NOT NULL,
    dossier_json JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(64) PRIMARY KEY,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    action VARCHAR(64) NOT NULL,
    target_entity VARCHAR(128) NOT NULL,
    details TEXT
);

CREATE INDEX IF NOT EXISTS idx_actor_category ON threat_actors(category);
CREATE INDEX IF NOT EXISTS idx_handles_actor ON handles(actor_id);
CREATE INDEX IF NOT EXISTS idx_wallets_actor ON wallets(actor_id);
CREATE INDEX IF NOT EXISTS idx_obs_actor ON observations(actor_id);
CREATE INDEX IF NOT EXISTS idx_rel_source ON relationships(source_node_id);
CREATE INDEX IF NOT EXISTS idx_rel_target ON relationships(target_node_id);
