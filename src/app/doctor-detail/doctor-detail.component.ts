import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { DummyService } from "app/dummy.service";

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styles: []
})
export class DoctorDetailComponent implements OnInit {
  doctor = {}
  
  constructor(
    private dummyService: DummyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        this.doctor = this.dummyService.getDoctor(params['id'])
        if (!this.doctor) {
          this.router.navigate([''])
        }
      }
    })
  }
}