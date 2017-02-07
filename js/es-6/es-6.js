var greet = (message, name = Daniel) => message + name; // don't have to write return
greet('Hello');

var squared = x => x * x;

// don't have to use 'that'
var Person = {
    name: 'Daniel',

    handleMessage: function (message, handler) {
        handler(message)
    },

    recieve: function () {
        this.handleMessage('Hello, ', message => console.log(message + this.name))
    },

    receiveOld: function () {
        var that = this;
        that.handleMessage('Hello, ', function (message) {
            console.log(message + that.name);
        })
    }
}

Person.receive();

function receive(complete = () => console.log('complete')) {
    complete();
}
receive(); // will return 'complete'
