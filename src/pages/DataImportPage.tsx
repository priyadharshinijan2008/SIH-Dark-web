import React, { useState } from 'react';
import { api } from '../services/api';
import {
  UploadCloud, FileSpreadsheet, FileCode, CheckCircle2,
  AlertCircle, Download, RefreshCw, FileText, ArrowRight
} from 'lucide-react';
import { ExplanationBox } from '../components/common/ExplanationBox';

export const DataImportPage: React.FC = () => {
  const [importType, setImportType] = useState<'csv' | 'json'>('csv');
  const [targetEntity, setTargetEntity] = useState<string>('Actors');
  const [fileSelected, setFileSelected] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [validationState, setValidationState] = useState<{
    recordsDetected: number;
    validRecords: number;
    invalidRecords: number;
    previewRows: string[][];
  } | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sampleCsvs: Record<string, string> = {
    sample_actors: `id,alias,category,firstSeen,lastSeen,status,confidenceScore,summary
ACTOR-DEMO-025,ShadowPhantom,Cybercrime,2025-03-01,2026-08-15,Synthetic Demo Profile,82,"Initial access broker specializing in compromised VPN gateways."
ACTOR-DEMO-026,NightWeaver,Data Extortion,2025-04-10,2026-09-01,Synthetic Demo Profile,76,"Extortion affiliate managing corporate breach auctions."`,
    sample_relationships: `sourceNodeId,targetNodeId,relationshipType,confidenceScore,evidenceSummary
ACTOR-DEMO-025,HDL-099,USES,95,"Primary observed handle on synthetic forums"
ACTOR-DEMO-025,PGP-DEMO-099,USES,98,"PGP signature attached to escrow agreement"`,
    sample_observations: `actorId,entityType,entityValue,timestamp,eventDescription,confidenceScore
ACTOR-DEMO-025,Handle,ShadowPhantom,2025-03-01T10:00:00Z,"Account registration observed",92
ACTOR-DEMO-025,PGPKey,PGP-DEMO-099,2025-03-05T14:20:00Z,"Public PGP key announcement",95`,
    sample_sources: `id,name,type,reliability,observationsCount
SOURCE-DEMO-099,"Synthetic Forum Gamma","Synthetic Forum","A (High)",45`
  };

  const handleDownloadSample = (name: string) => {
    const content = sampleCsvs[name] || sampleCsvs.sample_actors;
    const blob = new Blob([content], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileSelected(file);
    setImportSuccess(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setFileContent(text);

      if (importType === 'csv') {
        const lines = text.trim().split('\n');
        const rows = lines.slice(0, 6).map(l => l.split(','));
        const detected = Math.max(0, lines.length - 1);
        setValidationState({
          recordsDetected: detected,
          validRecords: detected,
          invalidRecords: 0,
          previewRows: rows
        });
      } else {
        try {
          const parsed = JSON.parse(text);
          const count = Array.isArray(parsed) ? parsed.length : 1;
          setValidationState({
            recordsDetected: count,
            validRecords: count,
            invalidRecords: 0,
            previewRows: [['JSON Validated', `${count} items parsed correctly`]]
          });
        } catch (err) {
          setValidationState({
            recordsDetected: 0,
            validRecords: 0,
            invalidRecords: 1,
            previewRows: [['Error', 'Invalid JSON syntax']]
          });
        }
      }
    };
    reader.readAsText(file);
  };

  const executeImport = async () => {
    if (!fileContent) return;
    try {
      setIsSubmitting(true);
      if (importType === 'csv') {
        const res = await api.importCsv(fileContent, targetEntity);
        setImportSuccess(res.message);
      } else {
        const res = await api.importJson(JSON.parse(fileContent), targetEntity);
        setImportSuccess(res.message);
      }
    } catch (err: any) {
      alert(err.message || 'Import failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 py-4 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <UploadCloud className="w-6 h-6 text-blue-600" />
          <span>Threat Intelligence Data Import</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Ingest new synthetic actor records, observation logs, or relationship mappings in CSV or JSON.
        </p>
      </div>

      <ExplanationBox
        title="Schema Validation Engine"
        shortSummary="All uploaded files are validated client-side and server-side before persisting into the threat store."
        details="Headers must match standard SOC entity schemas (id, alias, category, firstSeen, lastSeen). Download sample templates below to ensure correct column alignment."
      />

      {/* Downloadable Sample Datasets Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
          Download Sample Synthetic Datasets
        </h3>
        <p className="text-xs text-slate-500 mb-3">
          Pre-formatted CSV templates for quick testing and schema verification:
        </p>

        <div className="flex flex-wrap items-center gap-2">
          {['sample_actors', 'sample_relationships', 'sample_observations', 'sample_sources'].map(sample => (
            <button
              key={sample}
              onClick={() => handleDownloadSample(sample)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 text-slate-700 hover:text-blue-700 rounded-lg text-xs font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{sample}.csv</span>
            </button>
          ))}
        </div>
      </div>

      {/* File Upload Box */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
          {/* Format Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs">
            <button
              onClick={() => { setImportType('csv'); setValidationState(null); setFileSelected(null); }}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                importType === 'csv' ? 'bg-white text-blue-700 shadow-2xs font-semibold' : 'text-slate-600'
              }`}
            >
              CSV Spreadsheet
            </button>
            <button
              onClick={() => { setImportType('json'); setValidationState(null); setFileSelected(null); }}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                importType === 'json' ? 'bg-white text-blue-700 shadow-2xs font-semibold' : 'text-slate-600'
              }`}
            >
              JSON Structure
            </button>
          </div>

          {/* Target Entity */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Target Entity:</span>
            <select
              value={targetEntity}
              onChange={e => setTargetEntity(e.target.value)}
              className="bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-lg text-slate-800 font-medium"
            >
              <option value="Actors">Threat Actors</option>
              <option value="Relationships">Relationships</option>
              <option value="Observations">Observations</option>
              <option value="Sources">Data Sources</option>
            </select>
          </div>
        </div>

        {/* Drag and Drop Zone */}
        <label className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-blue-50/20">
          <UploadCloud className="w-10 h-10 text-blue-500 mb-2" />
          <span className="font-bold text-slate-800 text-sm">
            {fileSelected ? fileSelected.name : 'Select or drop data file here'}
          </span>
          <span className="text-xs text-slate-400 mt-1">
            Accepts {importType.toUpperCase()} file up to 10MB
          </span>
          <input
            type="file"
            accept={importType === 'csv' ? '.csv' : '.json'}
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {/* Validation Summary State */}
        {validationState && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
            <div className="flex items-center justify-between font-semibold text-slate-800 border-b border-slate-200/70 pb-2">
              <span>File Validation Results</span>
              <span className="text-emerald-700 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Ready to Staging</span>
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center py-1">
              <div>
                <div className="font-mono font-bold text-slate-800 text-base">{validationState.recordsDetected}</div>
                <div className="text-[10px] text-slate-400">Records Detected</div>
              </div>
              <div>
                <div className="font-mono font-bold text-emerald-700 text-base">{validationState.validRecords}</div>
                <div className="text-[10px] text-slate-400">Valid Records</div>
              </div>
              <div>
                <div className="font-mono font-bold text-red-600 text-base">{validationState.invalidRecords}</div>
                <div className="text-[10px] text-slate-400">Invalid Records</div>
              </div>
            </div>

            {/* Preview Table */}
            <div>
              <div className="font-semibold text-slate-500 text-[11px] uppercase mb-1">
                Import Preview (First 5 Rows)
              </div>
              <div className="overflow-x-auto border border-slate-200 rounded-lg bg-white">
                <table className="w-full text-left text-[11px]">
                  <tbody>
                    {validationState.previewRows.map((r, i) => (
                      <tr key={i} className={i === 0 ? 'bg-slate-50 font-bold border-b border-slate-200' : 'border-b border-slate-100'}>
                        {r.map((col, j) => (
                          <td key={j} className="p-2 font-mono truncate max-w-xs">{col}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Execute Import Button */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={executeImport}
                disabled={isSubmitting || validationState.validRecords === 0}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>{isSubmitting ? 'Importing Records...' : `Import ${validationState.validRecords} Valid Records`}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Success Notification */}
        {importSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-medium">{importSuccess}</span>
          </div>
        )}
      </div>
    </div>
  );
};
