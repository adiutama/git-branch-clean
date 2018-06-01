#!/usr/bin/env node

const { spawnSync } = require('child_process')

const run = command => {
  return spawnSync(command, {
    shell: true,
  })
}

const gitBranchList = run('git branch --merged')

String(gitBranchList.stdout)
  .split(/\r\n|\r|\n/g)
  .filter(value => {
    const pattern = /(^\*|master$)/

    return value && !pattern.test(value)
  })
  .map(value => {
    const branchName = value.trim()
    const gitBranchDelete = run('git branch -d ' + branchName)

    if (gitBranchDelete.error) {
      throw gitBranchDelete.error
    }

    console.log(`${branchName} is deleted`)
  })
