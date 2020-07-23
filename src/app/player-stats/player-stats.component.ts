import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../player';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss']
})
export class PlayerStatsComponent implements OnInit {
  @Input() playerData:Map<String, Player>;
  playersArray;
  constructor() { }

  ngOnInit(): void {
    console.log(this.playerData);
       console.log(typeof this.playerData.values())
       this.playersArray = [... this.playerData.values()];

  }

}
