import React, { useState } from 'react';
import { ShieldAlert, X } from 'lucide-react';

export const BannerSynthetic: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-blue-50 border-b border-blue-200/80 px-4 py-2 text-xs text-blue-900 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            <strong className="font-semibold text-blue-950">Academic Cybersecurity Platform:</strong> All dark-web personas, handles, PGP keys, wallet addresses, and infrastructure shown are entirely synthetic demo entities for research purposes. No live illicit networks are crawled.
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-blue-700 hover:text-blue-950 shrink-0 p-0.5 rounded transition-colors"
          title="Dismiss notification"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
