#!/usr/bin/env node

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  handleError(`UNHANDLED ERROR`, err)
})

const chalk = require('chalk')
const handleError = require('cli-handle-error')
const {graphql} = require('@octokit/graphql')
const updateNotifier = require('update-notifier')
const welcome = require('cli-welcome')

const cyan = chalk.cyan
const magenta = chalk.magenta

const cli = require('./utils/cli.js')
const pkg = require('./package.json')

;(async () => {
  try {
    // Init.
    welcome(`wirvsvirus-topics`, `by ${pkg.author.url}\n${pkg.description}`, {
      bgColor: `#4078c0`,
      color: `#ffffff`,
      bold: false,
      clear: true,
      version: `v${pkg.version}`,
    })
    updateNotifier({
      pkg,
      shouldNotifyInNpmScript: true,
    }).notify({isGlobal: true})

    // Get options/flags
    const {h, v, replace, token, ...t} = cli.flags

    h && (await cli.showHelp(0))
    v && (await cli.showVersion(0))

    // Normalise topics
    const _topics = typeof t.topic === 'string' ? [t.topic] : t.topic || []
    _topics.push('wirvsvirus', 'covid-19', 'coronavirus')
    // Only unique topics
    let topics = [...new Set(_topics)]

    // Get input: repository
    const [_repository] = cli.input

    if (cli.input.length > 1) {
      throw new Error('too many arguments')
    }

    // Get owner/repo
    let owner, repo
    if (_repository) {
      ;[owner, repo] = _repository.split('/')
    } else {
      const remote = await require('git-remote-origin-url')()

      // eslint-disable-next-line prettier/prettier
      ;[owner, repo] = remote
        .split(':')[1]
        .split('.')[0]
        .split('/')
    }

    const github = graphql.defaults({
      headers: {
        authorization: `bearer ${token}`,
      },
    })

    const {repository} = await github(
      `query ($owner: String!, $repo: String!){
        repository(owner: $owner, name: $repo) {
          id
          repositoryTopics(first: 10) {
            nodes {
              topic {
                name
              }
            }
          }
        }
      }`,
      {
        owner,
        repo,
      },
    )

    const _old = repository.repositoryTopics.nodes.map((node) => {
      return node.topic.name
    })

    if (!replace) {
      topics = [...new Set(_old.concat(topics))]
    }

    topics = topics.filter((x) => {
      return x !== ''
    })

    const {updateTopics} = await github(
      `mutation ($repo: ID!, $topics: [String!]!) {
        updateTopics(input: {repositoryId: $repo, topicNames: $topics, clientMutationId: "wirvsvirus-cli"}) {
          repository {
            repositoryTopics(first: 10) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
      }`,
      {
        owner,
        repo: repository.id,
        topics,
      },
    )

    const _new = updateTopics.repository.repositoryTopics.nodes.map((node) => {
      return node.topic.name
    })

    const _nwo = `${owner}/${repo}`
    const _colored = _new.map((i) => {
      return `${magenta(i)}`
    })

    console.log(`Updated ${cyan(_nwo)} with ${_colored.join(', ')} topics`)
  } catch (error) {
    handleError(error.name, error)
  }
})()
