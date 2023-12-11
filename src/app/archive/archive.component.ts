import {Component, OnInit} from '@angular/core';
import {TasksService} from "../tasks.service";
import {Task} from "../task";

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit{
  public tasks: Task[] = [];
  constructor(private service: TasksService) {
  }

  ngOnInit() {
    this.service.index(true).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  delete(task: Task) {
    if (!confirm(`Are you sure you want delete '${task.title} task'?`)) {
      return;
    }

    this.service.delete(task).subscribe(() => {
      this.ngOnInit();
    });
  }
}
