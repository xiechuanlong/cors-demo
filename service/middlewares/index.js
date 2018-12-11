module.exports = [
    async function(ctx, next) {
        console.log('request begin')
        await next()
        console.log('request end')
    }
]