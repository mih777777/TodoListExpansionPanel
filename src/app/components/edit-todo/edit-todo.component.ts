import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TodoServiceService } from 'src/app/services/todo-service.service';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

export interface Todos {
  id?: string
  title: string
  text: string
}

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {

  form: FormGroup

  todo: Todos
  submitted = false

  uSub: Subscription

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private todoService: TodoServiceService
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.todoService.getById(params['id'])
      })
    ).subscribe((todo: Todos) => {
      this.todo = todo
      this.form = new FormGroup({
        title: new FormControl(todo.title, Validators.required),
        text: new FormControl(todo.text, Validators.required)
      })
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    this.uSub = this.todoService.updateTodo({
      ...this.todo,
      text: this.form.value.text,
      title: this.form.value.title
    }).subscribe(() => {
      this.submitted = false
      this.form.reset()
      this.router.navigate(['/'])
    })
  }

}
