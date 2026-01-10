/**
 * Bahmni/OpenMRS API Service
 * Provides methods to interact with OpenMRS REST API
 * Compatible with Bahmni backend
 */

import {
  Patient,
  Visit,
  Encounter,
  Observation,
  Order,
  DrugOrder,
  TestOrder,
  Concept,
  Drug,
  LabTest,
  PatientBill,
  Provider,
  Location,
  OpenMRSResponse,
  BahmniSearchResponse,
} from '@/types/bahmni';

// API Base URLs - configurable via environment
const OPENMRS_BASE_URL = process.env.NEXT_PUBLIC_OPENMRS_URL || '/openmrs';
const BAHMNI_BASE_URL = process.env.NEXT_PUBLIC_BAHMNI_URL || '/bahmni';

// Helper to build full URL
const buildUrl = (base: string, path: string, params?: Record<string, string>) => {
  const url = new URL(`${base}${path}`, window.location.origin);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value);
      }
    });
  }
  return url.toString();
};

// Default fetch options
const defaultOptions: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  credentials: 'include', // Include cookies for session auth
};

// Generic API request handler
async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(url, {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || `API Error: ${response.status}`);
  }

  return response.json();
}

// ==================== Patient API ====================

export const patientApi = {
  /**
   * Search patients by identifier
   * GET /openmrs/ws/rest/v1/patient?identifier={id}
   */
  searchByIdentifier: async (identifier: string): Promise<Patient[]> => {
    const url = buildUrl(OPENMRS_BASE_URL, '/ws/rest/v1/patient', {
      identifier,
      v: 'full',
    });
    const response = await apiRequest<OpenMRSResponse<Patient>>(url);
    return response.results;
  },

  /**
   * Search patients by name
   * GET /openmrs/ws/rest/v1/patient?q={name}
   */
  searchByName: async (name: string): Promise<Patient[]> => {
    const url = buildUrl(OPENMRS_BASE_URL, '/ws/rest/v1/patient', {
      q: name,
      v: 'full',
    });
    const response = await apiRequest<OpenMRSResponse<Patient>>(url);
    return response.results;
  },

  /**
   * Search patients using Bahmni search (more features)
   * GET /bahmni/search/patient
   */
  bahmniSearch: async (params: {
    identifier?: string;
    name?: string;
    address?: string;
    customAttribute?: string;
    programAttributeFieldValue?: string;
    addressFieldValue?: string;
    startIndex?: number;
    pageSize?: number;
  }): Promise<BahmniSearchResponse<Patient>> => {
    const url = buildUrl(`${BAHMNI_BASE_URL}`, '/search/patient', {
      identifier: params.identifier || '',
      name: params.name || '',
      address: params.address || '',
      customAttribute: params.customAttribute || '',
      startIndex: String(params.startIndex || 0),
      pageSize: String(params.pageSize || 10),
    });
    return apiRequest<BahmniSearchResponse<Patient>>(url);
  },

  /**
   * Get patient by UUID
   * GET /openmrs/ws/rest/v1/patient/{uuid}
   */
  getByUuid: async (uuid: string): Promise<Patient> => {
    const url = buildUrl(OPENMRS_BASE_URL, `/ws/rest/v1/patient/${uuid}`, {
      v: 'full',
    });
    return apiRequest<Patient>(url);
  },

  /**
   * Create new patient
   * POST /openmrs/ws/rest/v1/patient
   */
  create: async (patient: Partial<Patient>): Promise<Patient> => {
    const url = buildUrl(OPENMRS_BASE_URL, '/ws/rest/v1/patient');
    return apiRequest<Patient>(url, {
      method: 'POST',
      body: JSON.stringify(patient),
    });
  },

  /**
   * Update patient
   * POST /openmrs/ws/rest/v1/patient/{uuid}
   */
  update: async (uuid: string, patient: Partial<Patient>): Promise<Patient> => {
    const url = buildUrl(OPENMRS_BASE_URL, `/ws/rest/v1/patient/${uuid}`);
    return apiRequest<Patient>(url, {
      method: 'POST',
      body: JSON.stringify(patient),
    });
  },
};

// ==================== Visit API ====================

