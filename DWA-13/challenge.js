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

const nameLengths = names.map((item) => item.length);
console.log(nameLengths)

console.log(provinces.toSorted())


const noCape = provinces.filter(item => !item.toLocaleUpperCase().includes('CAPE'))
console.log(noCape.length)

const hasS = names.map((name) => name.toLocaleLowerCase().includes("s"))
console.log(hasS);