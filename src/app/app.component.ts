import { Component } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { Player, Match } from './player'
import {UtilsService} from './utils.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cricket';
  buttonTitle = 'start';
  sideFinished = false;
  matchFinished = 0;
  match: Match = new Match();
  showStats = false;
  constructor(private utilsService:UtilsService){
  }
  ngOnChanges() {
     console.log(this.match);
    }   

  clickRun(event) {
    if (this.buttonTitle == 'start') {
      this.buttonTitle = 'stop';
      this.match.startBowling = interval(1000).subscribe((x) => {
        this.bowl(x);
        this.overFinished();
        this.checkSideFinished();
      });
    } else {
      this.buttonTitle = 'start';
      this.match.startBowling.unsubscribe();
    }
  }

  startBowling() {
    this.checkSideFinished();
    this.match.startBowling = interval(1000).subscribe((x) => {
      this.bowl(x);
    });
  }

  stopBowling() {
    this.match.startBowling.unsubscribe();
  }

  stopMatch() {
    this.buttonTitle = 'start';
    this.match.startBowling.unsubscribe();
  }

  bowl(x) {
    let resultOfBall = this.getBallResult();
    this.match.numberOfBalls++;
    console.log(resultOfBall);
    switch (resultOfBall) {
      case 'WD':
        this.defaultUpdatesStats(1);
        break;
      case 'NB':
        this.match.battsmen.btRuns += 1
        this.match.numberOfBalls -= 1;
        this.match.bowler.bwNobe += 1
        this.match.totalScoreBoard += 1;
        break;
      case 'OUT':
        this.match.wickets += 1
        this.match.bowler.bwWickets++;
        this.match.battsmen.wicketTaker = this.match.bowler.name;
        this.defaultUpdatesStats(0);
        this.match.battsmen = this.nextBatsMen();
        break;
      case 0:
        this.defaultUpdatesStats(resultOfBall);
        this.match.bowler.bw0 += 1;
        break;
      case 4:
        this.defaultUpdatesStats(resultOfBall);
        this.match.battsmen.bt4 += 1;
        this.match.bowler.bw4 += 1;
        break;
      case 6:
        this.defaultUpdatesStats(resultOfBall);
        this.match.battsmen.bt6 += 1;
        this.match.bowler.bw6 += 1;
        break;
      default:
        this.defaultUpdatesStats(resultOfBall);

    }
    console.log(this.match);
  }

  defaultUpdatesStats(resultOfBall) {
    this.match.bowler.bwBalls += 1;
    this.match.battsmen.btBalls += 1;

    this.match.battsmen.btRuns += resultOfBall;
    this.match.bowler.bwRuns += resultOfBall;
    this.match.totalScoreBoard = this.match.totalScoreBoard + resultOfBall;
  }


  nextBatsMen() {
    return this.match.battingTeam.playersList.get(this.match.battsmen.id + 1);
  }

  overFinished() {
    let overs = this.caluclateOvers(this.match.numberOfBalls);
    let balls = this.match.numberOfBalls % 6;
    if (overs > 0 && balls == 0) {
      let id = this.match.bowler.id;
      this.match.bowler = this.match.bowlingTeam.playersList.get(id + 1);
    }
  }
  getBallResult() {
    let scoreObject = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 'WD', 8: 'NB', 9: 'OUT' };
    let randomNumber = this.getRandomNumber();
    return scoreObject[randomNumber];
  }

  getRandomNumber() {
    return Math.floor((Math.random() * 10));
  }

  caluclateOvers(ballsnum: number) {
    return parseInt('' + ballsnum / 6);
  }

  checkSideFinished() {
    if (this.match.wickets == 10) {
      this.changeSide();
    } else if (this.caluclateOvers(this.match.numberOfBalls) == 2) {
      this.changeSide();
    }
  }

  checkMatchFinished() {
    if (this.matchFinished == 2) {
      this.stopBowling();
      this.buttonTitle = 'Match Finished';
      this.showStats = true;
      this.utilsService.matchSubject.next(this.match);
  }
}

  changeSide() {
    this.matchFinished += 1;
    this.match.battingTeam.totalScore = this.match.totalScoreBoard;
    this.match.battingTeam.btBalls = this.match.numberOfBalls;
    this.match.battingTeam.btWickets = this.match.wickets;
    this.match.totalScoreBoard = 0
    this.match.numberOfBalls = 0;
    this.match.wickets = 0;
    this.checkMatchFinished();
    [this.match.battingTeam, this.match.bowlingTeam] = [this.match.bowlingTeam, this.match.battingTeam];
    this.match.battsmen = this.match.battingTeam.playersList.values().next().value;
    this.match.bowler = this.match.bowlingTeam.playersList.values().next().value;
   
  }
}
