import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { DummyService } from "app/dummy.service";

@Component({
  moduleId: module.id,
  selector: 'app-clinic-detail',
  templateUrl: './clinic-detail.component.html',
  styles: []
})
export class ClinicDetailComponent implements OnInit {
  clinic = {}
  
  constructor(
    private dummyService: DummyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        this.clinic = this.dummyService.getClinic(params['id'])
        if (!this.clinic) {
          this.router.navigate([''])
        }
      } 
    })
  }
}