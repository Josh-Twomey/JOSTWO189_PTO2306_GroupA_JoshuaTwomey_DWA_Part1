const products = [
  { product: "banana", price: "2" },
  { product: "mango", price: 6 },
  { product: "potato", price: " " },
  { product: "avocado", price: "8" },
  { product: "coffee", price: 10 },
  { product: "tea", price: "" },
];



products.forEach((item) => console.log(item.product));

console.log(products.filter((item) => item.product.length <= 5));

console.log(
  products
    .filter((value) => Number(value.price) !== 0)
    .map((number) => (number.price = Number(number.price)))
    .reduce((acc, el) => acc + el, 0)
);

console.log(
  products.reduce((acc, el, index, array) => {
    let seperator = ", ";
    if (index === array.length - 2) {
      seperator = " and ";
    } else if (index === array.length - 1) {
      seperator = "";
    }
    return acc + el.product + seperator;
  }, "")
);
let highest = "";
let lowest = "";
console.log(
  products.reduce((acc, el, index, array) => {
    const allPrices = array
      .filter((value) => Number(value.price) !== 0)
      .map((number) => (number.price = Number(number.price)));
    if (el.price === Math.max(...allPrices)) {
      highest = array[index];
    }

    if (el.price === Math.min(...allPrices)) {
      lowest = array[index];
    }

    return `Highest: ${highest.product}. Lowest: ${lowest.product}`;
  }, "")
);


console.log(
  Object.entries(products).reduce((acc, [key, value]) => {
    return [...acc,
      {
        name: value.product,
        cost: value.price,
      }];
  }, [])
);

