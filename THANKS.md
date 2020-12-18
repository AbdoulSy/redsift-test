# Thanks to Redsift

Thanks for this test,
I really enjoyed working with the redsift platform and SDK, where it was really easy to start working even without knowledge of the SDK
As this test is time-sensitive, and as I was doing this test in the middle of other tests and interview I didn't spent too much time on the testing or on providing the exact DMARC validation,
I just hope that as this test-answer is a prototype this will not be an issue:
If you want me to add tests, I'm happy to do so (e2e w/ cypress, or unit with jest)
Below are the notes or observations that I made.

## Installing redsift

Installing redsift command on my linux distribution was easy, once I had the correct distribution.
When I started the test, I was using Ubuntu 19.10, which was failing the redsift install as the mirrors for softwares were disabled.
Once Ubuntu 20.04 Installed, the installation went smoothly.

## Storybook

When navigating the project, I saw a few storybook stories.
I normally use storybook to design my components before integrating them to the app, but it seems like storybook wasn't installed.
I tried naively doing `npx sb init` on the project,
But I got yelled at, that the configuration is conflicting with the bable configuration.

## Testing

Normally, when all known-unknowns are dispelled (once the prototype is built), I throw all code away (backup), and rewrite it with tests.
using this workflow

acceptance criteria are given ->
Write cypress tests to automate the tests for A/C ->
Create the prototype =>
if Product Owner is happy -> backup prototype ->
Write unit tests ->
Refactor -> reduce the cyclomatic complexity ->
Performance -> using jest and performance.now, it has become easy to perform asymtotic analysis to reduce the big O(n) ->
Publish for release

## SPF, DKIM, DMARC Validation

I remember when I was younger, I found out that using PHP I could send email as different people, (I did it in a secure environment (school with white hats security guys))
I was always wondering how to prevent or see this as a recipient at a glance; so I'm really glad to come across this tech exercise as because having to read the RFC and your blog/website, made me understand the challenges but also, how strightforward the validation is (maybe its your platform)

## DAG and sift.json

Nice to configure, Nice to extend

## Css Styling

I kept it simple, and used style.css processed by postcss, that was there by default, normally I either use sass, or css-in-js

# D3 Charting

I tried various use cases, but as a summary, I found that the best metrics, were how many email/spam/rejected(protected by onDMARC) emails were present on the page, I could have found other metrics, but as this is a test, I just wanted to show the ability to use a chart using the d3Wrap component you provided.
I installed d3.\*, but could have optimized the build by installing only the d3 modules I needed, like d3.pie d3.select etc...
