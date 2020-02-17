import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TodoServiceService, Todos } from 'src/app/services/todo-service.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  panelOpenState = false;

  title: string
  text: string
  
  form: FormGroup

  todos: Todos[] = []

  constructor(private todoService: TodoServiceService) {}

  ngOnInit(){
    this.fetchTodo()
    this.form = new FormGroup({
      title: new FormControl(''),
      text: new FormControl('')
    })
  }

  fetchTodo() {
    this.todoService.fetchTodos()
      .subscribe(todos => {

        this.todos = todos
      })
  }


  removeTodo(id: number): void{
    this.todoService.removeTodo(id)
      .subscribe(() => {
        this.fetchTodo()
      }) 
    
  }

}
