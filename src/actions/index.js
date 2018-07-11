import { call, put, take, actionChannel } from 'redux-saga/lib/effects';

//call, take, race, all 
//put, select, throttle, fork, spawn, cancel are all async event

import * as TYPES from '../types';

const api = (url) => fetch(url).then(res => res.json());

export const fetchStarWarsRequest = () => ({
    type: TYPES.FETCH_STAR_WARS_REQUEST
});

export const queueChannelRequests = () => ({
    type: TYPES.QUEUE_CHANNEL_REQUESTS
})


export function* takeOneAtMost() {
    const chan = yield actionChannel(TYPES.QUEUE_CHANNEL_REQUESTS)

    for(let i =1; i>=1; i++){
        yield take(chan);
        yield call(api, 'https://swapi.co/api/people');
        yield put({type: TYPES.FETCH_STAR_WARS_SUCCESS, data: i})
    }
}