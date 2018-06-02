#!/usr/bin/env node

const { spawnSync } = require('child_process')

const run = command => {
  return spawnSync(command, {
    shell: true,
  })
}

const ignoreBlacklist = value => {
  const pattern = /(^\*|master$)/

  return value && !pattern.test(value)
}

const runDelete = value => {
  const name = value.trim()
  const cmd = run('git branch -d ' + name)

  if (cmd.error) {
    throw cmd.error
  }

  console.log(`${name} is deleted`)

  return cmd
}

const data = run('git branch --merged').stdout

String(data)
  .split(/\r\n|\r|\n/g)
  .filter(ignoreBlacklist)
  .map(runDelete)
