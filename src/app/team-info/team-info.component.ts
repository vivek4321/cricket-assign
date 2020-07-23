import { Component, OnInit, Input } from '@angular/core';
import { Team  } from './../player';
@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.scss']
})
export class TeamInfoComponent implements OnInit {
  @Input() teamData:Team;
  team:any = {
    runs: 0,
    wickets: 0,
    overs:0,
    balls:0,
    RR:0
  }

  constructor() { }

  ngOnInit(): void {
    this.team.runs = this.teamData.totalScore
    this.team.wickets = this.teamData.btWickets
    this.team.overs = parseInt('' + this.teamData.btBalls / 6)
    this.team.balls = this.teamData.btBalls % 6
    this.team.RR = this.teamData.totalScore/this.team.overs
  }

  ngOnch

}
