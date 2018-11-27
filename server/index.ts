import express from 'express';
import {join} from 'path';
import apiRouter from './routes';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import {config} from '../webpack.config';
import {json, urlencoded} from 'body-parser';
import {BUILD_URL} from '../webpack.constants';
import {connect} from 'mongoose';
import {scheduleGetAllHouses} from './services';

const app = express();
const compiler = webpack(config);
app.use(devMiddleware(compiler, {
  publicPath: BUILD_URL,
  logLevel: 'error',
}));
app.use(hotMiddleware(compiler));
app.use(json());
app.use(urlencoded({extended: true}));

connect(
  process.env.MONGO_URL,
  {
    keepAlive: 1,
    reconnectTries: Number.MAX_VALUE,
    useNewUrlParser: true,
  },
  (error) => {
    if (error) {
      console.error('Error', error, process.env.MONGO_URL);
    }
  }
);

app.use('/api', apiRouter);
app.get('*', (req, res) => {
  if (req.url === '/assets/vendor.bundle.js') {
    const vendorPath = join(process.cwd(), 'build', 'vendor.bundle.js');
    return res.sendFile(vendorPath);
  }
  const assetPath = join(process.cwd(), 'assets', 'index.html');
  return res.sendFile(assetPath);
})

app.listen(3000, () => console.log('Running on port 3000.'));

scheduleGetAllHouses();
