/**
 * Bahmni/OpenMRS Type Definitions
 * These types match the OpenMRS REST API and Bahmni extensions
 */

// ==================== Core Types ====================

export interface Person {
  uuid: string;
  display: string;
  gender: 'M' | 'F' | 'O';
  age: number;
  birthdate: string;
  birthdateEstimated: boolean;
  dead: boolean;
  deathDate?: string;
  causeOfDeath?: Concept;
  preferredName: PersonName;
  preferredAddress: PersonAddress;
  names: PersonName[];
  addresses: PersonAddress[];
  attributes: PersonAttribute[];
}

export interface PersonName {
  uuid?: string;
  givenName: string;
  middleName?: string;
  familyName: string;
  preferred?: boolean;
}

export interface PersonAddress {
  uuid?: string;
  address1?: string;
  address2?: string;
  cityVillage?: string;
  countyDistrict?: string;
  stateProvince?: string;
  country?: string;
  postalCode?: string;
  preferred?: boolean;
}

export interface PersonAttribute {
  uuid?: string;
  attributeType: { uuid: string; display: string };
  value: string;
}

export interface Patient extends Person {
  patientId: number;
  identifiers: PatientIdentifier[];
}

export interface PatientIdentifier {
  uuid?: string;
  identifier: string;
  identifierType: { uuid: string; display: string };
  location?: { uuid: string; display: string };
  preferred?: boolean;
}

// ==================== Visit & Encounter Types ====================

export interface Visit {
  uuid: string;
  display: string;
  patient: { uuid: string; display: string };
  visitType: { uuid: string; display: string };
  location?: { uuid: string; display: string };
  startDatetime: string;
  stopDatetime?: string;
  encounters: Encounter[];
  attributes: VisitAttribute[];
}

export interface VisitAttribute {
  uuid?: string;
  attributeType: { uuid: string; display: string };
  value: string;
}

export interface Encounter {
  uuid: string;
  display: string;
  encounterDatetime: string;
  patient: { uuid: string; display: string };
  location?: { uuid: string; display: string };
  encounterType: { uuid: string; display: string };
  encounterProviders: EncounterProvider[];
  obs: Observation[];
  orders: Order[];
  diagnoses: Diagnosis[];
}

export interface EncounterProvider {
  uuid?: string;
  provider: Provider;
  encounterRole: { uuid: string; display: string };
}

export interface Provider {
  uuid: string;
  display: string;
  person?: Person;
  identifier?: string;
}

// ==================== Clinical Types ====================

export interface Observation {
  uuid?: string;
  concept: Concept;
  person?: { uuid: string };
  obsDatetime: string;
  location?: { uuid: string; display: string };
  order?: Order;
  encounter?: { uuid: string };
  accessionNumber?: string;
  groupMembers?: Observation[];
  valueCodedName?: string;
  comment?: string;
  voided: boolean;
  value: ObsValue;
  status?: 'PRELIMINARY' | 'FINAL' | 'AMENDED';
}

export type ObsValue = string | number | boolean | Concept | Drug | { uuid: string; display: string };

export interface Concept {
  uuid: string;
  display: string;
  name?: ConceptName;
  datatype?: { uuid: string; display: string };
  conceptClass?: { uuid: string; display: string };
  set: boolean;
  setMembers?: Concept[];
  answers?: Concept[];
  descriptions?: ConceptDescription[];
  mappings?: ConceptMapping[];
  units?: string;
  hiNormal?: number;
  lowNormal?: number;
  hiCritical?: number;
  lowCritical?: number;
}

export interface ConceptName {
  uuid: string;
  display: string;
  name: string;
  locale: string;
  localePreferred: boolean;
  conceptNameType: 'FULLY_SPECIFIED' | 'SHORT' | 'INDEX_TERM' | null;
}

export interface ConceptDescription {
  uuid: string;
  display: string;
  description: string;
  locale: string;
}

export interface ConceptMapping {
  uuid: string;
  conceptReferenceTerm: {
    uuid: string;
    code: string;
    name: string;
    conceptSource: { uuid: string; name: string };
  };
  conceptMapType: { uuid: string; display: string };
}

export interface Diagnosis {
  uuid?: string;
  diagnosis: {
    codedAnswer?: Concept;
    nonCodedAnswer?: string;
  };
  certainty: 'PROVISIONAL' | 'CONFIRMED';
  rank: number;
  voided: boolean;
}

// ==================== Order Types ====================

