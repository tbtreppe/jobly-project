const { BadRequestError } = require("../expressError");

// This allows you to partially update users, companies, and jobs. You declare keys and make it an Object constructor that has data to update.
//If there are no keys (meaning no data to update), throw an error that there is no data.
//If there is data (meaning keys=true), call it cols and map a new array that takes into account the name and returning value.
//It then returns cols, joining it and the values in the constructor function

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map(
    (colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
