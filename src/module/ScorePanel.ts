class ScorePanel {
    // Current score
    score: number = 0
    // Current level
    level: number = 1

    /*
    DOM element that shows the score & level on the page
    */
    scoreEle: HTMLElement
    levelEle: HTMLElement

    // Level cap
    maxLevel: number

    // Points per level
    upScore: number

    /*
    upScore: points to level up
    maxLevel: max level
    */
    constructor(upScore: number = 10, maxLevel: number = 10) {
        this.scoreEle = document.getElementById('score')!
        this.levelEle = document.getElementById('level')!

        this.upScore = upScore
        this.maxLevel = maxLevel
    }

    // Add 1 point
    addScore() {
        // Update score UI
        this.scoreEle.innerHTML = ++this.score + ''
        // Check level up
        if (this.score % this.upScore === 0) {
            this.levelUp()
        }
    }

    // Level up
    levelUp() {
        // Stop at max level
        if (this.level < this.maxLevel) {
            // Update level UI
            this.levelEle.innerHTML = ++this.level + ''
        }

    }
}

export default ScorePanel