export interface Order {
  uuid: string;
  display: string;
  patient: { uuid: string; display: string };
  concept: Concept;
  encounter?: { uuid: string };
  orderer: Provider;
  orderType: { uuid: string; display: string };
  urgency: 'ROUTINE' | 'STAT' | 'ON_SCHEDULED_DATE';
  action: 'NEW' | 'REVISE' | 'DISCONTINUE' | 'RENEW';
  dateActivated: string;
  dateStopped?: string;
  autoExpireDate?: string;
  orderNumber: string;
  instructions?: string;
  commentToFulfiller?: string;
  careSetting: { uuid: string; display: string };
  fulfillerStatus?: 'RECEIVED' | 'IN_PROGRESS' | 'COMPLETED' | 'EXCEPTION';
  fulfillerComment?: string;
}

export interface DrugOrder extends Order {
  drug: Drug;
  dose: number;
  doseUnits: Concept;
  frequency: OrderFrequency;
  route: Concept;
  duration?: number;
  durationUnits?: Concept;
  quantity?: number;
  quantityUnits?: Concept;
  numRefills?: number;
  dosingInstructions?: string;
  dosingType: 'org.openmrs.SimpleDosingInstructions' | 'org.openmrs.FreeTextDosingInstructions';
  asNeeded: boolean;
  asNeededCondition?: string;
}

export interface TestOrder extends Order {
  specimenSource?: Concept;
  laterality?: 'LEFT' | 'RIGHT' | 'BILATERAL';
  clinicalHistory?: string;
  numberOfRepeats?: number;
  frequency?: OrderFrequency;
}

export interface Drug {
  uuid: string;
  display: string;
  name: string;
  strength?: string;
  dosageForm?: Concept;
  concept: Concept;
  combination: boolean;
  maximumDailyDose?: number;
  minimumDailyDose?: number;
}

export interface OrderFrequency {
  uuid: string;
  display: string;
  frequencyPerDay?: number;
}

// ==================== Laboratory Types ====================

export interface LabTest {
  uuid: string;
  testName: string;
  concept: Concept;
  order?: TestOrder;
  status: 'ORDERED' | 'COLLECTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  results?: LabResult[];
  specimenCollectedDate?: string;
  resultDate?: string;
  notes?: string;
}

export interface LabResult {
  uuid?: string;
  concept: Concept;
  value: ObsValue;
  units?: string;
  normalRange?: { low: number; high: number };
  abnormal?: boolean;
  critical?: boolean;
}

// ==================== Pharmacy Types ====================

export interface Prescription {
  uuid?: string;
  patient: { uuid: string; display: string };
  drugOrder: DrugOrder;
  dispensed: boolean;
  dispensedDate?: string;
  dispensedBy?: Provider;
  dispensedQuantity?: number;
}

export interface DrugInventory {
  uuid: string;
  drug: Drug;
  quantity: number;
  batchNumber?: string;
  expiryDate?: string;
  location: { uuid: string; display: string };
}

// ==================== Billing Types (Odoo/ERP) ====================

export interface BillableService {
  uuid: string;
  name: string;
  serviceType: 'CONSULTATION' | 'PROCEDURE' | 'INVESTIGATION' | 'DRUG' | 'BED' | 'OTHER';
  price: number;
  currency: string;
}

export interface PatientBill {
  uuid: string;
  patient: { uuid: string; display: string };
  visit?: { uuid: string };
  billDate: string;
  lineItems: BillLineItem[];
  totalAmount: number;
  paidAmount: number;
  status: 'PENDING' | 'PARTIALLY_PAID' | 'PAID' | 'CANCELLED';
  payments: Payment[];
}

export interface BillLineItem {
  uuid?: string;
  service: BillableService;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  order?: Order;
}

export interface Payment {
  uuid?: string;
  amount: number;
  paymentDate: string;
  paymentMethod: 'CASH' | 'CARD' | 'INSURANCE' | 'OTHER';
  reference?: string;
}

// ==================== Report Types ====================

export interface ReportDefinition {
  uuid: string;
  name: string;
  description?: string;
  parameters: ReportParameter[];
}

export interface ReportParameter {
  name: string;
  label: string;
  type: 'DATE' | 'STRING' | 'INTEGER' | 'LOCATION' | 'CONCEPT';
  required: boolean;
  defaultValue?: string;
}

export interface ReportRequest {
  reportDefinition: { uuid: string };
  parameters: Record<string, string>;
  outputFormat: 'HTML' | 'PDF' | 'CSV' | 'EXCEL';
}

// ==================== Location Types ====================

export interface Location {
  uuid: string;
  display: string;
  name: string;
  description?: string;
  tags?: LocationTag[];
  parentLocation?: Location;
  childLocations?: Location[];
  attributes?: LocationAttribute[];
}

export interface LocationTag {
  uuid: string;
  display: string;
  name: string;
}

export interface LocationAttribute {
  uuid?: string;
  attributeType: { uuid: string; display: string };
  value: string;
}

// ==================== API Response Types ====================

export interface OpenMRSResponse<T> {
  results: T[];
  links?: { rel: string; uri: string }[];
}

export interface BahmniSearchResponse<T> {
  pageOfResults: T[];
  totalCount: number;
}
