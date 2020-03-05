class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getX() {
        return map(this.x, 0, 1, 0, width)
    }

    getY() {
        return map(this.y, 0, 1, 0, height)
    }

    getArray() {
        return [this.x,this.y, 1]
    }
}