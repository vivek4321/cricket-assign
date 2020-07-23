export class Player {
    id: number;
    name: string;
    btRuns: number = 0;
    btBalls: number = 0;
    bt4: number = 0;
    bt6: number = 0;
    wicketTaker: string = '';

    bwOvers: number = 0;
    bwBalls: number = 0;
    bwRuns: number = 0;
    bwWickets: number = 0;
    bwEconomy: number = 0;
    bw0: number = 0;
    bw4: number = 0;
    bw6: number = 0;
    bwWide: number = 0;
    bwNobe: number = 0;
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    getStrikeRate() {
        return (this.btRuns / this.btBalls) * 100;
    }

}

export class Team {
    name: string;
    playersList= new Map<number, Player>();
    totalScore: number = 0;
    btWickets: number = 0;
    btBalls: number = 0;
    btWD: number = 0;
    btNB: number = 0;

    bwWickets: number = 0;
    bwBalls: number = 0;
    bwWD: number = 0;
    bwNB: number = 0;

    constructor(j:number, name:string) {
        for (let i = j; i < j+11; i++) {
            this.playersList.set(i, new Player(i, 'Player Name ' + i))
        }
        this.name = name;
    }
}

export class Match {
    startBowling;
    numberOfBalls: number = 0;
    totalScoreBoard: number = 0;
    wickets: number = 0;
    battingTeam = new Team(0, 'TeamA');
    bowlingTeam = new Team(21, 'TeamB');
    battsmen: Player;
    bowler: Player;
    constructor() {
        this.battsmen = this.battingTeam.playersList.get(0);
        this.bowler = this.bowlingTeam.playersList.get(21);
    }

}
