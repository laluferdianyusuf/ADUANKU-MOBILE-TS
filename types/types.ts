export type KeyboardType =
  | "default"
  | "email-address"
  | "numeric"
  | "phone-pad"
  | "decimal-pad";

export interface FieldConfig {
  name: string;
  title: string;
  placeholder: string;
  keyboard?: KeyboardType;
  multiline?: boolean;
  icon?: string;
}

export interface Category {
  id: string;
  name: string;
  desc: string;
  icon: string;
  color: string;
  uri:
    | "/(screens)/form"
    | "/(screens)/progress"
    | "/(screens)/history"
    | "/(screens)/graph"
    | "/(screens)/information"
    | "";
}

// User state
export interface User {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  gender?: string;
  birthday?: Date | string;
  phoneNumber?: string;
  address?: string;
  password?: string;
  role?: string;
}

export interface UserState {
  users: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface UserResponse {
  data: {
    user: User;
    token?: string;
  };
  token: string | null;
  status: boolean;
  message: string | null;
}

// Complaint state
export interface Complaint {
  id?: number;
  userId?: number;
  complaintName?: string;
  complaintAddress?: string;
  complaintEducate?: string;
  complaintNumber?: string;
  complaintRelation?: string;

  companionName?: string;
  companionAddress?: string;
  companionEducate?: string;
  companionNumber?: string;
  companionRelation?: string;

  caseType?: string[] | string;
  caseViolence?: string[] | string;
  physical?: string;
  sexual?: string;
  psychology?: string;
  economy?: string;
  others?: string;
  chronology?: string;
  status?: string;
  isOpened?: boolean;
  createdAt?: string;
  updatedAt?: string;
  abusers?: Abuser[];
  victims?: Victim[];
  count?: number;
  type?: string;
}

export interface ComplaintState {
  complaints: Complaint[];
  loading: boolean;
  error: string | null;
}

export interface ComplaintResponse {
  data: {
    complaint: Complaint[];
  };
}

// abuser states
export interface Abuser {
  id?: number;
  name?: string;
  birthday?: string;
  address?: string;
  education?: string;
  job?: string;
  status?: string;
  relation?: string;
  complaintId?: number;
}

export interface AbuserState {
  abusers: Abuser[];
  loading?: boolean;
  error: string | null;
}

export interface AbuserResponse {
  data: {
    abuser: Abuser[];
  };
}

// victim states
export interface Victim {
  id?: number;
  name?: string;
  birthday?: string;
  address?: string;
  phoneNumber?: string;
  gender?: string | { male: number; female: number };
  education?:
    | string
    | {
        TK: number;
        SD: number;
        SMP: number;
        SMA: number;
        PT: number;
        others: number;
      };
  parentName?: string;
  parentJob?: string;
  nik?: string;
  parentAddress?: string;
  parentNumber?: string;
  complaintId?: number;
  victim?: number;
}

export interface VictimState {
  victims: Victim | null;
  loading?: boolean;
  error: string | null;
}

export interface VictimResponse {
  data: {
    victim: Victim;
  };
}

export interface Note {
  id?: number;
  officerName?: string;
  description?: string;
  complaintId?: number;
  createdAt?: string;
}

export interface NoteState {
  notes: Note[];
  loading?: boolean;
  error: string | null;
}

export interface NoteResponse {
  data: {
    note: Note[];
  };
}

export interface Interest {
  id?: number;
  userId?: number;
  lesson?: string;
  complaintId?: number;
  complaint?: {
    id?: number;
    complaintName?: string;
    companionName?: string;
  };
  createdAt?: string;
}

export interface InterestState {
  interests: Interest[];
  loading?: boolean;
  error: string | null;
}

export interface InterestResponse {
  data: {
    interest: Interest[];
  };
}

export interface Information {
  id?: number;
  title?: string;
  descriptions?: string;
}

export interface InformationState {
  information: Information[];
  loading?: boolean;
  error: string | null;
}

export interface InformationResponse {
  data: {
    information: Information[];
  };
}
