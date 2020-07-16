export const divideNumberWithComa = n =>
  n === null ? null : n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
