class mountainbiker {
    constructor(race, startDate) {
        this.startDate = startDate;
        this.race = race;
    }
    displayGame() {
        return `Race: ${this.race} start Date: ${this.startDate}`;
    }
}

class Contestant {
    constructor(contestantName) {
        this.contestantName = contestantName;
        this.race = [];
    }

    addRacer(race) {
        if (race instanceof Race) {
            this.race.push(race);
        } else { throw new Error(`Failed to add race to array`) }
    }
}

class Menu {
    constructor() {
        this.contestant = [];
        this.contestantSelected = null;
    }

    start() {
        let select = this.mainMenu();
        while (select != '0') {
            switch (select) {
                case '1':
                    this.addContestant()
                    break;
                case '2':
                    this.deleteContestant()
                    break;
                case '3':
                    this.viewContestants()
                    break;
                case '4':
                    this.viewAllContestants()
                    break;
                default:
                    select = '0';
            }
            select = this.mainMenu();
        }
        alert(`Goodbye!`);
    }
    mainMenu() {
        return prompt(`
         0) Close
         1) Add a contestant
         2) Delete a contestant
         3) View contestants list of races
         4) View all contestants
         `)
    }
    gameOptions(showinfo) {
        return prompt(` 
         0) Back
         1) Add race
         2) Delete race
         Currernt contestants Selected : ${showinfo}
         `)
    }
    viewAllContestants() {
        let contestant = '';
        for (let i = 0; i < this.contestant.length; i++) {
            contestant += i + ' - ' + this.contestant[i].contestantName + '\n'
        }
        alert(contestant);
    }
    addContestant() {
        let contestant = prompt('New Contestant Name');
        this.contestant.push(new Contestant(contestant));
    }

    viewContestant() {
        let allContestantsDisplay = ''
        for (let i = 0; i < this.contestant.length; i++) {
            allContestantsDisplay += i + ' - ' + this.contestant[i].contestantName + '\n'
        }
        let index = prompt('Select a Contestant to list' + '\n' +
            allContestantsDisplay);
        if (index > -1 && index < this.contestant.length) {
            this.contestantSelected = this.contestant[index];

            let dev = this.contestantSelected.contestantName + '\n' + 'Current Contestants:' + '\n';
            for (let i = 0; i < this.contestantSelected.race.length; i++) {
                dev += i + ' - ' + this.contestantSelected.race[i].race + ' ' +
                    this.contestantSelected.race[i].startDate
            }
            let Selected = this.raceOptions(dev);
            switch (Selected) {
                case '1':
                    this.createRace();
                    break;
                case '2':
                    this.deleteRace();
            }

        }
    }
    deleteContestant() {
        let allContestantsDisplay = ''
        for (let i = 0; i < this.contestant.length; i++) {
            allContestantsDisplay += i + ' - ' + this.contestant[i].contestantName + '\n'
        }
        let index = prompt(`Select which one to delete.` +
        '\n' + allContestantsDisplay);
    if (index > -1 && index < this.contestant.length) {
        this.contestant.splice(index, 1);
    }
}


createRace() {
    let newRace = prompt(`Enter race name`);
    let newStartDate = prompt(`Enter the start date of the race`);
    this.contestantSelected.race.push(new Race(newRace, newStartDate));
}
deleteRace() {
    let allRaceDisplay = ''
    for (let i = 0; i < this.contestantSelected.race.length; i++) {
        allRaceDisplay += i + ' - ' +
            `${this.contestantSelected.race[i].race} ${this.contestantSelected.race[i].startDate}` + '\n'
    }
    let index = prompt(`Select the contestant of the race to delete.` + '\n' + allRaceDisplay);
    if (index > -1 && index < this.contestantSelected.race.length) {
        this.contestantSelected.race.splice(index, 1);
    }
}


}

let menu = new Menu();
menu.start(); 