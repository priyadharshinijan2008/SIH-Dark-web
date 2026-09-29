import { HandleRecord, PGPKeyRecord, WalletRecord, InfrastructureRecord } from '../types.js';

export const SYNTHETIC_HANDLES: HandleRecord[] = [
  // ShadowX (ACTOR-DEMO-001)
  { id: 'HDL-001', actorId: 'ACTOR-DEMO-001', handle: 'ShadowX', platform: 'Synthetic Forum Alpha', firstSeen: '2025-02-14', lastSeen: '2026-08-21', postingCount: 142, stylometricScore: 94, isPrimary: true },
  { id: 'HDL-002', actorId: 'ACTOR-DEMO-001', handle: 'Shadow_X01', platform: 'Synthetic Market Omega', firstSeen: '2025-07-11', lastSeen: '2026-08-19', postingCount: 88, stylometricScore: 91, isPrimary: false },
  { id: 'HDL-003', actorId: 'ACTOR-DEMO-001', handle: 'XShadow', platform: 'CryptID Escrow Hub', firstSeen: '2025-09-03', lastSeen: '2026-07-28', postingCount: 45, stylometricScore: 88, isPrimary: false },
  { id: 'HDL-004', actorId: 'ACTOR-DEMO-001', handle: 'ShadowOperator', platform: 'Synthetic Forum Beta', firstSeen: '2025-11-12', lastSeen: '2026-06-14', postingCount: 31, stylometricScore: 82, isPrimary: false },

  // NightCipher (ACTOR-DEMO-002)
  { id: 'HDL-005', actorId: 'ACTOR-DEMO-002', handle: 'NightCipher', platform: 'Synthetic Forum Alpha', firstSeen: '2025-03-01', lastSeen: '2026-08-14', postingCount: 96, stylometricScore: 89, isPrimary: true },
  { id: 'HDL-006', actorId: 'ACTOR-DEMO-002', handle: 'CipherNight_24', platform: 'LeakMarket Demo', firstSeen: '2025-05-18', lastSeen: '2026-07-22', postingCount: 64, stylometricScore: 85, isPrimary: false },
  { id: 'HDL-007', actorId: 'ACTOR-DEMO-002', handle: 'NC_Dev', platform: 'CryptID Escrow Hub', firstSeen: '2025-08-04', lastSeen: '2026-08-01', postingCount: 37, stylometricScore: 78, isPrimary: false },

  // GhostByte (ACTOR-DEMO-003)
  { id: 'HDL-008', actorId: 'ACTOR-DEMO-003', handle: 'GhostByte', platform: 'Synthetic Market Omega', firstSeen: '2025-01-20', lastSeen: '2026-09-02', postingCount: 115, stylometricScore: 92, isPrimary: true },
  { id: 'HDL-009', actorId: 'ACTOR-DEMO-003', handle: 'Ghost_B8', platform: 'MixerPool Demo', firstSeen: '2025-04-12', lastSeen: '2026-08-20', postingCount: 53, stylometricScore: 86, isPrimary: false },
  { id: 'HDL-010', actorId: 'ACTOR-DEMO-003', handle: 'ByteGhost99', platform: 'Synthetic Forum Alpha', firstSeen: '2025-09-15', lastSeen: '2026-06-18', postingCount: 41, stylometricScore: 80, isPrimary: false },

  // DarkOrbit (ACTOR-DEMO-004)
  { id: 'HDL-011', actorId: 'ACTOR-DEMO-004', handle: 'DarkOrbit', platform: 'Synthetic Forum Beta', firstSeen: '2025-04-10', lastSeen: '2026-07-30', postingCount: 78, stylometricScore: 87, isPrimary: true },
  { id: 'HDL-012', actorId: 'ACTOR-DEMO-004', handle: 'OrbitDark', platform: 'MalShare Demo Hub', firstSeen: '2025-06-25', lastSeen: '2026-05-19', postingCount: 39, stylometricScore: 81, isPrimary: false },
  { id: 'HDL-013', actorId: 'ACTOR-DEMO-004', handle: 'D_Orbit_V', platform: 'Synthetic Market Omega', firstSeen: '2025-10-02', lastSeen: '2026-07-11', postingCount: 29, stylometricScore: 76, isPrimary: false },

  // RavenNode (ACTOR-DEMO-005)
  { id: 'HDL-014', actorId: 'ACTOR-DEMO-005', handle: 'RavenNode', platform: 'Synthetic Forum Alpha', firstSeen: '2025-05-18', lastSeen: '2026-09-12', postingCount: 104, stylometricScore: 90, isPrimary: true },
  { id: 'HDL-015', actorId: 'ACTOR-DEMO-005', handle: 'Raven_Ops', platform: 'EnterpriseAccess Demo', firstSeen: '2025-07-09', lastSeen: '2026-08-30', postingCount: 62, stylometricScore: 84, isPrimary: false },
  { id: 'HDL-016', actorId: 'ACTOR-DEMO-005', handle: 'CorvusNode', platform: 'CryptID Escrow Hub', firstSeen: '2025-11-20', lastSeen: '2026-07-15', postingCount: 35, stylometricScore: 79, isPrimary: false },

  // ZeroTrace (ACTOR-DEMO-006)
  { id: 'HDL-017', actorId: 'ACTOR-DEMO-006', handle: 'ZeroTrace', platform: 'OnionDrop Demo', firstSeen: '2025-06-01', lastSeen: '2026-08-05', postingCount: 46, stylometricScore: 73, isPrimary: true },
  { id: 'HDL-018', actorId: 'ACTOR-DEMO-006', handle: 'ZT_Anonymous', platform: 'Synthetic Forum Beta', firstSeen: '2025-08-14', lastSeen: '2026-04-10', postingCount: 22, stylometricScore: 68, isPrimary: false },
  { id: 'HDL-019', actorId: 'ACTOR-DEMO-006', handle: 'TraceZero_0', platform: 'CryptID Escrow Hub', firstSeen: '2025-12-01', lastSeen: '2026-06-20', postingCount: 18, stylometricScore: 65, isPrimary: false },

  // PhantomRoot (ACTOR-DEMO-007)
  { id: 'HDL-020', actorId: 'ACTOR-DEMO-007', handle: 'PhantomRoot', platform: 'Synthetic Forum Beta', firstSeen: '2025-02-28', lastSeen: '2026-07-19', postingCount: 69, stylometricScore: 85, isPrimary: true },
  { id: 'HDL-021', actorId: 'ACTOR-DEMO-007', handle: 'RootPhantom_X', platform: 'MalShare Demo Hub', firstSeen: '2025-06-12', lastSeen: '2026-05-30', postingCount: 34, stylometricScore: 79, isPrimary: false },
  { id: 'HDL-022', actorId: 'ACTOR-DEMO-007', handle: 'PRoot', platform: 'Synthetic Market Omega', firstSeen: '2025-10-15', lastSeen: '2026-07-02', postingCount: 26, stylometricScore: 72, isPrimary: false },

  // SilentVector (ACTOR-DEMO-008)
  { id: 'HDL-023', actorId: 'ACTOR-DEMO-008', handle: 'SilentVector', platform: 'Synthetic Market Omega', firstSeen: '2025-07-04', lastSeen: '2026-09-18', postingCount: 88, stylometricScore: 89, isPrimary: true },
  { id: 'HDL-024', actorId: 'ACTOR-DEMO-008', handle: 'SV_Payload', platform: 'BotMaster Demo', firstSeen: '2025-09-22', lastSeen: '2026-08-14', postingCount: 51, stylometricScore: 83, isPrimary: false },
  { id: 'HDL-025', actorId: 'ACTOR-DEMO-008', handle: 'VectorSilent', platform: 'Synthetic Forum Alpha', firstSeen: '2025-11-05', lastSeen: '2026-06-29', postingCount: 33, stylometricScore: 77, isPrimary: false },

  // CobaltWeaver (ACTOR-DEMO-009)
  { id: 'HDL-026', actorId: 'ACTOR-DEMO-009', handle: 'CobaltWeaver', platform: 'Synthetic Forum Alpha', firstSeen: '2025-03-15', lastSeen: '2026-08-29', postingCount: 128, stylometricScore: 93, isPrimary: true },
  { id: 'HDL-027', actorId: 'ACTOR-DEMO-009', handle: 'CW_Strike', platform: 'BeaconMarket Demo', firstSeen: '2025-05-20', lastSeen: '2026-08-11', postingCount: 74, stylometricScore: 88, isPrimary: false },
  { id: 'HDL-028', actorId: 'ACTOR-DEMO-009', handle: 'WeaverCobalt', platform: 'EnterpriseAccess Demo', firstSeen: '2025-08-18', lastSeen: '2026-07-04', postingCount: 42, stylometricScore: 82, isPrimary: false },

  // KryptonGhost (ACTOR-DEMO-010)
  { id: 'HDL-029', actorId: 'ACTOR-DEMO-010', handle: 'KryptonGhost', platform: 'Synthetic Market Omega', firstSeen: '2025-08-11', lastSeen: '2026-06-25', postingCount: 65, stylometricScore: 81, isPrimary: true },
  { id: 'HDL-030', actorId: 'ACTOR-DEMO-010', handle: 'KGhost_Sec', platform: 'CryptID Escrow Hub', firstSeen: '2025-10-30', lastSeen: '2026-05-14', postingCount: 31, stylometricScore: 74, isPrimary: false },
  { id: 'HDL-031', actorId: 'ACTOR-DEMO-010', handle: 'Krypton_9', platform: 'Synthetic Forum Beta', firstSeen: '2026-01-12', lastSeen: '2026-06-01', postingCount: 20, stylometricScore: 70, isPrimary: false },

  // ViperLoom (ACTOR-DEMO-011)
  { id: 'HDL-032', actorId: 'ACTOR-DEMO-011', handle: 'ViperLoom', platform: 'Synthetic Forum Alpha', firstSeen: '2025-04-22', lastSeen: '2026-09-08', postingCount: 139, stylometricScore: 95, isPrimary: true },
  { id: 'HDL-033', actorId: 'ACTOR-DEMO-011', handle: 'Viper_Loom', platform: 'RansomPortal Demo', firstSeen: '2025-06-15', lastSeen: '2026-08-27', postingCount: 84, stylometricScore: 90, isPrimary: false },
  { id: 'HDL-034', actorId: 'ACTOR-DEMO-011', handle: 'VL_Ops', platform: 'Synthetic Market Omega', firstSeen: '2025-09-09', lastSeen: '2026-07-19', postingCount: 49, stylometricScore: 84, isPrimary: false },

  // OnyxReaper (ACTOR-DEMO-012)
  { id: 'HDL-035', actorId: 'ACTOR-DEMO-012', handle: 'OnyxReaper', platform: 'LeakMarket Demo', firstSeen: '2025-05-09', lastSeen: '2026-08-30', postingCount: 71, stylometricScore: 83, isPrimary: true },
  { id: 'HDL-036', actorId: 'ACTOR-DEMO-012', handle: 'ReaperOnyx', platform: 'Synthetic Forum Alpha', firstSeen: '2025-07-28', lastSeen: '2026-07-15', postingCount: 38, stylometricScore: 77, isPrimary: false },
  { id: 'HDL-037', actorId: 'ACTOR-DEMO-012', handle: 'Onyx_R', platform: 'CryptID Escrow Hub', firstSeen: '2025-11-18', lastSeen: '2026-06-22', postingCount: 25, stylometricScore: 71, isPrimary: false },

  // AegisNull (ACTOR-DEMO-013)
  { id: 'HDL-038', actorId: 'ACTOR-DEMO-013', handle: 'AegisNull', platform: 'Synthetic Forum Beta', firstSeen: '2025-09-01', lastSeen: '2026-09-20', postingCount: 54, stylometricScore: 79, isPrimary: true },
  { id: 'HDL-039', actorId: 'ACTOR-DEMO-013', handle: 'NullAegis', platform: 'OnionDrop Demo', firstSeen: '2025-11-10', lastSeen: '2026-08-04', postingCount: 29, stylometricScore: 73, isPrimary: false },
  { id: 'HDL-040', actorId: 'ACTOR-DEMO-013', handle: 'Aegis_0', platform: 'CryptID Escrow Hub', firstSeen: '2026-02-05', lastSeen: '2026-07-11', postingCount: 16, stylometricScore: 66, isPrimary: false },

  // FrostByte (ACTOR-DEMO-014)
  { id: 'HDL-041', actorId: 'ACTOR-DEMO-014', handle: 'FrostByte', platform: 'BotMaster Demo', firstSeen: '2025-06-17', lastSeen: '2026-07-28', postingCount: 82, stylometricScore: 86, isPrimary: true },
  { id: 'HDL-042', actorId: 'ACTOR-DEMO-014', handle: 'Byte_Frost', platform: 'Synthetic Market Omega', firstSeen: '2025-08-30', lastSeen: '2026-06-15', postingCount: 44, stylometricScore: 80, isPrimary: false },
  { id: 'HDL-043', actorId: 'ACTOR-DEMO-014', handle: 'FB_Zero', platform: 'MalShare Demo Hub', firstSeen: '2025-12-08', lastSeen: '2026-05-18', postingCount: 27, stylometricScore: 74, isPrimary: false },

  // IronSpecter (ACTOR-DEMO-015)
  { id: 'HDL-044', actorId: 'ACTOR-DEMO-015', handle: 'IronSpecter', platform: 'Synthetic Forum Alpha', firstSeen: '2025-01-15', lastSeen: '2026-09-14', postingCount: 112, stylometricScore: 91, isPrimary: true },
  { id: 'HDL-045', actorId: 'ACTOR-DEMO-015', handle: 'SpecterIron', platform: 'EnterpriseAccess Demo', firstSeen: '2025-04-05', lastSeen: '2026-08-19', postingCount: 67, stylometricScore: 85, isPrimary: false },
  { id: 'HDL-046', actorId: 'ACTOR-DEMO-015', handle: 'IS_Ghost', platform: 'CryptID Escrow Hub', firstSeen: '2025-08-25', lastSeen: '2026-07-08', postingCount: 39, stylometricScore: 78, isPrimary: false },

  // NexusDrift (ACTOR-DEMO-016)
  { id: 'HDL-047', actorId: 'ACTOR-DEMO-016', handle: 'NexusDrift', platform: 'Synthetic Market Omega', firstSeen: '2025-07-21', lastSeen: '2026-08-11', postingCount: 59, stylometricScore: 82, isPrimary: true },
  { id: 'HDL-048', actorId: 'ACTOR-DEMO-016', handle: 'DriftNexus', platform: 'Synthetic Forum Beta', firstSeen: '2025-10-14', lastSeen: '2026-06-25', postingCount: 31, stylometricScore: 76, isPrimary: false },
  { id: 'HDL-049', actorId: 'ACTOR-DEMO-016', handle: 'N_Drift', platform: 'LeakMarket Demo', firstSeen: '2026-01-19', lastSeen: '2026-05-30', postingCount: 19, stylometricScore: 69, isPrimary: false },

  // PulseFiend (ACTOR-DEMO-017)
  { id: 'HDL-050', actorId: 'ACTOR-DEMO-017', handle: 'PulseFiend', platform: 'Synthetic Forum Beta', firstSeen: '2025-08-04', lastSeen: '2026-09-01', postingCount: 48, stylometricScore: 77, isPrimary: true },
  { id: 'HDL-051', actorId: 'ACTOR-DEMO-017', handle: 'PF_Pulse', platform: 'BotMaster Demo', firstSeen: '2025-11-02', lastSeen: '2026-07-14', postingCount: 26, stylometricScore: 71, isPrimary: false },
  { id: 'HDL-052', actorId: 'ACTOR-DEMO-017', handle: 'FiendPulse', platform: 'Synthetic Market Omega', firstSeen: '2026-02-15', lastSeen: '2026-06-10', postingCount: 17, stylometricScore: 65, isPrimary: false },

  // CrimsonHelix (ACTOR-DEMO-018)
  { id: 'HDL-053', actorId: 'ACTOR-DEMO-018', handle: 'CrimsonHelix', platform: 'Synthetic Forum Alpha', firstSeen: '2025-03-12', lastSeen: '2026-09-15', postingCount: 124, stylometricScore: 92, isPrimary: true },
  { id: 'HDL-054', actorId: 'ACTOR-DEMO-018', handle: 'HelixCrimson', platform: 'RansomPortal Demo', firstSeen: '2025-05-28', lastSeen: '2026-08-22', postingCount: 79, stylometricScore: 87, isPrimary: false },
  { id: 'HDL-055', actorId: 'ACTOR-DEMO-018', handle: 'CH_Sec', platform: 'EnterpriseAccess Demo', firstSeen: '2025-09-19', lastSeen: '2026-07-06', postingCount: 44, stylometricScore: 81, isPrimary: false },

  // VoidStrider (ACTOR-DEMO-019)
  { id: 'HDL-056', actorId: 'ACTOR-DEMO-019', handle: 'VoidStrider', platform: 'Synthetic Forum Beta', firstSeen: '2025-10-05', lastSeen: '2026-08-17', postingCount: 42, stylometricScore: 76, isPrimary: true },
  { id: 'HDL-057', actorId: 'ACTOR-DEMO-019', handle: 'StriderVoid', platform: 'OnionDrop Demo', firstSeen: '2025-12-20', lastSeen: '2026-06-18', postingCount: 23, stylometricScore: 70, isPrimary: false },
  { id: 'HDL-058', actorId: 'ACTOR-DEMO-019', handle: 'Void_S', platform: 'CryptID Escrow Hub', firstSeen: '2026-03-04', lastSeen: '2026-07-29', postingCount: 15, stylometricScore: 64, isPrimary: false },

  // TitanForge (ACTOR-DEMO-020)
  { id: 'HDL-059', actorId: 'ACTOR-DEMO-020', handle: 'TitanForge', platform: 'Synthetic Forum Alpha', firstSeen: '2025-02-18', lastSeen: '2026-09-22', postingCount: 133, stylometricScore: 94, isPrimary: true },
  { id: 'HDL-060', actorId: 'ACTOR-DEMO-020', handle: 'TF_Exploit', platform: 'EnterpriseAccess Demo', firstSeen: '2025-05-11', lastSeen: '2026-08-15', postingCount: 86, stylometricScore: 89, isPrimary: false },
  { id: 'HDL-061', actorId: 'ACTOR-DEMO-020', handle: 'Titan_Forge', platform: 'Synthetic Market Omega', firstSeen: '2025-08-29', lastSeen: '2026-07-21', postingCount: 48, stylometricScore: 83, isPrimary: false },

  // EchoBane (ACTOR-DEMO-021)
  { id: 'HDL-062', actorId: 'ACTOR-DEMO-021', handle: 'EchoBane', platform: 'LeakMarket Demo', firstSeen: '2025-06-29', lastSeen: '2026-07-15', postingCount: 57, stylometricScore: 80, isPrimary: true },
  { id: 'HDL-063', actorId: 'ACTOR-DEMO-021', handle: 'BaneEcho', platform: 'Synthetic Forum Alpha', firstSeen: '2025-09-08', lastSeen: '2026-05-24', postingCount: 30, stylometricScore: 73, isPrimary: false },

  // SolarFlare_X (ACTOR-DEMO-022)
  { id: 'HDL-064', actorId: 'ACTOR-DEMO-022', handle: 'SolarFlare_X', platform: 'Synthetic Market Omega', firstSeen: '2025-05-30', lastSeen: '2026-08-25', postingCount: 68, stylometricScore: 83, isPrimary: true },
  { id: 'HDL-065', actorId: 'ACTOR-DEMO-022', handle: 'SF_Flare', platform: 'MalShare Demo Hub', firstSeen: '2025-08-17', lastSeen: '2026-06-12', postingCount: 35, stylometricScore: 77, isPrimary: false },

  // NebulaShroud (ACTOR-DEMO-023)
  { id: 'HDL-066', actorId: 'ACTOR-DEMO-023', handle: 'NebulaShroud', platform: 'Synthetic Forum Beta', firstSeen: '2025-07-19', lastSeen: '2026-09-09', postingCount: 52, stylometricScore: 78, isPrimary: true },

  // QuasarLock (ACTOR-DEMO-024)
  { id: 'HDL-067', actorId: 'ACTOR-DEMO-024', handle: 'QuasarLock', platform: 'Synthetic Forum Alpha', firstSeen: '2025-04-03', lastSeen: '2026-09-24', postingCount: 118, stylometricScore: 91, isPrimary: true },
  { id: 'HDL-068', actorId: 'ACTOR-DEMO-024', handle: 'LockQuasar', platform: 'RansomPortal Demo', firstSeen: '2025-07-14', lastSeen: '2026-08-18', postingCount: 63, stylometricScore: 85, isPrimary: false }
];

