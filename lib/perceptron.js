
class Perceptron {
    constructor(n, aF) {
        this.weights = []
        this.lr = 0.01
        this.numOfWeights = n
        this.initWeights()
        this.activationFunction = aF
    }

    think(input) {
        if (input.length != this.weights.length) {
            console.error("error, wrong input length", input.length, this.weights.length)
            return;
        }
        
        let sum = 0;
        for (let i = 0; i < input.length; i++) {
            sum += input[i] * this.weights[i]
        }

        if (this.activationFunction === "sign") {
            return sign(sum)
        } else if (this.activationFunction === "relu") {
            return relu(sum)
        }
    }

    train(input, target) {
        let output = this.think(input)
        let error = target - output

        for (let w in this.weights) {
                let deltaW = error * input[w] * this.lr
                this.weights[w] += deltaW
                
                text(deltaW,width-100,height-30+10*w)
                fill(0)
                noStroke()
                text(this.weights[w],width-100,height-80+10*w)
        }

       return [...this.weights]
    }


    initWeights() {
        for (let i = 0; i < this.numOfWeights; i++) {
            this.weights.push(random(-1, 1))
        }
        this.weights[this.weights.length-1] = 0
    }

}


