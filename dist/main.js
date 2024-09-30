"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const post_to_pr_1 = require("./post-to-pr");
// import { wait } from './wait'
/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
    return await (0, post_to_pr_1.postToPull)();
    // const ms: string = core.getInput('milliseconds')
    // // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    // core.debug(`Waiting ${ms} milliseconds ...`)
    // // Log the current timestamp, wait, then log the new timestamp
    // core.debug(new Date().toTimeString())
    // await wait(parseInt(ms, 10))
    // core.debug(new Date().toTimeString())
    // // Set outputs for other workflow steps to use
    // core.setOutput('time', new Date().toTimeString())
}
//# sourceMappingURL=main.js.map