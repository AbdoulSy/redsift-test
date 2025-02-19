# Redsift Engineering mini-test

What skills are we looking for?

- Analytic Skills - How can you think through problems and analyze things?
- Coding Skills - Do you code well, by writing clean, simple, organized, readable code?
- Technical knowledge - Do you know the fundamentals?

## Task 1

For every number between 1 and 20 (inclusive):

print 'two' if it divides by two with no remaining
'five' if it divides by five with no remaining and
'twofive' if it divides by both 'two' and 'five with no remaining.

```javascript
const task1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
```

The response

```javascript
/**
 * @type Array<number> task1
 **/
const task1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
/**
 * Function two five
 * @param {number} n The number being evaluated
 * @returns {string}
 **/
const twoFive = (n) => (
  (n%2 === 0 ? 'Two' | '') +
  (n%5 === 0 ? 'Five' | '')
) || n;

const task1Result = task1.map(twoFive);

console.log(task1Result);
```

## Task 2

Sort (and manipulate) this data so that it prints as follows (alphabetical cities, grouped by country):

```bash
Expected output:
Australia: Brisbane, Cairns, Melbourne, Perth, Sydney
Japan: Hiroshima, Osaka, Kyoto, Tokyo
United Kingdom: Birmingham (England), Bristol (England), Cardiff (Wales), Edinburgh (Scotland), London (England), Manchester (England)
New Zealand: Auckland, Christchurch, Dunedin, Wellington
```

```javascript
const task2 = [
  ["Brisbane, Australia"],
  ["Hiroshima, Japan"],
  ["Birmingham, United Kingdom"],
  ["Auckland, New Zealand"],
  ["Christchurch, New Zealand"],
  ["Cairns, Australia"],
  ["Osaka, Japan"],
  ["Bristol, United Kingdom"],
  ["Cardiff, Wales, United Kingdom"],
  ["Edinburgh, Scotland, United Kingdom"],
  ["London, England, UK"],
  ["Manchester, England, UK"],
  ["Dunedin, New Zealand"],
  ["Wellington, New Zealand"],
  ["Melbourne, Australia"],
  ["Perth, Australia"],
  ["Sydney, Australia"],
  ["Kyoto, Japan"],
  ["Tokyo, Japan"],
  ["Brisbane, Australia"],
];

let countries = new Set();
let citiesByCountry = new Map();
let task2Map = new Map(task2);
const addCity = (set, country, city, locality) => {
  const toAdd = `${city}${locality}`;

  return set.has(country) ? set.get(country).add(toAdd) : new Set([toAdd]);
};

for (let [cityCountry] of task2Map) {
  const locations = cityCountry.split(", ");
  const [city, countryOrLocality, countryOrNull] = locations;
  const hasLocality = locations.length > 2;
  const countryElement = hasLocality ? countryOrNull : countryOrLocality;
  const localityElement = hasLocality ? ` (${countryOrLocality})` : "";
  const officialCountry = countryElement === "UK" ? "United Kingdom" : countryElement;

  citiesByCountry.set(officialCountry, addCity(citiesByCountry, countryElement, city, localityElement));
}

const sortedCountries = Array.from(citiesByCountry).sort();

//render solution
sortedCountries.map((c) => {
  const [con, ci] = c;
  const li = Array.from(ci);

  console.log(`${con}: ${li.join(",")}`);
});
```

## Task 3

Count how many Apples, Pears, Lemons, Oranges, Pineapples, Tomatoes, Mangos and Bananas are in the list.

```javascript
Expected output:
Apple: 2,
Pear: 3
Lemon: 2,
Orange: 1,
Pineapple: 2,
Tomato: 1,
Mango: 1
Banana: 0
```

```javascript
const task3 = [
  "apple",
  "pear",
  "lemon",
  "orange",
  "pineapple",
  "tomato",
  "lettuce",
  "mango",
  "apple",
  "pineapple",
  "lemon",
  "pear",
  "pear",
];

const task3Set = new Set(task3);
let myMap = new Map();

for (let elem of task3Set) {
  let stack = [];
  task3.forEach((el) => {
    if (el === elem) {
      stack.push(el);
    }
  });

  myMap.set(elem, stack.length);
}
```

## Task 4

Extract out Sarah and Jane's phone numbers from this string

