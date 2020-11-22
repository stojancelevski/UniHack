export interface Event {
  title: string;
  details: string;
  date: string;
  id: string;
  lon: string;
  lat: string;
  bloodType: BloodType;
}

export interface BloodType {
  bloodType: string;
  rhValue: string;
}
