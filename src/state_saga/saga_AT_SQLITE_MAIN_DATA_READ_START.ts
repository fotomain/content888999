// import delay from 'redux-saga';
import { call, fork } from 'redux-saga/effects';

const delay = (ms:any) => new Promise(res => setTimeout(res, ms))

function* taskOne() {
    console.log('taskOne starting...');
    yield delay(7000);
    console.log('first task completed');
}

function* taskTwo() {
    console.log('taskTwo starting...');
    yield delay(5000);
    console.log('second task completed');
}

function* taskThree() {
    console.log('taskThree starting...');
    yield delay(3000);
    console.log('third task completed');
}

function* runTasks() {
    const firstTask:any[] = yield fork(taskOne);
    const secondTask:any[] = yield fork(taskTwo);
    const thirdTask:any[] = yield fork(taskThree);
}

export default function* parallelTasksSaga() {
    console.log('%cstarting tasks...', 'color: #16b141');
    yield call(runTasks);
    console.log('%call tasks completed', 'color: #1f29c5');
}
