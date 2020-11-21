import { BloodValues } from './BloodValues';

export interface Event {
  title: string;
  details: string;
  date: string;
  id: number;
  location: string;
  bloodType: BloodValues;
}
