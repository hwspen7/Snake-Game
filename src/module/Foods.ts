class Food {
    element: HTMLElement
    constructor() {
        this.element = document.getElementById('food')!
    }

    // Get food position X and Y
    get X() {
        return this.element.offsetLeft
    }
    get Y() {
        return this.element.offsetTop
    }

    // Modify food position
    // Left border: 0 Right border: 290
    change() {
        let top = Math.round(Math.random() * 29) * 10
        let left = Math.round(Math.random() * 29) * 10
        this.element.style.left = left + 'px'
        this.element.style.top = top + 'px'
    }
}

export default Food