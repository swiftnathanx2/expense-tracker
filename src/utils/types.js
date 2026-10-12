/**
 * @typedef {Object} Transaction
 * @property {string} id
 * @property {'income' | 'expense'} type
 * @property {number} amount
 * @property {string} categoryId
 * @property {string} date - 'YYY-MM-DD'
 * @property {string} note
 */

const testDate = new Date();

console.log(testDate.toISOString().split("-")[0]);
