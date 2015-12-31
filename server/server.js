import express from 'express';
import gutil from 'gulp-util';
import chalk from 'chalk';

var server = express(), apiRouter = express.Router(), classicRouter = express.Router();

server.set('views', './build/client');
server.use(express.static('./build/client'));

apiRouter.get('/', (req, res) => {
  res.json({message: 'Yay!'});
});

classicRouter.get('/', (req, rest) => {
  res.render('index', {});
});

server.use('/api', apiRouter); server.use('/', classicRouter);

var port = process.env.PORT || 7015;

gutil.log(chalk.magenta(`Server is running under port: ${port}`));
server.listen(port);