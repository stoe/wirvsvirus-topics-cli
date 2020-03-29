const test = require('ava')
const execa = require('execa')

test('wirvsvirus-topics', async (t) => {
  const {stdout} = await execa('./index.js', ['-v', '--token test'])

  t.true(stdout.length > 0)
})
