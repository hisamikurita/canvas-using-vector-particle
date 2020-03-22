class Test {
    constructor(name) {
        this.name = name;
    }

    logger() {
        console.log("Hello", this.name);
    }
}

let test = new Test('world');

test.logger();