module.exports = {
    log: (request, message) => {
        if(typeof(message) == 'object') {
            message = JSON.stringify(message)
        }
        console.log(`[${Date().toString()}] - [${request.rid}] - ${message}`)
    },
    error: (request, message) => {
        if(typeof(message) == 'object') {
            message = JSON.stringify(message)
        }
        console.error(`ERROR: [${Date().toString()}] - [${request.rid}] - ${message}`)
    }
}