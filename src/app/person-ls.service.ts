import { Injectable } from '@angular/core';
import {Person} from "./person";

@Injectable({
  providedIn: 'root'
})
export class PersonLsService {
  readonly KEY = 'stored-people-data';
  constructor() { }

  public getAll(): Person[] {
    const data = localStorage.getItem(this.KEY);

    return  data ? JSON.parse(data) : [];
  }

  public getPerson(index: number): Person {
    return this.getAll()[index];
  }

  public addPerson(person: Person): void {
    const updatedPeople = this.getAll();
    updatedPeople.push(person);

    localStorage.setItem(this.KEY, JSON.stringify(updatedPeople));
  }

  public deletePerson(index: number): void {
    let updatedPeople =  this.getAll();
    updatedPeople.splice(index, 1);

    localStorage.setItem(this.KEY, JSON.stringify(updatedPeople));
  }
}