export const SYNTHETIC_PGP_KEYS: PGPKeyRecord[] = [
  { id: 'PGP-DEMO-001', actorId: 'ACTOR-DEMO-001', keyId: '0x8A7C93F14E2B5A09', fingerprint: '9B42 81E3 7F04 D291 A48C 5028 8A7C 93F1 4E2B 5A09', algorithm: 'RSA-4096', keyLength: 4096, createdDate: '2025-01-10', associatedEmail: 'shadow_sec@demomail.onion', sourceId: 'SOURCE-DEMO-001', verificationStatus: 'Verified Synthetic' },
  { id: 'PGP-DEMO-002', actorId: 'ACTOR-DEMO-004', keyId: '0x3D19FA07B624E18C', fingerprint: '1C77 92A5 38E4 FB10 9942 6631 3D19 FA07 B624 E18C', algorithm: 'Ed25519', keyLength: 256, createdDate: '2025-03-22', associatedEmail: 'orbit_c2@demomail.onion', sourceId: 'SOURCE-DEMO-003', verificationStatus: 'Verified Synthetic' },
  { id: 'PGP-DEMO-003', actorId: 'ACTOR-DEMO-003', keyId: '0x992FE80112BA47C2', fingerprint: '44FA 19DE 88C1 2003 76DA B432 992F E801 12BA 47C2', algorithm: 'RSA-4096', keyLength: 4096, createdDate: '2025-01-18', associatedEmail: 'byte_escrow@demomail.onion', sourceId: 'SOURCE-DEMO-002', verificationStatus: 'Verified Synthetic' },
  { id: 'PGP-DEMO-004', actorId: 'ACTOR-DEMO-002', keyId: '0x62CA408B1F5E99DA', fingerprint: '810A 32E9 94C2 55A1 18B3 90C4 62CA 408B 1F5E 99DA', algorithm: 'RSA-3072', keyLength: 3072, createdDate: '2025-02-25', associatedEmail: 'cipher_desk@demomail.onion', sourceId: 'SOURCE-DEMO-001', verificationStatus: 'Verified Synthetic' },
  { id: 'PGP-DEMO-005', actorId: 'ACTOR-DEMO-005', keyId: '0x17DEB99204A8F31C', fingerprint: '334B CC81 72FA 9910 4402 11E5 17DE B992 04A8 F31C', algorithm: 'RSA-4096', keyLength: 4096, createdDate: '2025-05-10', associatedEmail: 'corvus_gate@demomail.onion', sourceId: 'SOURCE-DEMO-001', verificationStatus: 'Verified Synthetic' },
  { id: 'PGP-DEMO-006', actorId: 'ACTOR-DEMO-007', keyId: '0x55AE1899DC44018A', fingerprint: '62C8 9914 30FA D412 BB77 8201 55AE 1899 DC44 018A', algorithm: 'Ed25519', keyLength: 256, createdDate: '2025-02-15', associatedEmail: 'root_dev@demomail.onion', sourceId: 'SOURCE-DEMO-003', verificationStatus: 'Verified Synthetic' },
  { id: 'PGP-DEMO-007', actorId: 'ACTOR-DEMO-008', keyId: '0x8841B024FA99E371', fingerprint: '29DA 44E1 8203 11F9 883A 5502 8841 B024 FA99 E371', algorithm: 'RSA-4096', keyLength: 4096, createdDate: '2025-06-28', associatedEmail: 'vector_c2@demomail.onion', sourceId: 'SOURCE-DEMO-002', verificationStatus: 'Verified Synthetic' },
  { id: 'PGP-DEMO-008', actorId: 'ACTOR-DEMO-009', keyId: '0x0984DF112C77BA88', fingerprint: '55E1 77A2 9940 3381 22FA 88C1 0984 DF11 2C77 BA88', algorithm: 'RSA-4096', keyLength: 4096, createdDate: '2025-03-08', associatedEmail: 'strike_ops@demomail.onion', sourceId: 'SOURCE-DEMO-001', verificationStatus: 'Verified Synthetic' },
  { id: 'PGP-DEMO-009', actorId: 'ACTOR-DEMO-011', keyId: '0x44B192A0FE18DC52', fingerprint: '7721 00C4 8832 99B1 A45E 6109 44B1 92A0 FE18 DC52', algorithm: 'RSA-4096', keyLength: 4096, createdDate: '2025-04-14', associatedEmail: 'viper_vault@demomail.onion', sourceId: 'SOURCE-DEMO-001', verificationStatus: 'Verified Synthetic' },
  { id: 'PGP-DEMO-010', actorId: 'ACTOR-DEMO-012', keyId: '0x90C8B114DA2288FE', fingerprint: '11B8 99A4 44C2 8201 77FA 33E5 90C8 B114 DA22 88FE', algorithm: 'Ed25519', keyLength: 256, createdDate: '2025-04-30', associatedEmail: 'reaper_desk@demomail.onion', sourceId: 'SOURCE-DEMO-004', verificationStatus: 'Verified Synthetic' },
  { id: 'PGP-DEMO-011', actorId: 'ACTOR-DEMO-015', keyId: '0x3344BA9102EE771A', fingerprint: '883C 11FA 4402 99E5 22B1 84C9 3344 BA91 02EE 771A', algorithm: 'RSA-4096', keyLength: 4096, createdDate: '2025-01-05', associatedEmail: 'specter_gate@demomail.onion', sourceId: 'SOURCE-DEMO-001', verificationStatus: 'Verified Synthetic' },
  { id: 'PGP-DEMO-012', actorId: 'ACTOR-DEMO-018', keyId: '0xFE8811A2904B77C3', fingerprint: '44A2 8801 33C9 77FA 11B4 92E8 FE88 11A2 904B 77C3', algorithm: 'RSA-4096', keyLength: 4096, createdDate: '2025-03-02', associatedEmail: 'helix_keys@demomail.onion', sourceId: 'SOURCE-DEMO-001', verificationStatus: 'Verified Synthetic' },
  { id: 'PGP-DEMO-013', actorId: 'ACTOR-DEMO-020', keyId: '0x12BA44FE990188C7', fingerprint: '9901 88C7 44FE 12BA 3381 22FA 12BA 44FE 9901 88C7', algorithm: 'RSA-4096', keyLength: 4096, createdDate: '2025-02-10', associatedEmail: 'titan_poc@demomail.onion', sourceId: 'SOURCE-DEMO-001', verificationStatus: 'Verified Synthetic' },
  { id: 'PGP-DEMO-014', actorId: 'ACTOR-DEMO-024', keyId: '0x7799DC18B22044F1', fingerprint: '2204 4F17 799D C18B 883A 11C2 7799 DC18 B220 44F1', algorithm: 'RSA-4096', keyLength: 4096, createdDate: '2025-03-25', associatedEmail: 'lock_escrow@demomail.onion', sourceId: 'SOURCE-DEMO-001', verificationStatus: 'Verified Synthetic' },
  { id: 'PGP-DEMO-015', actorId: 'ACTOR-DEMO-010', keyId: '0x66B40199EF2288A3', fingerprint: '55C1 883A 99B4 0199 11FA 4402 66B4 0199 EF22 88A3', algorithm: 'RSA-2048', keyLength: 2048, createdDate: '2025-07-29', associatedEmail: 'krypton_shop@demomail.onion', sourceId: 'SOURCE-DEMO-002', verificationStatus: 'Verified Synthetic' },
  { id: 'PGP-DEMO-016', actorId: 'ACTOR-DEMO-014', keyId: '0x880299FA4411C7E3', fingerprint: '33E5 11B4 8802 99FA 77C9 2201 8802 99FA 4411 C7E3', algorithm: 'Ed25519', keyLength: 256, createdDate: '2025-06-08', associatedEmail: 'frost_drop@demomail.onion', sourceId: 'SOURCE-DEMO-005', verificationStatus: 'Verified Synthetic' },
  { id: 'PGP-DEMO-017', actorId: 'ACTOR-DEMO-016', keyId: '0x5501B88233C499FE', fingerprint: '77FA 99E5 5501 B882 11B4 4402 5501 B882 33C4 99FE', algorithm: 'RSA-3072', keyLength: 3072, createdDate: '2025-07-12', associatedEmail: 'nexus_lead@demomail.onion', sourceId: 'SOURCE-DEMO-002', verificationStatus: 'Verified Synthetic' },
  { id: 'PGP-DEMO-018', actorId: 'ACTOR-DEMO-022', keyId: '0x9944C118FE0288BA', fingerprint: '11B4 88BA 9944 C118 77FA 33E5 9944 C118 FE02 88BA', algorithm: 'Ed25519', keyLength: 256, createdDate: '2025-05-19', associatedEmail: 'solar_tds@demomail.onion', sourceId: 'SOURCE-DEMO-002', verificationStatus: 'Verified Synthetic' }
];

