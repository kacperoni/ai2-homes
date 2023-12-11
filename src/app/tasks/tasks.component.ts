import {Component, OnInit} from '@angular/core';
import { Task } from '../task';
import {TasksService} from "../tasks.service";
import {forkJoin, Observable} from "rxjs";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{
  public tasks: Task[] = [];
  public newTask: Task = {};
  public isProcessing = false;

  constructor(private service: TasksService) {
  }

  ngOnInit() {
    this.service.index().subscribe((tasks: Task[]): void => {
      this.tasks = tasks;
    });
    this.isProcessing = false;
  }

  addTask(): void {
    if(this.newTask.title === undefined){
      return;
    }

    this.newTask.completed = false;
    this.newTask.archived = false;

    this.tasks.unshift(this.newTask);

    this.service.post(this.newTask).subscribe((task: Task): void => {
      this.newTask = {};
      this.ngOnInit();
    });
  }

  handleChange(task: Task): void {
    this.service.put(task).subscribe({
      error: err => {
        alert(err);
        this.ngOnInit();
      }
    })
  }

  archiveCompleted(): void {
    const observables: Observable<any>[] = [];
    for(const task of this.tasks){
      if(!task.completed){
        continue;
      }

      task.archived = true;
      observables.push(this.service.put(task));
    }

    forkJoin(observables).subscribe((): void => {
      this.ngOnInit();
    })
  }
}
