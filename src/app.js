/**
 * Dependencies
 */
import express from 'express';
import path from 'path';
const router = require('./api/routes');



// Export app
export const app = express();

app.use(express.static(path.join(__dirname, 'public')));

/**
 * View engine
 */
app.set('views', './public/views');
app.set('view engine', 'pug');

/**
 * Routing
 */
router(app);