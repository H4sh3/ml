class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getX() {
        return map(this.x, -1, 1, 0, width)
    }

    getY() {
        return map(this.y, -1, 1, 0, height)
    }

    getArray() {
        return [this.x,this.y,1]
    }
}