// script.js
// @ts-check
// added brackets around params and added return 

/**
 * Adds two numbers together
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */
function add  (a,b)  { return a  + b }
// changed the minus to multiplication

/**
 * Multiplies two numbers together
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */
function multiply (a,b) { return a * b }
/**
 * Uses the add and multiply Functions to do the following to three numbers:
 * (A+B)*C
 */
function internal() {
	// Added the .internal as it references the object 
	const added = this.add(this.internal.a,this.internal.b)
	// added multiplication variable
	const multiplication = this.multiply(added,this.internal.c)
	// console log multiplication
	console.log(multiplication)
}

//Not allowed to change below this
/**
 * @typedef {object} Internal - An object that has 3 numbers 
 * @property {number} internal.a 
 * @property {number} internal.b 
 * @property {number} internal.c 
 */

const example1 = {
  /**
   * @type {Internal}
   * @property {number} a 
   * @property {number} b
   * @property {number} c
   */
  internal: {
    a: 2,
    b: 4,
    c: 8,
  },
  add,
  multiply,
  calculate: internal,
};


const example2 = {
  /**
   * @type {Internal}
   * @property {number} a
   * @property {number} b
   * @property {number} c
   */
  internal: {
    a: 2,
    b: 2,
    c: 3,
  },
  add,
  multiply,
  calculate: internal,
};

example1.calculate();
example2.calculate();
