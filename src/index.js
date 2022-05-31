import _ from 'lodash';
import './style.css';
import List from './modules/toDoTask.js';

const list = new List();

list.add('my name is waleed', false, 1);
list.add('my name is casper', true, 2);

list.display();