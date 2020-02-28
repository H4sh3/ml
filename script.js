let p
let data

setup = () => {
    createCanvas(500, 500)
    background(120)
    p = new Perceptron(2);

    data = []
    for (let i = 0; i < 100; i++) {
        data.push([random(500), random(500)])
    }

}

normalize_point = (point) => {
    return [map(point[0], 0, width, 0, 1), map(point[1], 0, height, 0, 1)]
}

draw = () => {
    draw_data(data)
    for (let i = 0; i < data.length; i++) {
        let guess = p.guess(data[i])
        noStroke()
        if (guess == 1) {
            fill(0, 255, 0)
        } else {
            fill(255, 0, 0)
        }
        ellipse(data[i][0], data[i][1], 5, 5)
    }

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

sign = (x) => {
    return x >= 0 ? 1 : -1
}

class Perceptron {
    constructor(len_inputs) {
        this.weights = []
        this.lr = 0.01
        for (let i = 0; i < len_inputs; i++) {
            this.weights.push(random(-1, 1))
        }
    }

    guess(input) {
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

    train = (inputs, target) => {
        let guess = this.guess(inputs)
        let error = target - guess
        inputs = normalize_point(inputs)
        // guess target error
        // 1    1       0
        // 1    -1      2
        // -1   -1      0
        // -1   1       -2
        for (let i = 0; i < this.weights.length; i++) {
            let deltaW = error * inputs[i] * this.lr
            this.weights[i] += deltaW
        }
    }
}

draw_data = (data) => {
    for (let i = 0; i < data.length; i++) {
        noFill()
        if (data[i][0] > data[i][1]) {
            stroke(0, 255, 0)
        } else {
            stroke(255, 0, 0)
        }
        ellipse(data[i][0], data[i][1], 5, 5)
    }
}