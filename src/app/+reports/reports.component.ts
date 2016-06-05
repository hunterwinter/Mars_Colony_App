import { Component, OnInit } from '@angular/core';
import { Router, Routes, ROUTER_DIRECTIVES , ROUTER_PROVIDERS} from '@angular/router';
import { AlienService, EncounterService } from  '../shared/services';
import { IAlien, Encounter } from '../shared/models';

@Component({
  moduleId: module.id,
  selector: 'app-reports',
  templateUrl: 'reports.component.html',
  styleUrls: ['reports.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [AlienService, EncounterService]
})
export class ReportsComponent implements OnInit {
  
  public NO_ALIEN_SELECTED: string;
  public aliens: IAlien[];
  public encounters: Encounter;
  public sessionColonist: string;
  public date: string;

  constructor(
    private router: Router,
    private alienService: AlienService,
    private encounterService: EncounterService
  ) {
    this.NO_ALIEN_SELECTED = '(none)';
    this.sessionColonist = sessionStorage.getItem('colonistid');
  }

  ngOnInit() : void {
    this.sessionColonist = sessionStorage.getItem('sessionColonist');
    this.date = Date().slice(0,15);
    this.alienService.getAliens().then( alientype => this.aliens = alientype );
    this.encounters = new Encounter(this.NO_ALIEN_SELECTED, this.date, '', this.sessionColonist);
  }
  onSubmit(event) : void {
    this.encounterService.createEncounters(this.encounters)
                         .then( encounters => this.router.navigate(['/encounters']));
  }
  get noAlien() : boolean {
  return this.encounters.atype === this.NO_ALIEN_SELECTED;
}
}
