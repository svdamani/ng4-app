import { Component } from '@angular/core';
import { DummyService } from "app/dummy.service";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  all = {}
  selectedId: string

  constructor(
    private dummyService: DummyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.all = this.dummyService.getAll()

    this.router.events.subscribe(val=> {
      if (val instanceof NavigationEnd) {
        this.selectedId = this.router.parseUrl(this.router.url).root.children.primary.segments[1].path
      }
    })
  }
}