class ScorePanel {
    score: number = 0
    level: number = 1
    scoreEle: HTMLElement
    levelEle: HTMLElement

    // Level limit
    maxLevel: number

    // Conditions for upgrading
    upScore: number

    // maxLevel default 10
    constructor(upScore: number = 10, maxLevel: number = 10) {
        this.scoreEle = document.getElementById('score')!
        this.levelEle = document.getElementById('level')!

        this.upScore = upScore
        this.maxLevel = maxLevel
    }

    addScore() {
        this.scoreEle.innerHTML = ++this.score + ''
        if (this.score % this.upScore === 0) {
            this.levelUp()
        }
    }

    levelUp() {
        if (this.level < this.maxLevel) {
            this.levelEle.innerHTML = ++this.level + ''
        }

    }
}

export default ScorePanel