export const SYNTHETIC_WALLETS: WalletRecord[] = [
  // Linked to ShadowX (ACTOR-DEMO-001) and shared cluster with GhostByte (ACTOR-DEMO-003)
  { id: 'WALLET-DEMO-001', actorId: 'ACTOR-DEMO-001', currency: 'BTC', address: 'bc1q9v8t7z6y5x4w3v2u1t0s9r8q7p6o5n4m3l2k1j', firstActivity: '2025-02-16', lastActivity: '2026-08-20', totalTransactions: 148, estimatedVolumeUSD: 1420000, clusterTag: 'SYNTHETIC-SHADOW-CLUSTER-A', sourceId: 'SOURCE-DEMO-007' },
  { id: 'WALLET-DEMO-004', actorId: 'ACTOR-DEMO-001', currency: 'XMR', address: '888tNkZrPwvH3dFvK91a7mC3kLpQ0xZaV4wYbBnM7sRtU1iOe9pQwErTyUiOpAsDfGhJkLzXcVbNm1234567890abcdef', firstActivity: '2025-04-19', lastActivity: '2026-07-29', totalTransactions: 86, estimatedVolumeUSD: 670000, clusterTag: 'SYNTHETIC-SHADOW-XMR-POOL', sourceId: 'SOURCE-DEMO-007' },

  // NightCipher
  { id: 'WALLET-DEMO-002', actorId: 'ACTOR-DEMO-002', currency: 'BTC', address: 'bc1q4k2m9p8w7y6x5z4v3u2t1s0r9q8p7o6n5m4l3k', firstActivity: '2025-03-05', lastActivity: '2026-08-12', totalTransactions: 62, estimatedVolumeUSD: 890000, clusterTag: 'EXTORTION-COLLECT-02', sourceId: 'SOURCE-DEMO-007' },

  // GhostByte
  { id: 'WALLET-DEMO-003', actorId: 'ACTOR-DEMO-003', currency: 'ETH', address: '0x71C0aB9D214e2E984a923Db4887Fe9825b0147B1', firstActivity: '2025-01-22', lastActivity: '2026-09-01', totalTransactions: 215, estimatedVolumeUSD: 2450000, clusterTag: 'SYNTHETIC-MIXER-INGRESS', sourceId: 'SOURCE-DEMO-007' },
  { id: 'WALLET-DEMO-005', actorId: 'ACTOR-DEMO-003', currency: 'BTC', address: 'bc1q8a7c6e5g4i3k2m1o0q9s8u7w6y5a4c3e2g1i0k', firstActivity: '2025-02-01', lastActivity: '2026-08-25', totalTransactions: 194, estimatedVolumeUSD: 1890000, clusterTag: 'SYNTHETIC-SHADOW-CLUSTER-A', sourceId: 'SOURCE-DEMO-007' },

  // DarkOrbit
  { id: 'WALLET-DEMO-006', actorId: 'ACTOR-DEMO-004', currency: 'USDT', address: '0x4e9ce36e442e55ecd9025b9a6e0d88485d628a67', firstActivity: '2025-04-15', lastActivity: '2026-07-28', totalTransactions: 44, estimatedVolumeUSD: 310000, clusterTag: 'MALWARE-SUBSCRIPTION-POOL', sourceId: 'SOURCE-DEMO-007' },

  // RavenNode
  { id: 'WALLET-DEMO-007', actorId: 'ACTOR-DEMO-005', currency: 'BTC', address: 'bc1q2w3e4r5t6y7u8i9o0p1a2s3d4f5g6h7j8k9l0z', firstActivity: '2025-05-20', lastActivity: '2026-09-10', totalTransactions: 78, estimatedVolumeUSD: 1120000, clusterTag: 'ACCESS-BROKER-ESCROW', sourceId: 'SOURCE-DEMO-007' },

  // ZeroTrace
  { id: 'WALLET-DEMO-008', actorId: 'ACTOR-DEMO-006', currency: 'XMR', address: '84BfGkM1a7mC3kLpQ0xZaV4wYbBnM7sRtU1iOe9pQwErTyUiOpAsDfGhJkLzXcVbNm1234567890abcdef999tNkZrPwvH', firstActivity: '2025-06-08', lastActivity: '2026-07-20', totalTransactions: 19, estimatedVolumeUSD: 95000, clusterTag: 'DISPOSABLE-XMR-OUTLET', sourceId: 'SOURCE-DEMO-007' },

  // PhantomRoot
  { id: 'WALLET-DEMO-009', actorId: 'ACTOR-DEMO-007', currency: 'BTC', address: 'bc1qm4k3l2j1h0g9f8e7d6c5b4a3z2y1x0w9v8u7t6', firstActivity: '2025-03-02', lastActivity: '2026-07-16', totalTransactions: 51, estimatedVolumeUSD: 420000, clusterTag: 'EXPLOIT-ROYALTY-WALLET', sourceId: 'SOURCE-DEMO-007' },

  // SilentVector
  { id: 'WALLET-DEMO-010', actorId: 'ACTOR-DEMO-008', currency: 'BTC', address: 'bc1q1z2x3c4v5b6n7m8a9s0d1f2g3h4j5k6l7q8w9e', firstActivity: '2025-07-10', lastActivity: '2026-09-15', totalTransactions: 67, estimatedVolumeUSD: 540000, clusterTag: 'BOTNET-RENTAL-CHANNEL', sourceId: 'SOURCE-DEMO-007' },

  // CobaltWeaver
  { id: 'WALLET-DEMO-011', actorId: 'ACTOR-DEMO-009', currency: 'BTC', address: 'bc1q9a8b7c6d5e4f3g2h1i0j9k8l7m6n5o4p3q2r1s', firstActivity: '2025-03-18', lastActivity: '2026-08-28', totalTransactions: 92, estimatedVolumeUSD: 1650000, clusterTag: 'BEACON-INFRA-PAYMENTS', sourceId: 'SOURCE-DEMO-007' },

  // KryptonGhost
  { id: 'WALLET-DEMO-012', actorId: 'ACTOR-DEMO-010', currency: 'USDT', address: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce', firstActivity: '2025-08-15', lastActivity: '2026-06-20', totalTransactions: 110, estimatedVolumeUSD: 390000, clusterTag: 'CARDING-GATEWAY-DEPOSIT', sourceId: 'SOURCE-DEMO-007' },

  // ViperLoom
  { id: 'WALLET-DEMO-013', actorId: 'ACTOR-DEMO-011', currency: 'BTC', address: 'bc1q7p6o5n4m3l2k1j0i9h8g7f6e5d4c3b2a1z0y9x', firstActivity: '2025-04-26', lastActivity: '2026-09-06', totalTransactions: 135, estimatedVolumeUSD: 3400000, clusterTag: 'RANSOM-ESCROW-TIER1', sourceId: 'SOURCE-DEMO-007' },

  // OnyxReaper
  { id: 'WALLET-DEMO-014', actorId: 'ACTOR-DEMO-012', currency: 'BTC', address: 'bc1q3m2k1j0i9h8g7f6e5d4c3b2a1z0y9x8w7v6u5t', firstActivity: '2025-05-14', lastActivity: '2026-08-28', totalTransactions: 48, estimatedVolumeUSD: 520000, clusterTag: 'LEAK-BOUNTY-WALLET', sourceId: 'SOURCE-DEMO-007' },

  // AegisNull
  { id: 'WALLET-DEMO-015', actorId: 'ACTOR-DEMO-013', currency: 'XMR', address: '888tNkZrPwvH3dFvK91a7mC3kLpQ0xZaV4wYbBnM7sRtU1iOe9pQwErTyUiOpAsDfGhJkLzXcVbNm998877665544332211', firstActivity: '2025-09-05', lastActivity: '2026-09-18', totalTransactions: 24, estimatedVolumeUSD: 85000, clusterTag: 'ANONYMOUS-RELAY-FUND', sourceId: 'SOURCE-DEMO-007' },

  // FrostByte
  { id: 'WALLET-DEMO-016', actorId: 'ACTOR-DEMO-014', currency: 'BTC', address: 'bc1q5v4u3t2s1r0q9p8o7n6m5l4k3j2i1h0g9f8e7d', firstActivity: '2025-06-20', lastActivity: '2026-07-25', totalTransactions: 55, estimatedVolumeUSD: 410000, clusterTag: 'LOADER-SUBSCRIPTION-INFLOW', sourceId: 'SOURCE-DEMO-007' },

  // IronSpecter
  { id: 'WALLET-DEMO-017', actorId: 'ACTOR-DEMO-015', currency: 'BTC', address: 'bc1q0z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h', firstActivity: '2025-01-20', lastActivity: '2026-09-12', totalTransactions: 84, estimatedVolumeUSD: 1280000, clusterTag: 'SSO-CREDENTIAL-VAULT', sourceId: 'SOURCE-DEMO-007' },

  // NexusDrift
  { id: 'WALLET-DEMO-018', actorId: 'ACTOR-DEMO-016', currency: 'USDT', address: '0x3845badade8e6dff049820680d1f14bd3903a5d0', firstActivity: '2025-07-25', lastActivity: '2026-08-09', totalTransactions: 60, estimatedVolumeUSD: 230000, clusterTag: 'SYNTHETIC-ID-PAYMENTS', sourceId: 'SOURCE-DEMO-007' },

  // PulseFiend
  { id: 'WALLET-DEMO-019', actorId: 'ACTOR-DEMO-017', currency: 'BTC', address: 'bc1q8h7g6f5e4d3c2b1a0z9y8x7w6v5u4t3s2r1q0p', firstActivity: '2025-08-10', lastActivity: '2026-08-28', totalTransactions: 39, estimatedVolumeUSD: 145000, clusterTag: 'BOOTER-SUBSCRIPTIONS', sourceId: 'SOURCE-DEMO-007' },

  // CrimsonHelix
  { id: 'WALLET-DEMO-020', actorId: 'ACTOR-DEMO-018', currency: 'BTC', address: 'bc1q6e5d4c3b2a1z0y9x8w7v6u5t4s3r2q1p0o9n8m', firstActivity: '2025-03-16', lastActivity: '2026-09-12', totalTransactions: 122, estimatedVolumeUSD: 2950000, clusterTag: 'RANSOM-ESCROW-TIER2', sourceId: 'SOURCE-DEMO-007' },

  // VoidStrider
  { id: 'WALLET-DEMO-021', actorId: 'ACTOR-DEMO-019', currency: 'XMR', address: '84BfGkM1a7mC3kLpQ0xZaV4wYbBnM7sRtU1iOe9pQwErTyUiOpAsDfGhJkLzXcVbNm5544332211aabbccddeeff0011', firstActivity: '2025-10-12', lastActivity: '2026-08-14', totalTransactions: 16, estimatedVolumeUSD: 62000, clusterTag: 'STEALTH-AUDIT-GRATUITY', sourceId: 'SOURCE-DEMO-007' },

  // TitanForge
  { id: 'WALLET-DEMO-022', actorId: 'ACTOR-DEMO-020', currency: 'BTC', address: 'bc1q4c3b2a1z0y9x8w7v6u5t4s3r2q1p0o9n8m7l6k', firstActivity: '2025-02-22', lastActivity: '2026-09-20', totalTransactions: 115, estimatedVolumeUSD: 3100000, clusterTag: 'EXPLOIT-DEPOSIT-VAULT', sourceId: 'SOURCE-DEMO-007' },

  // EchoBane
  { id: 'WALLET-DEMO-023', actorId: 'ACTOR-DEMO-021', currency: 'USDT', address: '0x1111111254fb6c44bac0bed2854e76f90643097d', firstActivity: '2025-07-04', lastActivity: '2026-07-10', totalTransactions: 42, estimatedVolumeUSD: 180000, clusterTag: 'BREACH-API-FEES', sourceId: 'SOURCE-DEMO-007' },

  // SolarFlare_X
  { id: 'WALLET-DEMO-024', actorId: 'ACTOR-DEMO-022', currency: 'BTC', address: 'bc1q2a1z0y9x8w7v6u5t4s3r2q1p0o9n8m7l6k5j4i', firstActivity: '2025-06-05', lastActivity: '2026-08-22', totalTransactions: 63, estimatedVolumeUSD: 490000, clusterTag: 'TRAFFIC-FEED-PAYMENTS', sourceId: 'SOURCE-DEMO-007' },

  // NebulaShroud
  { id: 'WALLET-DEMO-025', actorId: 'ACTOR-DEMO-023', currency: 'XMR', address: '888tNkZrPwvH3dFvK91a7mC3kLpQ0xZaV4wYbBnM7sRtU1iOe9pQwErTyUiOpAsDfGhJkLzXcVbNm776655443322119988', firstActivity: '2025-07-24', lastActivity: '2026-09-05', totalTransactions: 28, estimatedVolumeUSD: 110000, clusterTag: 'DGA-NAME-RESOLVER-FEE', sourceId: 'SOURCE-DEMO-007' },

  // QuasarLock
  { id: 'WALLET-DEMO-026', actorId: 'ACTOR-DEMO-024', currency: 'BTC', address: 'bc1q0y9x8w7v6u5t4s3r2q1p0o9n8m7l6k5j4i3h2g', firstActivity: '2025-04-08', lastActivity: '2026-09-22', totalTransactions: 108, estimatedVolumeUSD: 2750000, clusterTag: 'RANSOM-ESCROW-TIER3', sourceId: 'SOURCE-DEMO-007' },

  // Ancillary clustered wallets for multi-hop graph analysis
  { id: 'WALLET-DEMO-027', actorId: 'ACTOR-DEMO-001', currency: 'BTC', address: 'bc1q8w7v6u5t4s3r2q1p0o9n8m7l6k5j4i3h2g1f0e', firstActivity: '2025-08-11', lastActivity: '2026-08-15', totalTransactions: 38, estimatedVolumeUSD: 510000, clusterTag: 'SYNTHETIC-SHADOW-CLUSTER-A', sourceId: 'SOURCE-DEMO-007' },
  { id: 'WALLET-DEMO-028', actorId: 'ACTOR-DEMO-003', currency: 'ETH', address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', firstActivity: '2025-05-19', lastActivity: '2026-08-30', totalTransactions: 74, estimatedVolumeUSD: 1320000, clusterTag: 'SYNTHETIC-MIXER-INGRESS', sourceId: 'SOURCE-DEMO-007' },
  { id: 'WALLET-DEMO-029', actorId: 'ACTOR-DEMO-011', currency: 'BTC', address: 'bc1q6u5t4s3r2q1p0o9n8m7l6k5j4i3h2g1f0e9d8c', firstActivity: '2025-07-22', lastActivity: '2026-09-02', totalTransactions: 66, estimatedVolumeUSD: 1480000, clusterTag: 'RANSOM-ESCROW-TIER1', sourceId: 'SOURCE-DEMO-007' },
  { id: 'WALLET-DEMO-030', actorId: 'ACTOR-DEMO-020', currency: 'BTC', address: 'bc1q4s3r2q1p0o9n8m7l6k5j4i3h2g1f0e9d8c7b6a', firstActivity: '2025-06-14', lastActivity: '2026-09-18', totalTransactions: 52, estimatedVolumeUSD: 1250000, clusterTag: 'EXPLOIT-DEPOSIT-VAULT', sourceId: 'SOURCE-DEMO-007' },
  { id: 'WALLET-DEMO-031', actorId: 'ACTOR-DEMO-018', currency: 'BTC', address: 'bc1q2q1p0o9n8m7l6k5j4i3h2g1f0e9d8c7b6a5z4y', firstActivity: '2025-08-01', lastActivity: '2026-09-10', totalTransactions: 49, estimatedVolumeUSD: 980000, clusterTag: 'RANSOM-ESCROW-TIER2', sourceId: 'SOURCE-DEMO-007' }
];

export const SYNTHETIC_INFRASTRUCTURE: InfrastructureRecord[] = [
  // Primary story infrastructure - shared between ShadowX and NightCipher
  { id: 'INFRA-DEMO-001', actorId: 'ACTOR-DEMO-001', type: 'Domain', value: 'demo-market-01.example', ipAddress: '198.51.100.47', asn: 'AS64501 DEMO-HOST', country: 'NL', certificateFingerprint: 'CERT-DEMO-001: 4a:9f:1b:22:98:e1:5c:20:9b:14', serverBanner: 'nginx/1.24.0 (custom-hardened)', firstSeen: '2025-02-14', lastSeen: '2026-08-21', associatedActors: ['ACTOR-DEMO-001', 'ACTOR-DEMO-002'], sourceId: 'SOURCE-DEMO-008' },
  { id: 'INFRA-DEMO-002', actorId: 'ACTOR-DEMO-001', type: 'Hosting IP', value: '198.51.100.47', ipAddress: '198.51.100.47', asn: 'AS64501 DEMO-HOST', country: 'NL', serverBanner: 'OpenSSH 8.9p1 Ubuntu-3ubuntu0.6', firstSeen: '2025-02-14', lastSeen: '2026-08-21', associatedActors: ['ACTOR-DEMO-001', 'ACTOR-DEMO-002'], sourceId: 'SOURCE-DEMO-008' },
  { id: 'INFRA-DEMO-003', actorId: 'ACTOR-DEMO-001', type: 'TLS Certificate', value: 'CERT-DEMO-001', certificateFingerprint: '4a:9f:1b:22:98:e1:5c:20:9b:14:88:2e:51:7a', firstSeen: '2025-02-15', lastSeen: '2026-08-21', associatedActors: ['ACTOR-DEMO-001', 'ACTOR-DEMO-002'], sourceId: 'SOURCE-DEMO-009' },
  { id: 'INFRA-DEMO-004', actorId: 'ACTOR-DEMO-001', type: 'Tor Onion Service', value: 'shadowx47escrow7kldemomarket.onion', firstSeen: '2025-03-01', lastSeen: '2026-08-19', associatedActors: ['ACTOR-DEMO-001'], sourceId: 'SOURCE-DEMO-001' },

  // NightCipher
  { id: 'INFRA-DEMO-005', actorId: 'ACTOR-DEMO-002', type: 'Domain', value: 'demo-leak-portal-24.example', ipAddress: '198.51.100.52', asn: 'AS64501 DEMO-HOST', country: 'NL', certificateFingerprint: 'CERT-DEMO-002: 8b:1c:33:4f:09:aa:77:12', serverBanner: 'nginx/1.24.0 (custom-hardened)', firstSeen: '2025-03-04', lastSeen: '2026-08-14', associatedActors: ['ACTOR-DEMO-002'], sourceId: 'SOURCE-DEMO-008' },
  { id: 'INFRA-DEMO-006', actorId: 'ACTOR-DEMO-002', type: 'Server Banner', value: 'nginx/1.24.0 (custom-hardened)', firstSeen: '2025-03-04', lastSeen: '2026-08-14', associatedActors: ['ACTOR-DEMO-001', 'ACTOR-DEMO-002'], sourceId: 'SOURCE-DEMO-008' },

  // GhostByte
  { id: 'INFRA-DEMO-007', actorId: 'ACTOR-DEMO-003', type: 'Domain', value: 'demo-mixer-relay-node.example', ipAddress: '203.0.113.88', asn: 'AS64512 CRYPTO-OFFSHORE', country: 'CH', certificateFingerprint: 'CERT-DEMO-003: 1f:22:8a:b9:44:01:ee:63', serverBanner: 'Envoy/1.28.0', firstSeen: '2025-01-25', lastSeen: '2026-09-02', associatedActors: ['ACTOR-DEMO-003'], sourceId: 'SOURCE-DEMO-008' },
  { id: 'INFRA-DEMO-008', actorId: 'ACTOR-DEMO-003', type: 'Tor Onion Service', value: 'ghostbyte8mixernodereceiver.onion', firstSeen: '2025-02-02', lastSeen: '2026-08-31', associatedActors: ['ACTOR-DEMO-003'], sourceId: 'SOURCE-DEMO-002' },

  // DarkOrbit
  { id: 'INFRA-DEMO-009', actorId: 'ACTOR-DEMO-004', type: 'Domain', value: 'demo-payload-delivery-cdn.example', ipAddress: '198.51.100.91', asn: 'AS64502 CLOUD-BULLETPROOF', country: 'RO', certificateFingerprint: 'CERT-DEMO-004: 9a:88:21:44:ff:02:bb:71', serverBanner: 'Apache/2.4.58 (Unix)', firstSeen: '2025-04-12', lastSeen: '2026-07-30', associatedActors: ['ACTOR-DEMO-004'], sourceId: 'SOURCE-DEMO-008' },
  { id: 'INFRA-DEMO-010', actorId: 'ACTOR-DEMO-004', type: 'Hosting IP', value: '198.51.100.91', ipAddress: '198.51.100.91', asn: 'AS64502 CLOUD-BULLETPROOF', country: 'RO', firstSeen: '2025-04-12', lastSeen: '2026-07-30', associatedActors: ['ACTOR-DEMO-004'], sourceId: 'SOURCE-DEMO-008' },

  // RavenNode
  { id: 'INFRA-DEMO-011', actorId: 'ACTOR-DEMO-005', type: 'Domain', value: 'demo-access-broker-brokerage.example', ipAddress: '203.0.113.104', asn: 'AS64515 BALTIC-TRANSIT', country: 'LV', certificateFingerprint: 'CERT-DEMO-005: 33:fa:88:c1:09:44:2e:51', serverBanner: 'nginx/1.22.1', firstSeen: '2025-05-22', lastSeen: '2026-09-12', associatedActors: ['ACTOR-DEMO-005'], sourceId: 'SOURCE-DEMO-008' },
  { id: 'INFRA-DEMO-012', actorId: 'ACTOR-DEMO-005', type: 'Tor Onion Service', value: 'corvusgateenterpriseaccess99.onion', firstSeen: '2025-06-01', lastSeen: '2026-09-10', associatedActors: ['ACTOR-DEMO-005'], sourceId: 'SOURCE-DEMO-001' },

  // ZeroTrace
  { id: 'INFRA-DEMO-013', actorId: 'ACTOR-DEMO-006', type: 'Tor Onion Service', value: 'zerotraceoniondropexchange0.onion', firstSeen: '2025-06-05', lastSeen: '2026-08-05', associatedActors: ['ACTOR-DEMO-006'], sourceId: 'SOURCE-DEMO-006' },

  // PhantomRoot
  { id: 'INFRA-DEMO-014', actorId: 'ACTOR-DEMO-007', type: 'Domain', value: 'demo-rootkit-repo-vault.example', ipAddress: '198.51.100.119', asn: 'AS64502 CLOUD-BULLETPROOF', country: 'RO', certificateFingerprint: 'CERT-DEMO-006: e1:44:88:2a:b1:90:3f:77', serverBanner: 'Caddy v2.7.6', firstSeen: '2025-03-05', lastSeen: '2026-07-19', associatedActors: ['ACTOR-DEMO-007'], sourceId: 'SOURCE-DEMO-008' },

  // SilentVector
  { id: 'INFRA-DEMO-015', actorId: 'ACTOR-DEMO-008', type: 'Nameserver', value: 'ns1.demo-fastflux-vector.example', ipAddress: '203.0.113.140', asn: 'AS64520 HOST-GLOBAL-ROUTE', country: 'PA', firstSeen: '2025-07-08', lastSeen: '2026-09-18', associatedActors: ['ACTOR-DEMO-008'], sourceId: 'SOURCE-DEMO-008' },
  { id: 'INFRA-DEMO-016', actorId: 'ACTOR-DEMO-008', type: 'Hosting IP', value: '203.0.113.140', ipAddress: '203.0.113.140', asn: 'AS64520 HOST-GLOBAL-ROUTE', country: 'PA', serverBanner: 'nginx/1.25.3', firstSeen: '2025-07-08', lastSeen: '2026-09-18', associatedActors: ['ACTOR-DEMO-008'], sourceId: 'SOURCE-DEMO-008' },

  // CobaltWeaver
  { id: 'INFRA-DEMO-017', actorId: 'ACTOR-DEMO-009', type: 'Domain', value: 'demo-malleable-c2-beacon.example', ipAddress: '198.51.100.165', asn: 'AS64501 DEMO-HOST', country: 'NL', certificateFingerprint: 'CERT-DEMO-007: 77:a2:99:c4:11:8b:2e:50', serverBanner: 'Microsoft-IIS/10.0 (custom-spoofed)', firstSeen: '2025-03-20', lastSeen: '2026-08-29', associatedActors: ['ACTOR-DEMO-009'], sourceId: 'SOURCE-DEMO-008' },
  { id: 'INFRA-DEMO-018', actorId: 'ACTOR-DEMO-009', type: 'Hosting IP', value: '198.51.100.165', ipAddress: '198.51.100.165', asn: 'AS64501 DEMO-HOST', country: 'NL', firstSeen: '2025-03-20', lastSeen: '2026-08-29', associatedActors: ['ACTOR-DEMO-009'], sourceId: 'SOURCE-DEMO-008' },

  // KryptonGhost
  { id: 'INFRA-DEMO-019', actorId: 'ACTOR-DEMO-010', type: 'Domain', value: 'demo-autoshop-dump-check.example', ipAddress: '203.0.113.177', asn: 'AS64525 SECURE-ISLANDS', country: 'SC', certificateFingerprint: 'CERT-DEMO-008: 55:c1:09:44:88:b2:1a:99', serverBanner: 'nginx/1.24.0', firstSeen: '2025-08-16', lastSeen: '2026-06-25', associatedActors: ['ACTOR-DEMO-010'], sourceId: 'SOURCE-DEMO-008' },

  // ViperLoom
  { id: 'INFRA-DEMO-020', actorId: 'ACTOR-DEMO-011', type: 'Domain', value: 'demo-ransom-portal-victims.example', ipAddress: '198.51.100.198', asn: 'AS64505 SHIELD-OFFSHORE', country: 'IS', certificateFingerprint: 'CERT-DEMO-009: 22:8a:b9:44:01:ee:63:1f', serverBanner: 'OpenResty/1.25.3.1', firstSeen: '2025-04-28', lastSeen: '2026-09-08', associatedActors: ['ACTOR-DEMO-011'], sourceId: 'SOURCE-DEMO-008' },
  { id: 'INFRA-DEMO-021', actorId: 'ACTOR-DEMO-011', type: 'Tor Onion Service', value: 'viperloomsupportextortportal.onion', firstSeen: '2025-05-01', lastSeen: '2026-09-08', associatedActors: ['ACTOR-DEMO-011'], sourceId: 'SOURCE-DEMO-001' },

  // OnyxReaper
  { id: 'INFRA-DEMO-022', actorId: 'ACTOR-DEMO-012', type: 'Domain', value: 'demo-leak-distribution-repo.example', ipAddress: '203.0.113.210', asn: 'AS64530 FAST-NETWORK-CORP', country: 'BG', certificateFingerprint: 'CERT-DEMO-010: 90:11:44:82:77:c9:33:fa', serverBanner: 'nginx/1.22.0', firstSeen: '2025-05-15', lastSeen: '2026-08-30', associatedActors: ['ACTOR-DEMO-012'], sourceId: 'SOURCE-DEMO-008' },

  // AegisNull
  { id: 'INFRA-DEMO-023', actorId: 'ACTOR-DEMO-013', type: 'Hosting IP', value: '198.51.100.222', ipAddress: '198.51.100.222', asn: 'AS64506 NORDIC-SHADOW', country: 'SE', serverBanner: 'OpenSSH 9.3p1 Debian-1', firstSeen: '2025-09-08', lastSeen: '2026-09-20', associatedActors: ['ACTOR-DEMO-013'], sourceId: 'SOURCE-DEMO-008' },

  // FrostByte
  { id: 'INFRA-DEMO-024', actorId: 'ACTOR-DEMO-014', type: 'Domain', value: 'demo-dropper-payload-gateway.example', ipAddress: '203.0.113.235', asn: 'AS64510 EASTERN-ROUTE', country: 'UA', certificateFingerprint: 'CERT-DEMO-011: 33:e5:11:b4:88:02:99:fa', serverBanner: 'Apache/2.4.57', firstSeen: '2025-06-22', lastSeen: '2026-07-28', associatedActors: ['ACTOR-DEMO-014'], sourceId: 'SOURCE-DEMO-008' },

  // IronSpecter
  { id: 'INFRA-DEMO-025', actorId: 'ACTOR-DEMO-015', type: 'Domain', value: 'demo-sso-credential-exchange.example', ipAddress: '198.51.100.244', asn: 'AS64501 DEMO-HOST', country: 'NL', certificateFingerprint: 'CERT-DEMO-012: 88:3c:11:fa:44:02:99:e5', serverBanner: 'nginx/1.24.0 (custom-hardened)', firstSeen: '2025-01-28', lastSeen: '2026-09-14', associatedActors: ['ACTOR-DEMO-015'], sourceId: 'SOURCE-DEMO-008' },

  // NexusDrift
  { id: 'INFRA-DEMO-026', actorId: 'ACTOR-DEMO-016', type: 'Domain', value: 'demo-identity-archive-lookup.example', ipAddress: '203.0.113.250', asn: 'AS64518 CARIBBEAN-TRANSIT', country: 'BZ', certificateFingerprint: 'CERT-DEMO-013: 77:fa:99:e5:55:01:b8:82', serverBanner: 'lighttpd/1.4.69', firstSeen: '2025-07-28', lastSeen: '2026-08-11', associatedActors: ['ACTOR-DEMO-016'], sourceId: 'SOURCE-DEMO-008' },

  // PulseFiend
  { id: 'INFRA-DEMO-027', actorId: 'ACTOR-DEMO-017', type: 'Hosting IP', value: '198.51.100.78', ipAddress: '198.51.100.78', asn: 'AS64508 BOOTER-HOST-SYS', country: 'TR', serverBanner: 'nginx/1.20.2', firstSeen: '2025-08-12', lastSeen: '2026-09-01', associatedActors: ['ACTOR-DEMO-017'], sourceId: 'SOURCE-DEMO-008' },

  // CrimsonHelix
  { id: 'INFRA-DEMO-028', actorId: 'ACTOR-DEMO-018', type: 'Tor Onion Service', value: 'crimsonhelixdecryptersite99.onion', firstSeen: '2025-03-20', lastSeen: '2026-09-15', associatedActors: ['ACTOR-DEMO-018'], sourceId: 'SOURCE-DEMO-001' },
  { id: 'INFRA-DEMO-029', actorId: 'ACTOR-DEMO-018', type: 'Domain', value: 'demo-ransom-helix-gateway.example', ipAddress: '198.51.100.180', asn: 'AS64505 SHIELD-OFFSHORE', country: 'IS', certificateFingerprint: 'CERT-DEMO-014: 44:a2:88:01:33:c9:77:fa', serverBanner: 'OpenResty/1.25.3.1', firstSeen: '2025-04-05', lastSeen: '2026-09-15', associatedActors: ['ACTOR-DEMO-018'], sourceId: 'SOURCE-DEMO-008' },

  // VoidStrider
  { id: 'INFRA-DEMO-030', actorId: 'ACTOR-DEMO-019', type: 'Tor Onion Service', value: 'voidstridersecresearchnode.onion', firstSeen: '2025-10-18', lastSeen: '2026-08-17', associatedActors: ['ACTOR-DEMO-019'], sourceId: 'SOURCE-DEMO-006' },

  // TitanForge
  { id: 'INFRA-DEMO-031', actorId: 'ACTOR-DEMO-020', type: 'Domain', value: 'demo-titan-exploit-poc.example', ipAddress: '203.0.113.12', asn: 'AS64501 DEMO-HOST', country: 'NL', certificateFingerprint: 'CERT-DEMO-015: 99:01:88:c7:44:fe:12:ba', serverBanner: 'nginx/1.24.0 (custom-hardened)', firstSeen: '2025-02-25', lastSeen: '2026-09-22', associatedActors: ['ACTOR-DEMO-020'], sourceId: 'SOURCE-DEMO-008' },
  { id: 'INFRA-DEMO-032', actorId: 'ACTOR-DEMO-020', type: 'Hosting IP', value: '203.0.113.12', ipAddress: '203.0.113.12', asn: 'AS64501 DEMO-HOST', country: 'NL', firstSeen: '2025-02-25', lastSeen: '2026-09-22', associatedActors: ['ACTOR-DEMO-020'], sourceId: 'SOURCE-DEMO-008' },

  // EchoBane
  { id: 'INFRA-DEMO-033', actorId: 'ACTOR-DEMO-021', type: 'Domain', value: 'demo-echobane-leak-mirror.example', ipAddress: '198.51.100.201', asn: 'AS64530 FAST-NETWORK-CORP', country: 'BG', certificateFingerprint: 'CERT-DEMO-016: 11:11:88:22:99:33:cc:aa', serverBanner: 'nginx/1.24.0', firstSeen: '2025-07-06', lastSeen: '2026-07-15', associatedActors: ['ACTOR-DEMO-021'], sourceId: 'SOURCE-DEMO-008' },

  // SolarFlare_X
  { id: 'INFRA-DEMO-034', actorId: 'ACTOR-DEMO-022', type: 'Domain', value: 'demo-solarflare-tds-router.example', ipAddress: '203.0.113.66', asn: 'AS64511 GLOBAL-TDS-NET', country: 'CY', certificateFingerprint: 'CERT-DEMO-017: 11:b4:88:ba:99:44:c1:18', serverBanner: 'nginx/1.25.1', firstSeen: '2025-06-10', lastSeen: '2026-08-25', associatedActors: ['ACTOR-DEMO-022'], sourceId: 'SOURCE-DEMO-008' },

  // NebulaShroud
  { id: 'INFRA-DEMO-035', actorId: 'ACTOR-DEMO-023', type: 'Nameserver', value: 'ns1.demo-dga-resolv-shroud.example', ipAddress: '198.51.100.111', asn: 'AS64520 HOST-GLOBAL-ROUTE', country: 'PA', firstSeen: '2025-07-28', lastSeen: '2026-09-09', associatedActors: ['ACTOR-DEMO-023'], sourceId: 'SOURCE-DEMO-008' },

  // QuasarLock
  { id: 'INFRA-DEMO-036', actorId: 'ACTOR-DEMO-024', type: 'Tor Onion Service', value: 'quasarlockpayportal9924desk.onion', firstSeen: '2025-04-10', lastSeen: '2026-09-24', associatedActors: ['ACTOR-DEMO-024'], sourceId: 'SOURCE-DEMO-001' },
  { id: 'INFRA-DEMO-037', actorId: 'ACTOR-DEMO-024', type: 'Domain', value: 'demo-quasarlock-affiliate-escrow.example', ipAddress: '203.0.113.99', asn: 'AS64505 SHIELD-OFFSHORE', country: 'IS', certificateFingerprint: 'CERT-DEMO-018: 22:04:4f:17:79:9d:c1:8b', serverBanner: 'OpenResty/1.25.3.1', firstSeen: '2025-04-18', lastSeen: '2026-09-24', associatedActors: ['ACTOR-DEMO-024'], sourceId: 'SOURCE-DEMO-008' },

  // Shared infrastructure nodes for cross-correlation analysis
  { id: 'INFRA-DEMO-038', actorId: 'ACTOR-DEMO-001', type: 'Nameserver', value: 'ns1.demo-shadow-dns-bulletproof.example', ipAddress: '198.51.100.48', asn: 'AS64501 DEMO-HOST', country: 'NL', firstSeen: '2025-02-20', lastSeen: '2026-08-21', associatedActors: ['ACTOR-DEMO-001', 'ACTOR-DEMO-002', 'ACTOR-DEMO-020'], sourceId: 'SOURCE-DEMO-008' },
  { id: 'INFRA-DEMO-039', actorId: 'ACTOR-DEMO-009', type: 'Server Banner', value: 'OpenSSH 8.9p1 Ubuntu-3ubuntu0.6', firstSeen: '2025-03-22', lastSeen: '2026-08-29', associatedActors: ['ACTOR-DEMO-001', 'ACTOR-DEMO-009', 'ACTOR-DEMO-015'], sourceId: 'SOURCE-DEMO-008' },
  { id: 'INFRA-DEMO-040', actorId: 'ACTOR-DEMO-011', type: 'Server Banner', value: 'OpenResty/1.25.3.1', firstSeen: '2025-04-28', lastSeen: '2026-09-24', associatedActors: ['ACTOR-DEMO-011', 'ACTOR-DEMO-018', 'ACTOR-DEMO-024'], sourceId: 'SOURCE-DEMO-008' },
  { id: 'INFRA-DEMO-041', actorId: 'ACTOR-DEMO-003', type: 'Hosting IP', value: '203.0.113.88', ipAddress: '203.0.113.88', asn: 'AS64512 CRYPTO-OFFSHORE', country: 'CH', firstSeen: '2025-01-25', lastSeen: '2026-09-02', associatedActors: ['ACTOR-DEMO-003'], sourceId: 'SOURCE-DEMO-008' },
  { id: 'INFRA-DEMO-042', actorId: 'ACTOR-DEMO-015', type: 'TLS Certificate', value: 'CERT-DEMO-019', certificateFingerprint: '55:99:aa:12:44:bb:77:88:cc:33', firstSeen: '2025-02-12', lastSeen: '2026-08-28', associatedActors: ['ACTOR-DEMO-015', 'ACTOR-DEMO-020'], sourceId: 'SOURCE-DEMO-009' }
];
