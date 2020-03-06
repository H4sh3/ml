let points
let p1, p2
let errorGraph
let numOfPoints
let dataIndex
let currentP1
let currentP2

let perc1,perc2
let output

setup = () => {
    createCanvas(500, 500)
    background(120)
    perc1 = new Perceptron(3,"relu");
    perc2 = new Perceptron(3,"relu");
    output = new Perceptron(2,"sign")
    numOfPoints = 100


    initPoints()
    frameRate(60)
    p1 = new Point(0,0)
    p2 = new Point(width, 0)
    errorGraph = []
    dataIndex = 0

   // currentP1 = new Point(0,guessY(0))
   // currentP2 = new Point(1,guessY(width))
}

initPoints = () => {
    points = []

    while(points.length < numOfPoints/3){
        let center = createVector(0.5,0.5)
        let point = new Point(random(1), random(1))
        let distToCenter = center.dist(createVector(point.x,point.y))
        if(distToCenter < 0.2){
            points.push(point)
        }
    }

    while(points.length < numOfPoints){
        let center = createVector(0.5,0.5)
        let point = new Point(random(1), random(1))
        let distToCenter = center.dist(createVector(point.x,point.y))
        if(distToCenter > 0.4){
            points.push(point)
        }
    }
}

draw = () => {
    background(100)
    draw_data(points)
    let point = points[dataIndex%numOfPoints]
    dataIndex+=1
    let target = getTarget(point)

    // forward
    //perc1.train(point.getArray(), target)

    // current
    //currentP1.y = guessY(0)
    //currentP2.y = guessY(1)
    //line(currentP1.getX(),currentP1.getY(),currentP2.getX(),currentP2.getY())

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
    let w0 = perceptron.weights[0]
    let w1 = perceptron.weights[1]
    let w2 = perceptron.weights[2]

    return -(w2/w1)-(w0/w1)*x
}



fxn = (x) => {
    return 0.3*x + 0.2
}

draw_data = (points) => {
    let numOfErrors = 0
    for (let i = 0; i < points.length; i++) {
        let p1 = perc1.think(points[i].getArray())
        let p2 = perc2.think(points[i].getArray())
        let answer = output.think([p1,p2])

        let target = getTarget(points[i])
        if(target === 1){
            stroke(0,255,0)
        }else{
            stroke(0)
        }
        // let target = fxn(points[i].x) > points[i].y ? 1 : -1

        if (answer === target) {
            fill(0, 255, 0)
        } else {
            numOfErrors += 1
            fill(255, 0, 0)
        }
        ellipse(points[i].getX(), points[i].getY(), 10, 10)
    }
    errorGraph.push(numOfErrors)
}

getTarget = (p) => {
    let dist = createVector(p.x,p.y).dist(createVector((width/2)/width,(height/2)/height))
    let target = dist < 0.2? 1 : -1
    return target
}
