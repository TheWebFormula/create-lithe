#!/usr/bin/env node

import { cp } from 'node:fs/promises';
import { fileURLToPath } from "node:url";
import path from 'node:path';
import fs from 'node:fs/promises';
import readline from 'node:readline'
import { styleText } from 'node:util';


const colors = {
  clear: '\x1b[0m',
  cyan: '\x1b[36m',
  blue: '\x1b[38;2;108;152;193m',
  lineNumber: '\x1b[33m',
  brightWhite: '\x1b[0;38;2;241;241;241;49m',
  white: '\x1b[0;38;2;201;201;201;49m',
  grey: '\x1b[0;38;2;125;125;125;49m',
  greem: '\x1b[32m',
  yellow: '\x1b[0;38;2;173;118;0;49m'
};

let gradient = [
  '\x1b[38;2;0;165;168m',
  '\x1b[38;2;0;191;166m',
  '\x1b[38;2;16;214;156m',
  '\x1b[38;2;107;234;138m',
  '\x1b[38;2;172;250;112m',
  '\x1b[38;2;0;165;168m'
];
let gradientShade = [
  '\x1b[38;2;17;49;50m',
  '\x1b[38;2;22;65;59m',
  '\x1b[38;2;41;87;73m',
  '\x1b[38;2;71;118;83m',
  '\x1b[38;2;75;113;45m',
  '\x1b[38;2;17;49;50m'
];

const cli = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function ask(question) {
  return new Promise((resolve) => {
    cli.question(question, (answer) => {
      resolve(answer);
    });
  });
}

let logo = `  ███    ███  ███████  ███  ███  ███████
  ███    ███    ███    ███  ███  ███
  ███    ███    ███    ████████  ██████
  ███    ███    ███    ███  ███  ███
  █████  ███    ███    ███  ███  ███████
  ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄${colors.clear}`;

let colored = logo.replace(/(?<=\s+)\S/g, (match, offset, string) => {
  const textBeforeMatch = string.slice(0, offset);
  const lineNumber = textBeforeMatch.split('\n').length;
  let color = gradient[lineNumber - 1];

  if (lineNumber === 6) return `${colors.clear}${gradient[lineNumber - 1]}▄${color}`;
  else return `${colors.clear}${gradientShade[lineNumber - 1]}█${colors.clear}${color}`
})

console.log(`

${colored}

`);

let projectName = await ask(`${colors.cyan}Enter your project name: ${colors.clear}`);
let createFolder = await ask(`${colors.cyan}Create folder? (${colors.yellow}y${colors.cyan}/${colors.yellow}n${colors.cyan}): ${colors.clear}`);
createFolder = (createFolder || '').toLowerCase();
let shouldCreateProjectFolder = createFolder === 'y' || createFolder === 'yes';
const source = './templates/main'
let destination = process.cwd();
if (shouldCreateProjectFolder) {
  destination = path.join(process.cwd(), projectName);
  await fs.mkdir(destination);
}

console.log(`\n${colors.grey}Running...${colors.clear}`);

// await cp(source, destination, {
//   recursive: true,
//   force: true
// });

console.log(`${colors.greem}\u2714 ${colors.clear}${colors.cyan}Done!${colors.clear}\n`);
console.log(`Next run${colors.clear}`);
if (shouldCreateProjectFolder) {
  console.log(`${colors.lineNumber}1. ${colors.blue}cd ${colors.clear}${projectName}${colors.clear}`);
  console.log(`${colors.lineNumber}2. ${colors.blue}npm ${colors.clear}i${colors.clear}`);
  console.log(`${colors.lineNumber}3. ${colors.blue}npm ${colors.clear}start${colors.clear}`);
} else {
  console.log(`${colors.lineNumber}1. ${colors.blue}npm ${colors.clear}i${colors.clear}`);
  console.log(`${colors.lineNumber}2. ${colors.blue}npm ${colors.clear}start${colors.clear}`);
}

process.exit();