export const visitApi = {
  /**
   * Get active visit for patient
   * GET /openmrs/ws/rest/v1/visit?patient={patientUuid}&includeInactive=false
   */
  getActiveVisit: async (patientUuid: string): Promise<Visit | null> => {
    const url = buildUrl(OPENMRS_BASE_URL, '/ws/rest/v1/visit', {
      patient: patientUuid,
      includeInactive: 'false',
      v: 'full',
    });
    const response = await apiRequest<OpenMRSResponse<Visit>>(url);
    return response.results[0] || null;
  },

  /**
   * Get all visits for patient
   * GET /openmrs/ws/rest/v1/visit?patient={patientUuid}
   */
  getPatientVisits: async (patientUuid: string): Promise<Visit[]> => {
    const url = buildUrl(OPENMRS_BASE_URL, '/ws/rest/v1/visit', {
      patient: patientUuid,
      v: 'full',
    });
    const response = await apiRequest<OpenMRSResponse<Visit>>(url);
    return response.results;
  },

  /**
   * Start new visit
   * POST /openmrs/ws/rest/v1/visit
   */
  startVisit: async (patientUuid: string, visitTypeUuid: string, locationUuid?: string): Promise<Visit> => {
    const url = buildUrl(OPENMRS_BASE_URL, '/ws/rest/v1/visit');
    return apiRequest<Visit>(url, {
      method: 'POST',
      body: JSON.stringify({
        patient: patientUuid,
        visitType: visitTypeUuid,
        location: locationUuid,
        startDatetime: new Date().toISOString(),
      }),
    });
  },

  /**
   * End visit
   * POST /openmrs/ws/rest/v1/visit/{uuid}
   */
  endVisit: async (visitUuid: string): Promise<Visit> => {
    const url = buildUrl(OPENMRS_BASE_URL, `/ws/rest/v1/visit/${visitUuid}`);
    return apiRequest<Visit>(url, {
      method: 'POST',
      body: JSON.stringify({
        stopDatetime: new Date().toISOString(),
      }),
    });
  },
};

// ==================== Encounter API ====================

export const encounterApi = {
  /**
   * Get encounters for visit
   * GET /openmrs/ws/rest/v1/encounter?visit={visitUuid}
   */
  getByVisit: async (visitUuid: string): Promise<Encounter[]> => {
    const url = buildUrl(OPENMRS_BASE_URL, '/ws/rest/v1/encounter', {
      visit: visitUuid,
      v: 'full',
    });
    const response = await apiRequest<OpenMRSResponse<Encounter>>(url);
    return response.results;
  },

  /**
   * Get encounters for patient
   * GET /openmrs/ws/rest/v1/encounter?patient={patientUuid}
   */
  getByPatient: async (patientUuid: string, encounterType?: string): Promise<Encounter[]> => {
    const params: Record<string, string> = {
      patient: patientUuid,
      v: 'full',
    };
    if (encounterType) {
      params.encounterType = encounterType;
    }
    const url = buildUrl(OPENMRS_BASE_URL, '/ws/rest/v1/encounter', params);
    const response = await apiRequest<OpenMRSResponse<Encounter>>(url);
    return response.results;
  },

  /**
   * Create encounter
   * POST /openmrs/ws/rest/v1/encounter
   */
  create: async (encounter: Partial<Encounter>): Promise<Encounter> => {
    const url = buildUrl(OPENMRS_BASE_URL, '/ws/rest/v1/encounter');
    return apiRequest<Encounter>(url, {
      method: 'POST',
      body: JSON.stringify(encounter),
    });
  },

  /**
   * Get Bahmni encounter transaction (for consultation)
   * GET /bahmni/clinical/patient/{patientUuid}/consultationContext
   */
  getConsultationContext: async (patientUuid: string, visitUuid?: string) => {
    const params: Record<string, string> = {};
    if (visitUuid) params.visitUuid = visitUuid;
    const url = buildUrl(BAHMNI_BASE_URL, `/clinical/patient/${patientUuid}/consultationContext`, params);
    return apiRequest(url);
  },

  /**
   * Save Bahmni encounter transaction
   * POST /bahmni/clinical/transaction
   */
  saveBahmniTransaction: async (transaction: unknown) => {
    const url = buildUrl(BAHMNI_BASE_URL, '/clinical/transaction');
    return apiRequest(url, {
      method: 'POST',
      body: JSON.stringify(transaction),
    });
  },
};

// ==================== Observation API ====================

export const observationApi = {
  /**
   * Get observations for patient
   * GET /openmrs/ws/rest/v1/obs?patient={patientUuid}
   */
  getByPatient: async (patientUuid: string, conceptUuid?: string): Promise<Observation[]> => {
    const params: Record<string, string> = {
      patient: patientUuid,
      v: 'full',
    };
    if (conceptUuid) {
      params.concept = conceptUuid;
    }
    const url = buildUrl(OPENMRS_BASE_URL, '/ws/rest/v1/obs', params);
    const response = await apiRequest<OpenMRSResponse<Observation>>(url);
    return response.results;
  },

  /**
   * Create observation
   * POST /openmrs/ws/rest/v1/obs
   */
  create: async (obs: Partial<Observation>): Promise<Observation> => {
    const url = buildUrl(OPENMRS_BASE_URL, '/ws/rest/v1/obs');
    return apiRequest<Observation>(url, {
      method: 'POST',
      body: JSON.stringify(obs),
    });
  },
};

