import { cp } from 'node:fs/promises';
import { fileURLToPath } from "node:url";
import path from 'node:path';
import fs from 'node:fs/promises';
import readline from 'node:readline'
import { styleText } from 'node:util';



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

let projectName = await ask("Enter your project name: ");
const destination = path.join(process.cwd(), projectName);
const source = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../templates/main");
await fs.mkdir(destination);

console.log('📑  Copying files...');

await cp(source, destination, {
  recursive: true,
  force: true,
});

console.log('📑  Files copied...');
console.log(styleText('green', `\ncd ${projectName}\nnpm install\nnpm start`));
