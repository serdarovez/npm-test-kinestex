export type IntegrationType = 
  | 'MAIN' 
  | 'PLAN' 
  | 'WORKOUT' 
  | 'CHALLENGE' 
  | 'LEADERBOARD' 
  | 'EXPERIENCE' 
  | 'CAMERA';

export type InputType = 'text' | 'select' | 'number' | 'checkbox';

export interface InputConfig {
  type: InputType;
  label: string;
  options?: string[];
  placeholder?: string;
  defaultValue?: any;
}

export interface AdditionalInputs {
  [key: string]: InputConfig;
}

export interface IntegrationOption {
  name: string;
  path: string;
  input?: InputConfig;
  defaultInput: string;
  urlParam?: boolean;
  urlQueryParam?: (userId: string) => string;
  additionalInputs?: AdditionalInputs;
  postDataMap?: (input: string, additional: Record<string, any>) => Record<string, any>;
}

export interface KinesteXPlayerProps {
  apiKey: string;
  userId: string;
  companyName: string;
  baseUrl?: string;
  defaultIntegration?: IntegrationType;
  style?: 'dark' | 'light';
  userDetails?: {
    age?: number;
    height?: number;
    weight?: number;
    gender?: string;
  };
}

export interface KinesteXMessage {
  type: string;
  data: any;
}