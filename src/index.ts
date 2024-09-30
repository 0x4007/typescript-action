import { run } from './main'
import * as core from '@actions/core'

void run()
  .then(output => core.setOutput('results', output))
  .catch(error => core.setFailed(error.message))
