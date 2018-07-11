import { call, put, take, select, throttle, fork, spawn, cancel, } from 'redux-saga/lib/effects';

//call, take, race, all 
//put, select, throttle, fork, spawn, cancel are all async event

import * as TYPES from '../types';

const api = (url) => fetch(url).then(res => res.json());

export const fetchStarWarsRequest = () => ({
    type: TYPES.FETCH_STAR_WARS_REQUEST
});
export const fetchStarWarsPlanetsRequest = () => ({
    type: TYPES.FETCH_STAR_WARS_PLANET_REQUEST
});


export function* fetchPerson(action) {
    try{
      
        const person = yield call(api, 'https://swapi.co/api/people/');
        //put is a nonblocking effect
        yield put({type: TYPES.FETCH_STAR_WARS_SUCCESS, data: person.results})

    } catch (e) {
        console.log('err' , e);
    }
}

export function* fetchPlanets(action) {
    try{
      
        const planet = yield call(api, 'https://swapi.co/api/planets/');
        //put is a nonblocking effect
        yield put({type: TYPES.FETCH_STAR_WARS_PLANET_SUCCESS, data: planet.results})

    } catch (e) {
        console.log('err' , e);
    }
}