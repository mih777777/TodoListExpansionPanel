import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

export interface Todos {
  id?: number
  title: string
  text: string
}

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  constructor(private http: HttpClient) { }

  addTodo(todo: Todos): Observable<Todos> {
    return this.http.post<Todos>('http://localhost:3000/api/todos/create', todo)
  }

  fetchTodos(): Observable<Todos[]>{
    return this.http.get<Todos[]>('http://localhost:3000/api/todos')
  }

  removeTodo(id: number):Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/api/todos/delete/${id}`)
  }

  updateTodo(id: number): Observable<Todos>{
    return this.http.put<Todos>(`http://localhost:3000/api/todos/update/$id`, {
      
    })
  }
}
