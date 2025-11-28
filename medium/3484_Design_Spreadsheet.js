var Spreadsheet = function (rows) {
      const collumns = Array.from({ length: 26 }, (_, i) => Array(rows).fill(0));
      this.collumns = collumns
};

/** 
 * @param {string} cell 
 * @param {number} value
 * @return {void}
 */
Spreadsheet.prototype.setCell = function (cell, value) {
      return this.collumns[cell[0].charCodeAt() - 65][cell.slice(1)] = value
};

/** 
 * @param {string} cell
 * @return {void}
 */
Spreadsheet.prototype.resetCell = function (cell) {
      return this.collumns[cell[0].charCodeAt() - 65][cell.slice(1)] = 0
};

/** 
 * @param {string} formula
 * @return {number}
 */
Spreadsheet.prototype.getValue = function (formula) {
    let expr = formula.slice(1) 
    let isPlus = expr.includes("+")
    let parts = isPlus ? expr.split("+") : expr.split("-")

    function getValueFromPart(part) {
        let num = Number(part)
        if (!Number.isNaN(num)) return num
        return this.collumns[part[0].charCodeAt() - 65][part.slice(1)]
    }

    let val1 = getValueFromPart.call(this, parts[0])
    if (parts.length === 1) return val1

    let val2 = getValueFromPart.call(this, parts[1])
    return isPlus ? val1 + val2 : val1 - val2
}


const f = new Spreadsheet(3)
f.setCell("A1", 12)
console.log(f.getValue("=A1+6"))