// ==================== Order API ====================

export const orderApi = {
  /**
   * Get orders for patient
   * GET /openmrs/ws/rest/v1/order?patient={patientUuid}
   */
  getByPatient: async (patientUuid: string, orderType?: string): Promise<Order[]> => {
    const params: Record<string, string> = {
      patient: patientUuid,
      v: 'full',
    };
    if (orderType) {
      params.orderType = orderType;
    }
    const url = buildUrl(OPENMRS_BASE_URL, '/ws/rest/v1/order', params);
    const response = await apiRequest<OpenMRSResponse<Order>>(url);
    return response.results;
  },

  /**
   * Get active orders for patient
   * GET /bahmni/ipd/patient/{patientUuid}/activeOrders
   */
  getActiveOrders: async (patientUuid: string): Promise<Order[]> => {
    const url = buildUrl(BAHMNI_BASE_URL, `/ipd/patient/${patientUuid}/activeOrders`);
    return apiRequest<Order[]>(url);
  },

  /**
   * Create order
   * POST /openmrs/ws/rest/v1/order
   */
  create: async (order: Partial<Order>): Promise<Order> => {
    const url = buildUrl(OPENMRS_BASE_URL, '/ws/rest/v1/order');
    return apiRequest<Order>(url, {
      method: 'POST',
      body: JSON.stringify(order),
    });
  },

  /**
   * Create drug order
   * POST /openmrs/ws/rest/v1/order
   */
  createDrugOrder: async (drugOrder: Partial<DrugOrder>): Promise<DrugOrder> => {
    const url = buildUrl(OPENMRS_BASE_URL, '/ws/rest/v1/order');
    return apiRequest<DrugOrder>(url, {
      method: 'POST',
      body: JSON.stringify({
        ...drugOrder,
        type: 'drugorder',
      }),
    });
  },

  /**
   * Create test order (lab)
   * POST /openmrs/ws/rest/v1/order
   */
  createTestOrder: async (testOrder: Partial<TestOrder>): Promise<TestOrder> => {
    const url = buildUrl(OPENMRS_BASE_URL, '/ws/rest/v1/order');
    return apiRequest<TestOrder>(url, {
      method: 'POST',
      body: JSON.stringify({
        ...testOrder,
        type: 'testorder',
      }),
    });
  },

  /**
   * Discontinue order
   * POST /openmrs/ws/rest/v1/order
   */
  discontinue: async (orderUuid: string, reason?: string): Promise<Order> => {
    const url = buildUrl(OPENMRS_BASE_URL, '/ws/rest/v1/order');
    return apiRequest<Order>(url, {
      method: 'POST',
      body: JSON.stringify({
        action: 'DISCONTINUE',
        previousOrder: orderUuid,
        orderReasonNonCoded: reason,
      }),
    });
  },
};

// ==================== Concept API ====================

export const conceptApi = {
  /**
   * Search concepts
   * GET /openmrs/ws/rest/v1/concept?q={query}
   */
  search: async (query: string, conceptClass?: string): Promise<Concept[]> => {
    const params: Record<string, string> = {
      q: query,
      v: 'full',
    };
    if (conceptClass) {
      params.class = conceptClass;
    }
    const url = buildUrl(OPENMRS_BASE_URL, '/ws/rest/v1/concept', params);
    const response = await apiRequest<OpenMRSResponse<Concept>>(url);
    return response.results;
  },

  /**
   * Get concept by UUID
   * GET /openmrs/ws/rest/v1/concept/{uuid}
   */
  getByUuid: async (uuid: string): Promise<Concept> => {
    const url = buildUrl(OPENMRS_BASE_URL, `/ws/rest/v1/concept/${uuid}`, {
      v: 'full',
    });
    return apiRequest<Concept>(url);
  },
};

// ==================== Drug API ====================

export const drugApi = {
  /**
   * Search drugs
   * GET /openmrs/ws/rest/v1/drug?q={query}
   */
  search: async (query: string): Promise<Drug[]> => {
    const url = buildUrl(OPENMRS_BASE_URL, '/ws/rest/v1/drug', {
      q: query,
      v: 'full',
    });
    const response = await apiRequest<OpenMRSResponse<Drug>>(url);
    return response.results;
  },

  /**
   * Get all drugs
   * GET /openmrs/ws/rest/v1/drug
   */
  getAll: async (): Promise<Drug[]> => {
    const url = buildUrl(OPENMRS_BASE_URL, '/ws/rest/v1/drug', {
      v: 'full',
    });
    const response = await apiRequest<OpenMRSResponse<Drug>>(url);
    return response.results;
  },
};

// ==================== Location API ====================

