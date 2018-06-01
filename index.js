#!/usr/bin/env node

const { spawnSync } = require('child_process')

const options = {
  shell: true,
}

const branchList = spawnSync('git branch --merged', options)

const data = String(branchList.stdout).split(/\r\n|\r|\n/g)
const filtered = data
  .map((value) => value.trim())
  .filter((value) => {
    const isMasterOrOrigin = /master|origin$/
    const isCurrentBranch = /^\*/

    return value && !isMasterOrOrigin.test(value) && !isCurrentBranch.test(value)
  })

if (filtered.length) {
  const branchDelete = spawnSync('git branch -d ' + filtered.join(' '), options)
}

