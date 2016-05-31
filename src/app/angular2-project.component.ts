import { Component } from '@angular/core';
import { OccupationService, ColonistService, EncounterService, AlienService } from './shared/services';
import { IOccupation, Colonist, Encounter, IAlien } from './shared/models';

@Component({
  moduleId: module.id,
  selector: 'angular2-project-app',
  templateUrl: 'angular2-project.component.html',
  styleUrls: ['angular2-project.component.css'],
  providers: [OccupationService, ColonistService, EncounterService, AlienService]
})
export class Angular2ProjectAppComponent {
  
  title = 'angular2-project works!';
  public job: IOccupation
  public colonist: Colonist
  public encounter: Encounter
  public alien: IAlien

  constructor(
    private occupationService: OccupationService,
    private colonistService: ColonistService,
    private encounterService: EncounterService,
    private alienService: AlienService
  ){
    
    this.colonist = new Colonist('Mack', 34, '4');
    this.encounter = new Encounter('Octospider', '2015-10-01', 'web developer', '4');
    
    //// log jobs //////
    
    occupationService.getJobs().then(( jobs ) => {
      console.log(jobs);
    });
    
    //// log aliens ////
    
    alienService.getAliens().then(( aliens ) => {
      console.log(aliens)
    });
    
    //// log colonists ////
    
    colonistService.createColonist(this.colonist).then(( colonist ) => {
      console.log(colonist);
    });
    
    ////log encounters
    
    encounterService.createEncounter(this.encounter).then(( encounter ) => {
      console.log(encounter);
    });
    
  }

}
