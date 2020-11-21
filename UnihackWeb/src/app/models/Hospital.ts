import { Supplies } from './Supplies';
import { Location } from './Location';

export interface Hospital {
  key: string;
  hospitalName: string;
  address: Location;
  email: string;
  supplies: Supplies[];
  uid: string;
}
