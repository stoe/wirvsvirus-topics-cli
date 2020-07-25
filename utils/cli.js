const meow = require('meow')
const chalk = require('chalk')
const bold = chalk.bold
const cyan = chalk.cyan
const dim = chalk.dim
const magenta = chalk.magenta
const yellow = chalk.yellow

module.exports = meow(
  `
  ${bold('Usage')}
    ${magenta(`wirvsvirus-topics`)} ${cyan(`<repository>`)} ${yellow(`[--option]`)}

  ${bold('Input')}
    ${cyan(`<repository>`)}      GitHub owner/repo ${dim(`(defaults to Git remote in current directory)`)}

  ${bold('Options')}
    ${yellow(`--replace`)}, ${yellow(`-r`)}     Replace existing topics
    ${yellow(`--topic`)}, ${yellow(`-t`)}       Additional topic (can be used multiple times)
    ${yellow(`--token`)}           GitHub token ${dim(`(defaults to GITHUB_TOKEN)`)}

  ${bold('Examples')}
    ${dim(`# Add default topics of current folder's remote GitHub repository`)}
    ${magenta(`wirvsvirus-topics`)}

    ${dim(`# Add default topics for GitHub 'owner/repo' repository`)}
    ${magenta(`wirvsvirus-topics`)} ${cyan(`stoe/wirvsvirus-topics-cli`)}

    ${dim(`# Add 'cli' and default topics to current folder's remote GitHub repository`)}
    ${magenta(`wirvsvirus-topics`)} ${yellow(`-t cli`)}

    ${dim(`# Replace topics of current folder's remote GitHub repository with default topics`)}
    ${magenta(`wirvsvirus-topics`)} ${yellow(`-r`)}
`,
  {
    booleanDefault: undefined,
    description: false,
    hardRejection: false,
    inferType: false,
    input: ['repository'],
    flags: {
      replace: {
        type: 'boolean',
        alias: 'r',
        default: false
      },
      topic: {
        type: 'string',
        alias: 't',
        default: ''
      },
      token: {
        type: 'string',
        default: process.env.GITHUB_TOKEN
      }
    }
  }
)
