const capitalise = function (str) {
  const arr = str.split(' ');
  const capitaliseArr = arr.map((el) => {
    return el[0].toUpperCase() + el.slice(1, el.length);
  });

  return capitaliseArr.join(' ');
};

module.exports = {
  capitalise,
};
