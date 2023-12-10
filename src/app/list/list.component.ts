import {Component, OnInit} from '@angular/core';
import {Person} from "../person";
import {PersonLsService} from "../person-ls.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  people: Person[] = []

  constructor(private service: PersonLsService) {
  }

  ngOnInit() {
    this.people = this.service.getAll();
  }

  delete(index: number): void {
    if (confirm(`Are you sure you want delete ${this.people[index].firstName}?`)) {
      this.service.deletePerson(index);
      this.people = this.service.getAll();
    }
  }
}
