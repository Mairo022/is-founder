import { Command } from "commander";

function main(): void {
    userInterface()
}

function userInterface(): void {
    const program = new Command();
    program.argument('<name>')
    program.parse(process.argv)

    const name: string | undefined = program.processedArgs[0]
}

main()