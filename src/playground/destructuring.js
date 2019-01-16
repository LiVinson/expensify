//---------Object Destructuring-----------

const person = {
   name: "Lisa",
   age: 28,
   location: {
       city: 'Orlando',
       temp: 50
   }
}

//const {prop1 = "Default" , prop2: newVarName, prop3: newVarName = "defaultName" } = object
// const { name: firstName = "Anonymous", age = "unknown year's" } = person;

// console.log(`${firstName} is ${age}`)

// const { city, temp: temperature } = person.location;
// if (city && temperature) {
//     console.log(`It's ${temperature} degrees in ${city}`)
// }


const book = {
    title: "Game of Thrones",
    author: "George R.R. Martin",
    publisher: {
        name: "Bantam Spectra"
    }
}

const { name: publisherName = "Self-published"} = book.publisher
// console.log(publisherName);

//---------Array Destructuring-----------

const address = ["4933 Lescot Lane", "Orlando", "Florida", "32811"];
const [, city, state = "Georgia"] = address;

console.log(`You are in ${city} ${state}`)

const item = ["Coffee (iced)", "$3.00", "$3.50", "3.75"];
const [itemName, , mediumCost] = item


console.log(`A medium ${itemName} costs $${mediumCost}`);