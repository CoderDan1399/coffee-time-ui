import * as R from 'ramda';

/**
 * Getting sick of fighting with ramda typings.
 *
 */
export const U = {
  pipe: <any>R.pipe,
  map: <any>R.map,
  flatten: <any>R.flatten,
  sum: <any>R.sum,
  compose: <any>R.compose,
  filter: <any>R.filter,
  identity: <any>R.identity,
  always: <any>R.always,
  mapAccum: <any>R.mapAccum,
};

export function anyNil(...args) {
  return args.some(a => R.isNil(a));
}
