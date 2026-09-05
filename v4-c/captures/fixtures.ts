// One synthetic account for every screen; no real API or authenticated session.
export const me = async () => ({ user: { id: 1, name: 'Sofía Giménez', status: 'active', coverage: 'Meridiano OS' } });
export const meConsultation = async () => ({ consultation: null });
export const myRequest = async () => ({ request: null });
export const myAppointments = async () => ({ appointments: [{ id: 1, status: 'booked', start_at: '2026-09-05 13:30:00', doctor_name: 'Dra. Lucía Bravo', specialty: 'Pediatría' }] });
export const myPrescriptions = async () => ({ prescriptions: [
  { id: 1, status: 'ready', document_type: 'receta', diagnosis: 'Faringitis aguda', doctor_name: 'Dra. Carla Méndez', date: '2026-09-04 12:30:00' },
  { id: 2, status: 'ready', document_type: 'receta', diagnosis: 'Rinitis alérgica', doctor_name: 'Dr. Martín Sosa', date: '2026-08-28 14:00:00' },
] });
const disabled = () => { throw Error('Identity submission is disabled in capture'); };
export const checkIdentityDocument = disabled;
export const checkIdentitySelfie = disabled;
export const getIdentityVerification = disabled;
export const submitIdentitySelfie = disabled;
export const isApiError = () => false;

// Synthetic document shown by the real patient prescription-detail screen.
export const prescriptionDetail = async () => ({
  prescription: { id: 1, status: 'ready', document_type: 'receta', number: 'DEMO-004821', date: '2026-09-04 12:30:00', diagnosis: 'Faringitis aguda', icd10_code: 'J02.9', icd10_label: null, free_text_notes: null },
  patient: { name: 'Sofía Giménez', national_id: null, birth_date: null, sex: 'F' },
  doctor: { name: 'Dra. Carla Méndez', specialty: 'clinica medica', license_number: '154892' },
  insurer: { name: 'Meridiano OS' }, affiliate_number: 'MER-018429',
  items: [{ type: 'medication', active_ingredient: 'Paracetamol', strength: '500 mg', presentation: 'Comprimidos · caja x 20', quantity: 1, dosage: '1 comprimido cada 8 horas si hay fiebre o dolor, por hasta 3 días.', description: null }],
});
export const prescriptionPdfUrl = () => { throw Error('PDF requests are disabled in capture'); };
