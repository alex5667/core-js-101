/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.getArea = () => this.width * this.height;
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const parse = JSON.parse(json);
  // eslint-disable-next-line no-proto
  parse.__proto__ = proto;
  return parse;
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

const cssSelectorBuilder = {
  err: 'Element, id and pseudo-element should not occur more then one time inside the selector',
  err_1: 'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element',
  str: '',
  num: 0,
  element(value) {
    const number = 1;
    if (this.num > number) { throw this.err_1; }
    // eslint-disable-next-line no-prototype-builtins
    if (this.hasOwnProperty('isElem')) { throw this.err; }
    const el = { str: value, isElem: value, num: number };
    // eslint-disable-next-line no-proto
    el.__proto__ = this;
    return el;
  },

  id(value) {
    const number = 2;
    if (this.num > number) { throw this.err_1; }
    // eslint-disable-next-line no-prototype-builtins
    if (this.hasOwnProperty('isId')) { throw this.err; }
    const idValue = this.str.concat(`#${value}`);
    const id = { str: idValue, isId: value, num: number };
    // eslint-disable-next-line no-proto
    id.__proto__ = this;
    return id;
  },

  class(value) {
    const number = 3;
    if (this.num > number) { throw this.err_1; }
    const clsValue = this.str.concat(`.${value}`);
    const cls = { str: clsValue, num: number };
    // eslint-disable-next-line no-proto
    cls.__proto__ = this;
    return cls;
  },

  attr(value) {
    const number = 4;
    if (this.num > number) { throw this.err_1; }
    const attrValue = this.str.concat(`[${value}]`);
    const attr = { str: attrValue, num: number };
    // eslint-disable-next-line no-proto
    attr.__proto__ = this;
    return attr;
  },

  pseudoClass(value) {
    const number = 5;
    if (this.num > number) { throw this.err_1; }
    const pseudoValue = this.str.concat(`:${value}`);
    const pseudo = { str: pseudoValue, num: number };
    // eslint-disable-next-line no-proto
    pseudo.__proto__ = this;
    return pseudo;
  },

  pseudoElement(value) {
    const number = 6;
    if (this.num > number) { throw this.err_1; }
    // eslint-disable-next-line no-prototype-builtins
    if (this.hasOwnProperty('isPsEl')) { throw this.err; }
    const pseudoElValue = this.str.concat(`::${value}`);
    const pseudoEl = { str: pseudoElValue, isPsEl: value, num: number };
    // eslint-disable-next-line no-proto
    pseudoEl.__proto__ = this;
    return pseudoEl;
  },

  combine(selector1, combinator, selector2) {
    const comboValue = `${selector1.str} ${combinator} ${selector2.str}`;
    const combo = { str: comboValue };
    // eslint-disable-next-line no-proto
    combo.__proto__ = this;
    return combo;
  },
  stringify() {
    return this.str;
  },
};


module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
