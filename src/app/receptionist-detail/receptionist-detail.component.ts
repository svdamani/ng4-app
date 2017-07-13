import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { DummyService } from "app/dummy.service";

@Component({
  selector: 'app-receptionist-detail',
  templateUrl: './receptionist-detail.component.html',
  styles: []
})
export class ReceptionistDetailComponent implements OnInit {
  receptionist = {}
  
  constructor(
    private dummyService: DummyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        this.receptionist = this.dummyService.getReceptionist(params['id'])
        if (!this.receptionist) {
          this.router.navigate([''])
        }
      }
    })
  }
}