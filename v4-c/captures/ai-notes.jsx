import React from 'react';
import { createRoot } from 'react-dom/client';
import { AiNotesPanel } from '@doctor/ai-notes-panel.jsx';
import { MedApi } from '@doctor/api.js';

// Synthetic consultation; render the product component without any backend access.
for (const name of Object.keys(MedApi.endpoints)) {
  MedApi.endpoints[name] = async () => { throw Error(`Unexpected capture endpoint: ${name}`); };
}
Object.assign(MedApi.endpoints, {
  aiNotesState: async () => ({ ai_notes: { state: 'active' }, delivery: { status: 'ready', attempts: 1, retryable: false } }),
  getAiDraft: async () => ({
    consultation_id: 48217, is_final: true, pipeline_status: 'done', updated_at: '2026-09-04 12:30:00',
    narrative: [
      'Sofía Giménez consulta por dolor de garganta, rinorrea y fiebre de hasta 38 °C de 48 horas de evolución. Refiere tolerancia a líquidos y niega dificultad respiratoria o alergias medicamentosas.',
      'Durante la videollamada se observa en buen estado general, lúcida y sin signos visibles de dificultad respiratoria. El cuadro es compatible con faringitis aguda de probable etiología viral.',
      'Se indica tratamiento sintomático, hidratación y reposo. Se explican pautas de alarma y control médico si los síntomas persisten o empeoran.',
    ].join('\n\n'),
  }),
});
createRoot(document.getElementById('root')).render(
  <AiNotesPanel consultationId={48217} active lifecycleState="active" />,
);