```javascript
const task4 = `{"sarah": {"phone": "077 123 4567", "email": "sarah@yahoo.com" }, "jane": {"phone": "021 465 1203"}}`;

const phoneBook = JSON.parse(task4);
const phones = Object.entries(phoneBook);

for(let key, val of phones) {
  console.log(`${key}: ${val.phone}`);
}
```

## Task 5

Extract out the email addresses from each of these strings

```javascript
const task5 = [
  "Hey @redsift - have you contacted reallycool@company.com yet?",
  "sdifjoweij34190 1ej1o3 team@redsift.io (127.0.0.0.1)",
  "Please contact us on help@redsift.io or support@redsift.io",
  "Super Cool Dude <supercooldude@hotmail.com>",
  "Our super secret login details are username: secret@email.com password: secretp@ssword",
];

emailAddresses = [];
task5.forEach((sentence) => {
  const emailRegexp = /[a-z0-9]+?\@[a-z0-9]+?\.\w{2,8}/i;
  const matches = sentence.match(emailRegexp);
  emailAddresses = [...emailAddresses, ...matches];
});

console.log({ emailAddresses });
```

## Task 6

Create a function that fetches data from 'task6' (like an api request) and prints out the body. Handle errors appropiately.

```javascript
const task6 = () => {
  return new Promise((resolve, reject) => {
    let wait = setTimeout(() => {
      clearTimeout(wait);
      if (Math.random() < 0.1) {
        reject("Oops! Something unexpected happened.");
      }
      resolve(
        JSON.stringify({
          body: { status: "ok", info: ["Sally", "Sarah", "Sam", "Stacey"] },
        })
      );
    }, 2000);
  });
};

function getData(maxRetries = 10, retryCount = 0) {
  const handleError = (error = "") => {
    if (retryCount < maxRetries) {
      console.log("retrying because: " + error);
      getData(maxRetries, retryCount + 1);
    }
  };

  task6()
    .then((text) => {
      const data = JSON.parse(text);
      const { body } = data;

      if (body.status === "ok") {
        console.log(body.info);
      } else {
        console.log("retrying");
        handleError();
      }
    })
    .catch((e) => {
      console.log("retrying");
      handleError(e);
    });
}

//async/await way

async function getData(maxRetries = 10, retryCount = 0) {
  const handleError = () => {
    if (retryCount < maxRetries) {
      console.log("retrying");
      getData(maxRetries, retryCount + 1);
    }
  };
  try {
    const text = await task6();
    const data = JSON.parse(text);
    const { body } = data;

    if (body.status === "ok") {
      console.log(body.info);
    } else {
      handleError();
    }
  } catch (e) {
    handleError(e);
  }
}
```

## Task 7

What is the Big O (complexity) of the below functions?

```javascript
function task7_a(input) {
  for (let i = 0; i < input; i++) {
    let x = i + 1;
    let y = i + 2;
    let z = i + 3;
  }
  for (let j = 0; j < input; j++) {
    let p = j * 2;
    let q = j * 2;
  }
}

function task7_b(input) {
  for (let i = 0; i < input; i++) {
    let x = i + 1;
    let y = i + 2;
    let z = i + 3;
    for (let j = 0; j < input; j++) {
      let p = j * 2;
      let q = j * 2;
    }
  }
}
```

task 7_a has two loops where i grows linearly with the input
so the complexity is `O(n) + O(n) := O(2n) := O(n)`

task 7_b has one loop where the number of statements grows linearly with the input.
This loop is embedded into a similar loop, where each iteration of the parent loop will generate a loop the size of the input
So the complexity is `O(n) \* O(n) := O(n*n) := O(n^2)`

## Task 8

Find the first recurring character of the below lists

```javascript
task8 = [
  [2,5,1,2,3,5,1,2,4], Should return 2
  [2,1,1,2,3,5,1,2,4], Should return 1
  [2,3,4,5], Should return undefined
  [2,5,5,2,3,5,1,2,4] Should return 5
]
const result = [];
for (const task of task8) {
  const recur = new Set();
  let recurrent;
  for(const el of task) {
    if(recur.size == 0) {
      recur.add(el);
    }else {
      if(recur.has(el)) {
        recurrent = el;
        break;
      } else {
        recur.add(el);
      }
    }
  }

  result.push(recurrent);
}
```
