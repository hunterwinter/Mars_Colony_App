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
  public savedColonist: string;

  constructor(
    private router: Router,
    private alienService: AlienService,
    private encounterService: EncounterService
  ) {
    this.NO_ALIEN_SELECTED = '(none)';
    this.savedColonist = sessionStorage.getItem('colonistid');
  }

  ngOnInit() : void {
    this.alienService.getAliens().then( alientype => this.aliens = alientype );
    this.encounters = new Encounter(this.NO_ALIEN_SELECTED, '', this.savedColonist, '');
  }
  

}
