import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Task} from "./task";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  readonly baseUrl: string = 'http://localhost:39313';
  constructor(
    private http: HttpClient,
  ) { }

  public index(archived = false): Observable<Task[]> {
    return this.http.get<Task[]>(
      this.getUrl('/todos'), {
      params: {
        archived,
        _sort: 'id',
        _order: 'desc',
      }
    });
  }

  public post(task: Task): Observable<Task> {
    return this.http.post(
      this.getUrl('/todos'),
      task
    );
  }

  public put(task: Task): Observable<Task> {
    return this.http.put(
      this.getUrl(`/todos/${task.id}`),
      task
    );
  }

  public delete(task: Task): Observable<any> {
    return this.http.delete(
      this.getUrl(`/todos/${task.id}`)
    );
  }

  private getUrl(endpoint: string): string{
    return `${this.baseUrl + endpoint}`;
  }
}
