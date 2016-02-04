# js-graphing-benchmarks

Javascript graphing library benchmarks.

The benchmark suites in this repo are comparing
[Highcharts](https://github.com/highcharts/highcharts) and
[plotly.js](https://github.com/plotly/plotly.js) at the moment.
Comparisons with other libraries is in the plans.

### How to run this thing?

##### 1. Setup

- Clone this repo
- cd into it
- Run `npm i`

##### 2. Run a benchmark suite

- Pick one benchmark suite (`ls suites`)
- Run `npm run bench -- <name-of-the-suite>`

Then check the full results in `./results/<name-of-the-suite>.json`.

##### 3. Plot the results

- Make yourself a free [plotly](https://plot.ly/) account
- Set up your plotly API [credentials](https://plot.ly/settings/api/) in
  `./plotly_crendentials.json` as

```json
{
    "username": "your-plotly-username",
    "apiKey": "your-api-key"
}
```

- Run `npm run plot -- <name-of-the-suite>` to plot the results of one benchmark
  suite
- **OR** run `npm run plot` to plot the results of benchmark suites in `results/`


### How does this work?

Thi



### What libraries are used?

See the *files* field in the
[`karma.conf.js`](https://github.com/etpinard/js-graphing-benchmarks/blob/master/karma.conf.js).
