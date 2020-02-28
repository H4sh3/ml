let p
let data

setup = () => {
    createCanvas(500, 500)
    background(120)
    p = new Perceptron(2);

    data = []
    for (let i = 0; i < 1000; i++) {
        data.push([random(500), random(500)])
    }

}



draw = () => {
    draw_data(data)

    // training
    let target = 0
    let point = [random(500), random(500)]
    if ((point[0] > point[1])) {
        target = 1
    } else {
        target = -1
    }
    p.train(point, target)
}



class Perceptron {
    constructor() {
        this.weights = []
        this.lr = 0.01
        this.hidden_layer = 3
        this.initWeights()
    }

    think(input) {
        input = normalize_point(input)
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
        input = normalize_point(input)

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

draw_data = (data) => {

    // neural networks guess
    for (let i = 0; i < data.length; i++) {
        let output = p.think(data[i])
        // let target = data[i][0] > data[i][1]
        let target = data[i][0] > data[i][1]
        if(target){
            stroke(0,255,0)
        }else{
            stroke(255,0,0)
        }

        // correct guess
        
        if (output == target) {
            fill(0,255,0)
        }else{
            fill(255,0,0)
        }

        ellipse(data[i][0], data[i][1], 6, 6)
    }
}