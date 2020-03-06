let perceptron
let points

let errorLog
let weightsLog

let numOfPoints
let dataIndex
let currentP1
let currentP2


setup = () => {
    createCanvas(500, 500)
    background(120)
    perceptron = new Perceptron(3, "sign");
    numOfPoints = 100
    points = []
    for (let i = 0; i < numOfPoints; i++) {
        points.push(new Point(random(-1, 1), random(-1, 1)))
    }
    frameRate(60)
    errorLog = []
    dataIndex = 0
    weightsLog = []

    currentP1 = new Point(-1, guessY(-1))
    currentP2 = new Point(1, guessY(1))
}

draw = () => {
    background(100)
    // training
    let point = points[dataIndex % numOfPoints]
    dataIndex += 1

    let target = fxn(point.x) > point.y ? 1 : -1
    let w = perceptron.train(point.getArray(), target)
    weightsLog.push(w)

    stroke(1)

    //current guess
    currentP1 = new Point(-1, guessY(-1))
    currentP2 = new Point(1, guessY(1))
    line(currentP1.getX(), currentP1.getY(), currentP2.getX(), currentP2.getY())

    // target
    currentP1 = new Point(-1, fxn(-1))
    currentP2 = new Point(1, fxn(1))
    line(currentP1.getX(), currentP1.getY(), currentP2.getX(), currentP2.getY())

    draw_data(points)
    drawErrorGraph()
    drawWeightsGraph()
}

drawErrorGraph = () => {
    fill(255)
    rect(0, height - 50, 100, 50)
    let i = 0
    for (let e in errorLog) {
        fill(0)
        rect(map(i, 0, errorLog.length, 0, 100), height - 50 + map(errorLog[e], 0, numOfPoints, 50, 0), 1, 1)
        i += 1
    }
}

drawWeightsGraph = () => {
    weightsLog.length
    for (let i = 0;i < weightsLog[0].length;i++){
        fill(255)
        rect(width-200, 50*i, 200, 50)
    }

    for (let i = 0;i < weightsLog.length;i++){
        // console.log(weightsLog)
        for(let w = 0; w < weightsLog[i].length;w++){
        let x = width-200+map(i,0,weightsLog.length,0,200)
        let y = map(weightsLog[i][w],-1,1,0,50)

        rect(x,y+50*w,1,1)

        }

    }
}

guessY = (x) => {
    let w0 = perceptron.weights[0]
    let w1 = perceptron.weights[1]
    let w2 = perceptron.weights[2]

    return -(w2 / w1) - (w0 * x / w1)
}



fxn = (x) => {
    return 0.3 * x + 0.2
}

draw_data = (points) => {
    let numOfErrors = 0
    for (let i = 0; i < points.length; i++) {
        let output = perceptron.think(points[i].getArray())
        let target = fxn(points[i].x) > points[i].y ? 1 : -1
        if (output === target) {
            fill(0, 255, 0)
        } else {
            numOfErrors += 1
            fill(255, 0, 0)
        }
        ellipse(points[i].getX(), points[i].getY(), 10, 10)
    }
    errorLog.push(numOfErrors)
}
