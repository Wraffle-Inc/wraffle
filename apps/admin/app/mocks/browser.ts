import {handlers} from './handlers';
import {setupWorker} from 'msw/browser';

const worker = setupWorker(...handlers);
export default worker;
