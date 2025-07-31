const fs = require("fs");

// const books = [
//   {
//     title: "Ego is the enemy",
//     author: "Ryan Holiday",
//   },
//   {
//     title: "The subtle art of not giving a f*ck",
//     author: "Mark Manson",
//   },
// ];

// const booksJson = JSON.stringify(books);

// const dataBuffer = fs.readFileSync("1-json.json");
// const dataJson = dataBuffer.toString();

// const data = JSON.parse(dataJson);

// console.log(data.title);

// 1. Load and parse the JSON data DONE
// 2. Change the name and age property using your info DONE
// 3. Stringify the changed object and overwrite the original data DONE
// 4. Test your work by viewing data in the JSON file DONE

const dataBuffer = fs.readFileSync("1-json.json");
const dataJson = dataBuffer.toString();

const data = JSON.parse(dataJson);

data.name = "Andrew 2";
data.age = 28;

const dataJson2 = JSON.stringify(data);
fs.writeFileSync("1-json.json", dataJson2);
console.log(dataJson2);
