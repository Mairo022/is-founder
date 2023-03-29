import { Command } from "commander";
import * as fs from "fs";
import * as readline from "readline";
import { once } from 'events';

function main(): void {
    userInterface()
}

async function userInterface(): Promise<void> {
    const program = new Command();
    program.argument('<name>')
    program.parse(process.argv)

    const name: string | undefined = program.processedArgs[0]

    if (name && await isFounder(name)) {
        console.log(name, "is a founder.")
    } else {
        console.log(name, "is not a founder.")
    }
}

async function isFounder(name: string): Promise<boolean> {
    const readStream = fs.createReadStream("founders.txt", { encoding: "utf-8" })

    const readLine = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity,
    })

    let found: boolean = false

    readLine.on("line", (line) => {
        if (line === name) {
            found = true
            // Stop reading and clean-up resources
            readStream.close()
            readLine.close()
        }
    })

    readStream.on("error", error => {
        console.error("Stream - error reading the file:", error)
    })

    readLine.on("error", error => {
        console.error("Readline - error reading the file:", error)
    })

    await once(readStream, 'close');

    return found
}

main()