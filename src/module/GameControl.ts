import Food from './Foods'
import ScorePanel from './ScorePanel'
import Snake from './Snake'

class GameControl {
    snake: Snake
    food: Food
    scorePanel: ScorePanel

    // Moving direction
    direction: string = 'Right'

    // Alive or Not
    isLive = true

    // Start/Stop
    isRunning = false

    constructor() {
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel(10, 2)

        this.init()
    }

    init() {
        /* Bind `this` to the GameControl instance so the handler can access game state
        instead of `document` when the keydown event fires. */
        document.addEventListener('keydown', this.keydownHandler.bind(this))
        // this.run()


    }

    keydownHandler(event: KeyboardEvent) {
        event.preventDefault()
        // this.direction = event.key
        event.preventDefault()

        // Space: Start -> Paluse
        if (event.code === 'Space') {
            if (!this.isLive) {
                this.resetGame()
                return
            }
            this.isRunning = !this.isRunning

            // Paluse -> Start
            if (this.isRunning && this.isLive) {
                this.run()
            }
            return
        }

        if (!this.isRunning) return

        this.direction = event.key
    }

    resetGame() {
        window.location.reload()
    }

    run() {
        if (!this.isLive || !this.isRunning) return
        /*
        Top -> Increase
        Right -> Increase
        Down -> Decrease
        Left -> Decrease
        */
        let X = this.snake.X
        let Y = this.snake.Y
        const step: number = 10

        switch (this.direction) {
            case 'ArrowUp':
            case 'Up':
                Y -= step
                break

            case "ArrowDown":
            case 'Down':
                Y += step
                break

            case 'ArrowLeft':
            case 'Left':
                X -= step
                break

            case 'ArrowRight':
            case 'Right':
                X += step
                break
        }

        this.checkEat(X, Y)

        // Logic for GAME OVER
        try {
            this.snake.X = X
            this.snake.Y = Y
        } catch (e) {
            if (e instanceof Error) {
                alert(e.message)
            } else {
                alert(String(e))
            }
            this.isLive = false
        }

        /* As long as the game is alive (`isLive` is true), calculate a delay based on the current level,
        then run `run()` again after that delay to keep the snake moving. */
        // this.isLive && setTimeout(this.run.bind(this), 120 - (this.scorePanel.level - 1) * 30)
        const delay = Math.max(30, 120 - (this.scorePanel.level - 1) * 30)
        this.isLive && this.isRunning && setTimeout(this.run.bind(this), delay)

    }

    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            this.food.change()
            this.scorePanel.addScore()
            this.snake.addBody()
        }
    }
}


export default GameControl