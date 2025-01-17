/* eslint-disable no-undef,no-unused-vars */
"use strict";
const createError = require( "http-errors" );
const express = require( "express" );
const cors = require( "cors" );
const path = require( "path" );
const cookieParser = require( "cookie-parser" );
const logger = require( "morgan" );

const indexRouter = require( "./routes/index" );
const usersRouter = require( "./routes/users" );
const recipesRouter = require( "./routes/recipe" );
const ingredientsRouter = require( "./routes/ingredient" );

const app = express();

app.use( logger( "dev" ) );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, "front/build" ) ) );
app.use( cors( { origin: "http://localhost:3000" } ) );

// Routes
app.use( "/api", indexRouter );
app.use( "/api/users", usersRouter );
app.use( "/api/recipes", recipesRouter );
app.use( "/api/ingredients", ingredientsRouter );

// catch 404 and forward to error handler
app.use( ( req, res, next ) => next( createError( 404 ) ) );

// error handler
app.use( ( err, req, res, next ) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get( "env" ) === "development" ? err : {};

  // render the error page
  res.status( err.status || 500 );
  res.send( "error" );
} );

module.exports = app;
