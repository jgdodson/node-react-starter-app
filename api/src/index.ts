import dotenv from 'dotenv';

// Read .env file
dotenv.config();

import config from 'config';
import app from './app';

const port = config.get<number>('app.port');

console.log(`server listening on port [${port}]`);

app.listen(port);
