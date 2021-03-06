import express from 'express';
import bodyParser from 'body-parser';
import sessionMiddleware from './modules/session-middleware';
import passport from './strategies/user.strategy';
import userRouter from './routes/user.router';
import colorsRouter from './routes/ColorsRoutes/colors.router';
import colorsPostRouter from './routes/ColorsRoutes/colorsPost.router';
import colorsSearchRouter from './routes/ColorsRoutes/colorsSearch.router';
import blocksRouter from './routes/BlocksRoutes/blocks.router';
import blocksPostRouter from './routes/BlocksRoutes/blocksPost.router';
import pointsRouter from './routes/PointsRoutes/points.router';


require('dotenv').config();

const app: any = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/colors', colorsRouter);
app.use('/api/colorsPost', colorsPostRouter);
app.use('/api/colorsSearch', colorsSearchRouter);
app.use('/api/blocks', blocksRouter);
app.use('/api/blocksPost', blocksPostRouter);
app.use('/api/points', pointsRouter);


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT: number | string = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, (): void => {
  console.log(`So awesome. Much wow. Listening on port: ${PORT}`);
});

export default app;