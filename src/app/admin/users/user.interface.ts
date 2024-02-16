

// Exports the user interface
export interface User {
  empId: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  selectedSecurityQuestions: string[];
  role: string;
  isDisabled: boolean;
}