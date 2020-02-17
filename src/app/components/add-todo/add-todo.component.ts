import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Todos, TodoServiceService } from 'src/app/services/todo-service.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  form: FormGroup
  todos: Todos[] = []

  constructor(
    private router: Router,
    private todoService: TodoServiceService
  ) {}

  addTodo() {
    
    const formData = {...this.form.value}

    this.todoService.addTodo({
      title: formData.title,
      text: formData.text
    }).subscribe(todo => {
      this.todos.push(todo)
      this.form.reset()
      this.router.navigate(['/'])

    })
  }

  ngOnInit(): void {
    
    this.form = new FormGroup({
      title: new FormControl(''),
      text: new FormControl('')
    })
  }

}
