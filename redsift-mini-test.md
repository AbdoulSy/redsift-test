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
const task1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
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
  ["Brisbane, Australia"]
];
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
  "pear"
];
```

## Task 4

Extract out Sarah and Jane's phone numbers from this string

```javascript
const task4 = `{"sarah": {"phone": "077 123 4567", "email": "sarah@yahoo.com" }, "jane": {"phone": "021 465 1203"}}`;
```

## Task 5

Extract out the email addresses from each of these strings

```javascript
const task5 = [
  "Hey @redsift - have you contacted reallycool@company.com yet?",
  "sdifjoweij34190 1ej1o3 team@redsift.io (127.0.0.0.1)",
  "Please contact us on help@redsift.io or support@redsift.io",
  "Super Cool Dude <supercooldude@hotmail.com>",
  "Our super secret login details are username: secret@email.com password: secretp@ssword"
];
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
          body: { status: "ok", info: ["Sally", "Sarah", "Sam", "Stacey"] }
        })
      );
    }, 2000);
  });
};
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

## Task 8

Find the first recurring character of the below lists

```javascript
task8 = [
  [2,5,1,2,3,5,1,2,4], Should return 2
  [2,1,1,2,3,5,1,2,4], Should return 1
  [2,3,4,5], Should return undefined
  [2,5,5,2,3,5,1,2,4] Should return 5
]
```
