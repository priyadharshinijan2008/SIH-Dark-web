// Neo4j Constraints and Indexes for Dark Web Threat Actor De-anonymization

CREATE CONSTRAINT actor_id_unique IF NOT EXISTS FOR (a:Actor) REQUIRE a.id IS UNIQUE;
CREATE CONSTRAINT handle_id_unique IF NOT EXISTS FOR (h:Handle) REQUIRE h.id IS UNIQUE;
CREATE CONSTRAINT pgp_id_unique IF NOT EXISTS FOR (p:PGPKey) REQUIRE p.id IS UNIQUE;
CREATE CONSTRAINT wallet_id_unique IF NOT EXISTS FOR (w:Wallet) REQUIRE w.id IS UNIQUE;
CREATE CONSTRAINT infra_id_unique IF NOT EXISTS FOR (i:Infrastructure) REQUIRE i.id IS UNIQUE;
CREATE CONSTRAINT source_id_unique IF NOT EXISTS FOR (s:Source) REQUIRE s.id IS UNIQUE;

CREATE INDEX actor_alias_index IF NOT EXISTS FOR (a:Actor) ON (a.alias);
CREATE INDEX handle_name_index IF NOT EXISTS FOR (h:Handle) ON (h.handle);
CREATE INDEX wallet_address_index IF NOT EXISTS FOR (w:Wallet) ON (w.address);
CREATE INDEX infra_value_index IF NOT EXISTS FOR (i:Infrastructure) ON (i.value);
