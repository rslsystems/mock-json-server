const jsonServer = require('json-server')

let isAuthenticated = true;
const data = require('./data.js')
const routes = require('./app/routes.js')

const server = jsonServer.create()
const router = jsonServer.router(data)
const middlewares = jsonServer.defaults()

server.use(jsonServer.bodyParser);

// auth middleware
server.use( function ( req, res, next ) {
    if (req.url == '/healthcheck') {
        res.status( 200 ).send( "ok" )
    } else {
        next()
    }
})

server.use( function ( req, res, next ) {
    if (isAuthenticated) {
        next()
    } else {
        res.status( 401 ).send( "Unauthorized!" )
    }
} );

// the logout endpoint
server.get( '/logout', function ( req, res ) {
    isAuthenticated = false;
    res.status(200).send("logged out");
} );

server.use(middlewares)

// merge routes into default prefix
const prefix = `/${process.env.SERVER_PREFIX}/*`
const defaultRoutes = {}
defaultRoutes[prefix] = "/$1"

server.use(jsonServer.rewriter({...defaultRoutes, ...routes}));


server.use(router)

// Avoid CORS issue
// server.use( (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

server.listen(3000, () => {
    console.log(`JSON Server is running, see http://localhost:${process.env.SERVER_PORT}`)
})
