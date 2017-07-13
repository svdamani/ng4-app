import { Component } from '@angular/core';
import { DummyService } from "app/dummy.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  all = {}

  constructor(
    private dummyService: DummyService
  ) {}

  ngOnInit(): void {
    this.all = this.dummyService.getAll()
  }
}