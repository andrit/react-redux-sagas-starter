import { call, put, take, select, throttle, fork, spawn, cancel } from 'redux-saga/lib/effects';

//call, take, race, all 
//put, select, throttle, fork, spawn, cancel are all async event

import * as TYPES from '../types';

const api = (url) => fetch(url).then(res => res.json());

export const fetchStarWarsRequest = () => ({
    type: TYPES.FETCH_STAR_WARS_REQUEST
});

//used with take
export const confirmFetchRequest = () => ({
    type: TYPES.CONFIRMATION
});

//used with spawn
export const cancelRequest = () => {
    type: TYPES.CANCELLED
}

//Throttle: spawn a new handleInput saga after 500
/*
function* handleInput(input){}

function* watchInput() {
    yield throttle(500, 'INPUT_CHANGED', handleInput)
}
*/

export function* fetchPerson(action) {
    try{
        //take: is a blocking effect
        yield take(TYPES.CONFIRMATION);

        //race: will invoke the provided efects and return which resolves first
        /*
        const { normal, custom } = yield race({
            normal: call(api, 'https://swapi.co/api/people/'),
            custom: call(api, 'https://swapi.co/api/people/justforAndrew')
        }
        */
        //all: runs all the effects regardless which returns first.  it is a hybrid, blocking or nonblocking effect
        /*
        const { normal, custom } = yield all({
            normal: call(api, 'https://swapi.co/api/people/'),
            custom: call(api, 'https://swapi.co/api/people/justforAndrew')
        })
        */
       //select is nonblocking effect...will return the current state
       const selector1 = yield select(state => state.starWars);
       console.log('selector1: ', selector1);

       //fork: handy when you need to send a request but dont need the return data, 
       //but fork will cause the fetchPerson generator to wait for it to complete
       //yield fork(api, 'https://swapi.co/api/people/');

       //spawn: create a detached task.  
       //Like fork, non-blocking but fetchPerson wont wait for spawn to resolve for fetchPerson to return
       //yield spawn(api, 'https://swapi.co/api/people/');

        const dogs = yield spawn(api, 'https://dog.ceo/api/breed/list/alls');
        //call is a blocking effect
        const person = yield call(api, 'https://swapi.co/api/people/');
        //put is a nonblocking effect
        yield put({type: TYPES.FETCH_STAR_WARS_SUCCESS, data: person.results})

        //can be used to cancel spawn or also fork tasks
        yield take('Cancelled')
        yield cancel(dogs);

        //select
        const selector2 = yield select(state => state.starWars);
       console.log('selector2: ', selector2);
    } catch (e) {
        console.log('err' , e);
    }
}