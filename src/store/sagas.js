import { /*takeEvery, all*/ takeLatest } from 'redux-saga/lib/effects';
//takeLatest will overwrite exiting with latest, takeEvery will not
import * as TYPES from '../types';

import {/*fetchPerson, fetchPlanets*/ takeOneAtMost } from '../actions';

function* mySaga() {
   /* yield all([
        takeEvery(TYPES.FETCH_STAR_WARS_REQUEST, fetchPerson),
        takeEvery(TYPES.FETCH_STAR_WARS_PLANET_REQUEST, fetchPlanets)
    ]);*/
    yield takeLatest(TYPES.FETCH_STAR_WARS_REQUEST, takeOneAtMost)
}

export default mySaga;
