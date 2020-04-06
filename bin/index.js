#!/usr/bin/env node

const { program } = require('commander');

const aggregateDataFor = require('../src/aggregate-data/command');

program
    .version('1.0.0')
    .description('A production company data aggregator application');

program
    .command("aggregate-for <companyId>")
    .alias('agg')
    .description('aggregate data for the provided company id')
    .action(aggregateDataFor);

program.parse(process.argv);