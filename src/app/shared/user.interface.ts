/**
 * Author: Professor Krasso
 * Contributors: Laurel Condon, James Harper, Danielle Taplin
 * Date: 2/21/2021
 * File Name: user.interface.ts
 * Description: User interface
 */

// selected security question interface with question and answer
export interface SelectedSecurityQuestion {
  question: string;
  answer: string;
}

export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  address: string;
  selectedSecurityQuestions: [
    { question: '', answer: '' },
    { question: '', answer: '' },
    { question: '', answer: '' }
  ],
  role: string;
  isDisabled: boolean;
  empId: number;
}


// Assign default values to the properties
export const defaultUser: User = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  phoneNumber: 0,
  address: '',
  selectedSecurityQuestions: [
    { question: '', answer: '' },
    { question: '', answer: '' },
    { question: '', answer: '' }
  ],
  role: 'standard',
  isDisabled: false,
  empId: 0
};