export const locationApi = {
  /**
   * Get all locations
   * GET /openmrs/ws/rest/v1/location
   */
  getAll: async (): Promise<Location[]> => {
    const url = buildUrl(OPENMRS_BASE_URL, '/ws/rest/v1/location', {
      v: 'default',
    });
    const response = await apiRequest<OpenMRSResponse<Location>>(url);
    return response.results;
  },

  /**
   * Get location by tag
   * GET /openmrs/ws/rest/v1/location?tag={tag}
   */
  getByTag: async (tag: string): Promise<Location[]> => {
    const url = buildUrl(OPENMRS_BASE_URL, '/ws/rest/v1/location', {
      tag,
      v: 'default',
    });
    const response = await apiRequest<OpenMRSResponse<Location>>(url);
    return response.results;
  },
};

// ==================== Provider API ====================

export const providerApi = {
  /**
   * Get all providers
   * GET /openmrs/ws/rest/v1/provider
   */
  getAll: async (): Promise<Provider[]> => {
    const url = buildUrl(OPENMRS_BASE_URL, '/ws/rest/v1/provider', {
      v: 'default',
    });
    const response = await apiRequest<OpenMRSResponse<Provider>>(url);
    return response.results;
  },

  /**
   * Get current provider (logged in user)
   * GET /bahmni/common/user/{username}/provider
   */
  getCurrentProvider: async (username: string): Promise<Provider> => {
    const url = buildUrl(BAHMNI_BASE_URL, `/common/user/${username}/provider`);
    return apiRequest<Provider>(url);
  },
};

// ==================== Lab API ====================

export const labApi = {
  /**
   * Get pending lab orders
   * GET /bahmni/lab/patient/{patientUuid}/orders
   */
  getPendingOrders: async (patientUuid: string): Promise<TestOrder[]> => {
    const url = buildUrl(BAHMNI_BASE_URL, `/lab/patient/${patientUuid}/orders`, {
      status: 'PENDING',
    });
    return apiRequest<TestOrder[]>(url);
  },

  /**
   * Get lab results
   * GET /bahmni/lab/patient/{patientUuid}/results
   */
  getResults: async (patientUuid: string): Promise<LabTest[]> => {
    const url = buildUrl(BAHMNI_BASE_URL, `/lab/patient/${patientUuid}/results`);
    return apiRequest<LabTest[]>(url);
  },

  /**
   * Save lab result
   * POST /bahmni/lab/result
   */
  saveResult: async (result: Partial<LabTest>): Promise<LabTest> => {
    const url = buildUrl(BAHMNI_BASE_URL, '/lab/result');
    return apiRequest<LabTest>(url, {
      method: 'POST',
      body: JSON.stringify(result),
    });
  },
};

// ==================== Billing API (Odoo) ====================

export const billingApi = {
  /**
   * Get patient bills
   * GET /bahmni/billing/patient/{patientUuid}/bills
   */
  getPatientBills: async (patientUuid: string): Promise<PatientBill[]> => {
    const url = buildUrl(BAHMNI_BASE_URL, `/billing/patient/${patientUuid}/bills`);
    return apiRequest<PatientBill[]>(url);
  },

  /**
   * Create bill
   * POST /bahmni/billing/bill
   */
  createBill: async (bill: Partial<PatientBill>): Promise<PatientBill> => {
    const url = buildUrl(BAHMNI_BASE_URL, '/billing/bill');
    return apiRequest<PatientBill>(url, {
      method: 'POST',
      body: JSON.stringify(bill),
    });
  },

  /**
   * Record payment
   * POST /bahmni/billing/bill/{billUuid}/payment
   */
  recordPayment: async (billUuid: string, payment: { amount: number; paymentMethod: string }): Promise<PatientBill> => {
    const url = buildUrl(BAHMNI_BASE_URL, `/billing/bill/${billUuid}/payment`);
    return apiRequest<PatientBill>(url, {
      method: 'POST',
      body: JSON.stringify(payment),
    });
  },
};

// ==================== Reports API ====================

export const reportsApi = {
  /**
   * Get available reports
   * GET /bahmni/reports
   */
  getAvailableReports: async () => {
    const url = buildUrl(BAHMNI_BASE_URL, '/reports');
    return apiRequest(url);
  },

  /**
   * Run report
   * POST /bahmni/reports/{reportUuid}/run
   */
  runReport: async (reportUuid: string, params: Record<string, string>, format: string = 'HTML') => {
    const url = buildUrl(BAHMNI_BASE_URL, `/reports/${reportUuid}/run`, {
      format,
      ...params,
    });
    return apiRequest(url);
  },
};

// Export all APIs
export const api = {
  patient: patientApi,
  visit: visitApi,
  encounter: encounterApi,
  observation: observationApi,
  order: orderApi,
  concept: conceptApi,
  drug: drugApi,
  location: locationApi,
  provider: providerApi,
  lab: labApi,
  billing: billingApi,
  reports: reportsApi,
};

export default api;
