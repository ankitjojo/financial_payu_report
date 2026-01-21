function toFixedNumber(value, decimals = 2) {
  if (value === null || value === undefined || isNaN(value)) {
    return 0;
  }

  return Number(
    (Math.round((Number(value) + Number.EPSILON) * Math.pow(10, decimals)) /
      Math.pow(10, decimals)).toFixed(decimals)
  );
}

module.exports = { toFixedNumber }