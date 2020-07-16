export const capitalize = str => {
  if (typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const divideNumberWithComa = n =>
  n === null ? null : n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
