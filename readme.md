# wirvsvirus-topics

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![Test](https://github.com/stoe/wirvsvirus-topics-cli/workflows/Test/badge.svg)](https://github.com/stoe/wirvsvirus-topics-cli/actions?query=workflow%3ATest)

> Add #wirvsvirus, #covid-19, #coronavirus topics to your GitHub repository

## Install

```sh
$ npm i -g wirvsvirus-topics-cli
```

## Usage

```sh
$ wirvsvirus-topics <repository> [--option]
```

## Input

- `<repository>` GitHub owner/repo (defaults to Git remote in current directory)

## Options

- `--replace`, `-r` Replace existing topics
- `--topic`, `-t` Additional topic (can be used multiple times)
- `--token` GitHub token (defaults to GITHUB_TOKEN)

## Examples

Add default topics of current folder's remote GitHub repository

```sh
$ wirvsvirus-topics
```

Add default topics for GitHub 'owner/repo' repository

```sh
$ wirvsvirus-topics stoe/wirvsvirus-topics-cli
```

Add 'cli' and default topics to current folder's remote GitHub repository

```sh
$ wirvsvirus-topics -t cli
```

Replace topics of current folder's remote GitHub repository with default topics

```sh
$ wirvsvirus-topics -r
```

## License

[MIT](./license) © [Stefan Stölzle](https://github.com/stoe)
