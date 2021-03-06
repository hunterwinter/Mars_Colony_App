import { Component, OnInit } from '@angular/core';
import { IOccupation, Colonist } from '../shared/models'
import { OccupationService, ColonistService } from '../shared/services';
import { NgForm } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
  providers: [ColonistService, OccupationService]
})
export class RegisterComponent implements OnInit {

  public NO_OCCUPATION_SELECTED: string;

  public occupations: IOccupation[];
  public colonist: Colonist;
  
  constructor(
    private router: Router,
    private colonistService: ColonistService,
    private occupationService: OccupationService
    
  ) {
    this.NO_OCCUPATION_SELECTED = '(none)';
  }
  
  ngOnInit() {
    this.colonist = new Colonist(null,null, this.NO_OCCUPATION_SELECTED);
    this.occupationService.getJobs()
      .then( jobs => this.occupations = jobs);
  }
  
  onSubmit(event): void {
    this.colonistService.createColonist(this.colonist)
                        .then( (colonist) => {this.router.navigate(['/encounters']), 
                        sessionStorage.setItem('sessionColonist', colonist.id)})
  }
  
  get noOccupation() : boolean{
    return this.colonist.job_id === this.NO_OCCUPATION_SELECTED;
  }
  

}
