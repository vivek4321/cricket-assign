import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../player';

@Component({
  selector: 'app-match-stats',
  templateUrl: './match-stats.component.html',
  styleUrls: ['./match-stats.component.scss']
})
export class MatchStatsComponent implements OnInit {
  wonGame:string;

  @Input() match: Match;

  constructor() { }

  ngOnInit(): void {
    if(this.match.bowlingTeam.totalScore>this.match.battingTeam.totalScore){
      this.wonGame = 'TeamA';
    } else{
      this.wonGame = 'TeamB';
    }
   
  }

}
