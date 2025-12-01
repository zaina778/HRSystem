export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  status: UserStatus;
  dateJoined: string;
  salary: number;
}
