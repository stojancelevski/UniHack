import { Supplies } from './Supplies';

export interface Hospital {
  key: string;
  hospitalName: string;
  address: string;
  email: string;
  supplies: Supplies[];
  uid: string;
}
