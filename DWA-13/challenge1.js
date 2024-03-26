const provinces = [
  "Western Cape",
  "Gauteng",
  "Northern Cape",
  "Eastern Cape",
  "KwaZulu-Natal",
  "Free State",
];
const names = [
  "Ashwin",
  "Sibongile",
  "Jan-Hendrik",
  "Sifso",
  "Shailen",
  "Frikkie",
];


names.forEach((item) => console.log(item));

names.forEach((item,index) => console.log(`${item} (${provinces[index]})`));

provinces.map((item) => console.log(item.toLocaleUpperCase()))

console.log(names.map((item) => item.length))

console.log(provinces.toSorted())


console.log(provinces.filter(item => !item.toLocaleUpperCase().includes('CAPE')).length)

console.log(names.map((name) => name.toUpperCase().split('').some(letter => letter === "S")))


console.log(names.reduce((acc, name, index) => {
    acc[name] = provinces[index];
    return acc;
},{}))