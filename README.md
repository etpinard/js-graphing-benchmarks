# js-graphing-benchmarks

Javascript graphing library benchmarks.

The benchmark suites in this repo are comparing
[Highcharts](https://github.com/highcharts/highcharts) and
[plotly.js](https://github.com/plotly/plotly.js) at the moment.
Comparisons with other libraries is in the plans.

## How to run this thing?

- Clone this repo
- cd into it
- Run `npm i`
- Pick one benchmark suite (`ls suites`)
- Run `npm run bench -- <name-of-the-suite>`

## How does this work?


### What libraries are used?

See the *files* field in the
[`karma.conf.js`](https://github.com/etpinard/js-graphing-benchmarks/blob/master/karma.conf.js).
