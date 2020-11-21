import { Injectable } from '@angular/core';

export interface Event {
  title: string;
  details: string;
  date: string;
  id: number;
  location: string;
  bloodType: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public events: Event[] = [
    {
      title: "Blood Drive 1",
      details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempus et felis et semper. Phasellus congue id elit ac interdum. Donec commodo maximus luctus. Aliquam finibus enim in neque lacinia, eget consectetur tortor fermentum. Curabitur aliquam egestas ipsum, a feugiat leo tincidunt at. Nunc placerat metus sit amet pharetra cursus. Curabitur nec enim lacus. Ut rutrum quam vel nisl ultricies semper.",
      date: Date(),
      id: 0,
      location: "Some Address",
      bloodType: "A+"
    },
    {
      title: "Blood Drive 2",
      details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempus et felis et semper. Phasellus congue id elit ac interdum. Donec commodo maximus luctus. Aliquam finibus enim in neque lacinia, eget consectetur tortor fermentum. Curabitur aliquam egestas ipsum, a feugiat leo tincidunt at. Nunc placerat metus sit amet pharetra cursus. Curabitur nec enim lacus. Ut rutrum quam vel nisl ultricies semper.",
      date: Date(),
      id: 1,
      location: "Some Address",
      bloodType: "A-"
    },
    {
      title: "Blood Drive 3",
      details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempus et felis et semper. Phasellus congue id elit ac interdum. Donec commodo maximus luctus. Aliquam finibus enim in neque lacinia, eget consectetur tortor fermentum. Curabitur aliquam egestas ipsum, a feugiat leo tincidunt at. Nunc placerat metus sit amet pharetra cursus. Curabitur nec enim lacus. Ut rutrum quam vel nisl ultricies semper.",
      date: Date(),
      id: 2,
      location: "Some Address",
      bloodType: "B+"
    },
    {
      title: "Blood Drive 4",
      details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempus et felis et semper. Phasellus congue id elit ac interdum. Donec commodo maximus luctus. Aliquam finibus enim in neque lacinia, eget consectetur tortor fermentum. Curabitur aliquam egestas ipsum, a feugiat leo tincidunt at. Nunc placerat metus sit amet pharetra cursus. Curabitur nec enim lacus. Ut rutrum quam vel nisl ultricies semper.",
      date: Date(),
      id: 3,
      location: "Some Address",
      bloodType: "B+"
    },
    {
      title: "Blood Drive 5",
      details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempus et felis et semper. Phasellus congue id elit ac interdum. Donec commodo maximus luctus. Aliquam finibus enim in neque lacinia, eget consectetur tortor fermentum. Curabitur aliquam egestas ipsum, a feugiat leo tincidunt at. Nunc placerat metus sit amet pharetra cursus. Curabitur nec enim lacus. Ut rutrum quam vel nisl ultricies semper.",
      date: Date(),
      id: 4,
      location: "Some Address",
      bloodType: "B+"
    }
  ];

  constructor() { }

  public getEvents(): Event[] {
    return this.events;
  }

  public getEventBy(id: number): Event {
    return this.events[id];
  }
}
