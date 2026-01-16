console.log("SNAKE FILE CONTENT HASH:", Math.random())
class Snake {
    head: HTMLElement
    // All body parts
    bodies: HTMLCollection
    // Main snake container
    element: HTMLElement

    constructor() {
        this.element = document.getElementById('snake')!
        // First div -> Head
        this.head = document.querySelector('#snake>div') as HTMLElement
        // All segments
        this.bodies = this.element.getElementsByTagName('div')
    }

    // Get snake head position(X & Y)
    get X() {
        return this.head.offsetLeft
    }
    get Y() {
        return this.head.offsetTop
    }

    set X(value: number) {
        // No move, skip
        if (this.X === value)
            return
        // Wall hit
        if (value < 0 || value > 290) {
            throw new Error("! GAME OVER !")
        }

        // Prevent 180 turn(X)
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            if (value > this.X) {
                value = this.X - 10
            } else {
                value = this.X + 10
            }
        }

        // Move body first
        this.moveBody()
        // Move head
        this.head.style.left = value + 'px'
        // Self hit check
        this.checkHeadBody()

    }

    set Y(value: number) {
        if (this.Y === value)
            return

        if (value < 0 || value > 290) {
            throw new Error("! GAME OVER !")
        }

        // Prevent 180 turn(Y)
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            if (value > this.Y) {
                value = this.Y - 10
            } else {
                value = this.Y + 10
            }
        }

        this.moveBody()
        this.head.style.top = value + 'px'
        this.checkHeadBody()
    }

    // Body expansion
    addBody() {
        this.element.insertAdjacentHTML("beforeend", "<div></div>")
    }

    moveBody() {
        // Tail -> Head
        for (let i = this.bodies.length - 1; i > 0; i--) {
            // Prev segment pos
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop

            const cur = this.bodies[i] as HTMLElement;
            cur.style.left = X + 'px';
            cur.style.top = Y + 'px';

        }
    }

    // Check if the head hits any part of the body
    checkHeadBody() {
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                throw new Error('!HIT YOURSELF!')
            }
        }
    }

}
export default Snake