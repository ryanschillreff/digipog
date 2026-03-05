// Connect to Formbar WS API
const io = require('socket.io-client');
// Replace this address with the address of the Formbar you want to use.
const socket = io("https://formbar.yorktechapps.com/", {
    extraHeaders: {
        api: "4a3a6d120689804e461421efb0b286ff6c3117ea03cef3d955646c97d2a2b440"
    }
});

// Example Data Object
const data = {
    from: 90,
    to: 28,
    amount: 5,
    reason: "test",
    pin: 3454
}

// Wait for successful connection
socket.on("connect", () => {
    console.log("Connected to server");
    // Send the transfer
    socket.emit("transferDigipogs", data);
});
socket.onAny((eventName, data) => {
    console.log(eventName);
    console.log(data);


});
// Check the transfer response
socket.on("transferResponse", (response) => {
    console.log("Transfer Response:", response);
    // response will be: { success: true/false, message: "..." }
});