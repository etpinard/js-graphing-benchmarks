# js-graphing-benchmarks

Javascript graphing library benchmarks.

This repo compares the performance of two javascript graphing libraries at the
moment: 
[Highcharts](https://github.com/highcharts/highcharts) and
[plotly.js](https://github.com/plotly/plotly.js).
Comparisons with other libraries are in the plans.

## How to run this thing?

##### 1. Setup

- Clone this repo
- `cd js-graphing-benchmarks`
- Run `npm i`

##### 2. Run a benchmark suite

- Pick one benchmark suite (run `ls suites` for the complete list of names)
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
- **OR** run `npm run plot` to plot the results of benchmark suites in `./results/`


## How does this work?

This repo uses the [karma](https://github.com/karma-runner/karma) test-runner to
boot up browser instances from the command line. Running `npm i` installs launchers
for Chrome and Firefox by default.  The
[karma-browserify](https://github.com/nikku/karma-browserify) is used to bundle
up CommonJS modules before execution in the browsers. The
[karma-custom](https://github.com/AlexisTessier/karma-custom) framework is used
for custom comminucation between the karma runner and the karma reporter.
In addition, this repo makes use of a homemade
[benchmarking](https://github.com/etpinard/js-graphing-benchmarks/blob/master/lib/bench.js)
utility and karma
[reporter](https://github.com/etpinard/js-graphing-benchmarks/blob/master/lib/report.js).
The homemade benchmarking utility uses
[`window.performance`](https://developer.mozilla.org/en-US/docs/Web/API/Window/performance)
to compute time deltas.
Finally, the results are plotted on [plot.ly](https://plot.ly/) using plotly's
[node.js API](https://github.com/plotly/plotly-nodejs).

##### What libraries are used?

See the *files* field in the
[`karma.conf.js`](https://github.com/etpinard/js-graphing-benchmarks/blob/master/karma.conf.js).

##### Why not use karma benchmark?

In order to benchmark async behavior,
[Karma-benchmark](https://github.com/JamieMason/karma-benchmark) and its
[benchmark.js](https://github.com/bestiejs/benchmark.js) dependency was not
adequate.


## Adding your own benchmark suite

See examples in `./suites/`. More info coming soon.

## Credits

2016 Étienne Tétreault-Pinard. MIT License
