export interface PartnerData {
  id: string;
  name: string;
  phone: string;
}

export interface ErrorItem {
  title: string;
}

export interface ResultItem {
  type: string;
  title: string;
  tooltip: string;
}

export interface Stage {
  person_name: string;
  person_surname: string;
  person_mango_phone: string;
  duration: string;
  disconnect_reason: string;
}

export interface AbuseAnswer {
  message: string;
  from_support: number;
  support_read_status: number;
  person_read_status: number;
}

export interface Abuse {
  date: string;
  person_name: string;
  message: string;
  support_read_status: number;
  support_answer_status: number;
  answers: AbuseAnswer[];
}

export interface Call {
  id: number;
  partnership_id: string;
  partner_data: PartnerData;
  date: string;
  date_notime: string;
  time: number;
  from_number: string;
  from_extension: string;
  to_number: string;
  to_extension: string;
  is_skilla: number;
  status: string;
  record: string;
  line_number: string;
  line_name: string;
  in_out: number;
  from_site: number;
  source: string;
  errors: ErrorItem[];
  disconnect_reason: string;
  results: ResultItem[];
  stages: Stage[];
  abuse: Abuse | null;
  contact_name: string;
  contact_company: string;
  person_id: number;
  person_name: string;
  person_surname: string;
  person_avatar: string;
}

export interface CallsResponse {
  total_rows: string;
  results: Call[];
}

// Параметры для запроса списка звонков
export interface GetCallsParams {
  date_start: string;
  date_end: string;
  in_out?: "" | "0" | "1";
  limit?: number;
  offset?: number;
  sort_by?: "date" | "duration";
  order?: "ASC" | "DESC";
}

// Параметры для получения записи
export interface GetRecordParams {
  record: string;
  partnership_id: string;
}
