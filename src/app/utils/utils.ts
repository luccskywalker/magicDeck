import { Card } from 'scryfall-sdk';

export function removeDuplicates(array: Card[]) {
  return [...new Set(array)];
}
