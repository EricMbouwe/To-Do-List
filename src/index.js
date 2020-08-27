require('./style.scss');

import createTodo from './todo';
const halfmoon = require('halfmoon');
halfmoon.onDOMContentLoaded();

const work = createTodo('work', 'today', '12-2-2020', 'low');
const work2 = createTodo('work2', 'tmrw', '20-5-2010', 'high');
