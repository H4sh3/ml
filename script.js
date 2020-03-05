let p
let points
let p1, p2
let errorGraph
let numOfPoints
let dataIndex
let currentP1
let currentP2

setup = () => {
    createCanvas(500, 500)
    background(120)
    p = new Perceptron(3);
    numOfPoints = 100
    points = []
    for (let i = 0; i < numOfPoints; i++) {
        points.push(new Point(random(1), random(1)))
    }
    frameRate(60)
    p1 = new Point(0,0)
    p2 = new Point(width, 0)
    errorGraph = []
    dataIndex = 0

    currentP1 = new Point(0,guessY(0))
    currentP2 = new Point(1,guessY(width))
}

draw = () => {
    background(100)
    draw_data(points)

    // training
    //let point = new Point(random(500), random(500))
    let point = points[dataIndex%numOfPoints]
    dataIndex+=1
    let target = fxn(point.x) > point.y ? 1 : -1

    //console.log(point.getArray())
    p.train(point.getArray(), target)
    p1.y = fxn(p1.x)
    p2.y = fxn(p2.x)
    line(p1.getX(), p1.getY(), p2.getX(), p2.getY())

    // current
    currentP1.y = guessY(0)
    currentP2.y = guessY(1)
    line(currentP1.getX(),currentP1.getY(),currentP2.getX(),currentP2.getY())

    drawErrorGraph()
}

drawErrorGraph = () => {
    fill(255)
    rect(0, height - 50, 100, 50)
    let i = 0
    for (let e in errorGraph) {
        fill(0)
        rect(map(i, 0, errorGraph.length, 0, 100), height - 50 + map(errorGraph[e], 0, numOfPoints, 50, 0), 1, 1)
        i += 1
    }
}

guessY = (x) => {
    let w0 = p.weights[0]
    let w1 = p.weights[1]
    let w2 = p.weights[2]

    return -(w2/w1)-(w0/w1)*x
}



class Perceptron {
    constructor() {
        this.weights = []
        this.lr = 0.001
        this.hidden_layer = 3
        this.initWeights()
    }

    think(input) {
        let sum = 0;
        if (input.length != this.weights.length) {
            console.error("error, wrong input length", input.length, this.weights.length)
            return;
        }

        for (let i = 0; i < input.length; i++) {
            sum += input[i] * this.weights[i]
        }
        return sign(sum)
    }

    train = (input, target) => {
        let output = this.think(input)
        let error = target - output
        for (let i = 0; i < this.weights.length; i++) {
            let deltaW = error * input[i] * this.lr
            this.weights[i] += deltaW
        }
    }

    initWeights = () => {
        for (let i = 0; i < this.hidden_layer; i++) {
            this.weights.push(random(-1, 1))
        }
    }

}


fxn = (x) => {
    return 0.3*x + 0.2
}

draw_data = (points) => {
    let numOfErrors = 0
    for (let i = 0; i < points.length; i++) {
        let output = p.think(points[i].getArray())
        let target = fxn(points[i].x) > points[i].y ? 1 : -1
        if (output === target) {
            fill(0, 255, 0)
        } else {
            numOfErrors += 1
            fill(255, 0, 0)
        }
        ellipse(points[i].getX(), points[i].getY(), 10, 10)
    }
    errorGraph.push(numOfErrors)
}
