export interface PetDetailsPayload {
  petDetailList: PetDetailList[];
}

export interface PetDetailList {
  petData: PetData;
  healthData: HealthData;
}

export interface PetData {
  type: string;
  name: string;
  gender: string;
  dateOfBirth: string;
  breed: string;
  amountDonated: number;
  coverExtraActivities?: boolean;
  color?: string;
  ownershipType?: string;
  // height: number;
  hHeight?: number;
  iHeight?: number;
}

export interface HealthData {
  coverPreexistingCondition: boolean;
  hasBeenNeutered?: boolean;
  hasBeenChipped?: boolean;
  hasShownSignsOfAggression?: boolean;
  vaccineUpToDate?: boolean;
  hasBeenSubjectOfLegalComplaint?: boolean;
}

export interface PetMetaData {
  types: string[];
  genders: string[];
}
