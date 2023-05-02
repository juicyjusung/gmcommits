<div align="center">
  <div>
    <img src=".github/screenshot.png" alt="AI Commits"/>
    <h1 align="center">AI Commits</h1>
  </div>
	<p>A CLI that writes your git commit messages for you with AI. Never write a commit message again.</p>
	<a href="https://www.npmjs.com/package/gmcommits"><img src="https://img.shields.io/npm/v/gmcommits" alt="Current version"></a>
</div>

---

## Setup

> The minimum supported version of Node.js is the latest v14. Check your Node.js version with `node --version`.


1. Install _gmcommits_:

    ```sh
    npm install -g gmcommits
    ```

2. Retrieve your API key from [OpenAI](https://platform.openai.com/account/api-keys)

    > Note: If you haven't already, you'll have to create an account and set up billing.

3. Set the key so gmcommits can use it:

    ```sh
    gmcommits config set OPENAI_KEY=<your token>
    ```

    This will create a `.gmcommits` file in your home directory.


### Upgrading

Check the installed version with:
```
gmcommits --version
```

If it's not the [latest version](https://github.com/Nutlope/gmcommits/releases/latest), run:

```sh
npm update -g gmcommits
```

## Usage
### CLI mode

You can call `gmcommits` directly to generate a commit message for your staged changes:

```sh
git add <files...>
gmcommits
```

`gmcommits` passes down unknown flags to `git commit`, so you can pass in [`commit` flags](https://git-scm.com/docs/git-commit).

For example, you can stage all changes in tracked files with as you commit:
```sh
gmcommits --all # or -a
```

> 👉 **Tip:** Use the `aic` alias if `gmcommits` is too long for you.

#### Generate multiple recommendations

Sometimes the recommended commit message isn't the best so you want it to generate a few to pick from. You can generate multiple commit messages at once by passing in the `--generate <i>` flag, where 'i' is the number of generated messages:
```sh
gmcommits --generate <i> # or -g <i>
```

> Warning: this uses more tokens, meaning it costs more.

### Git hook

You can also integrate _gmcommits_ with Git via the [`prepare-commit-msg`](https://git-scm.com/docs/githooks#_prepare_commit_msg) hook. This lets you use Git like you normally would, and edit the commit message before committing.

#### Install

In the Git repository you want to install the hook in:
```sh
gmcommits hook install
```

#### Uninstall
In the Git repository you want to uninstall the hook from:

```sh
gmcommits hook uninstall
```

#### Usage

1. Stage your files and commit:
    ```sh
    git add <files...>
    git commit # Only generates a message when it's not passed in
    ```

    > If you ever want to write your own message instead of generating one, you can simply pass one in: `git commit -m "My message"`

2. gmcommits will generate the commit message for you and pass it back to Git. Git will open it with the [configured editor](https://docs.github.com/en/get-started/getting-started-with-git/associating-text-editors-with-git) for you to review/edit it.

3. Save and close the editor to commit!

## Configuration

### Reading a configuration value
To retrieve a configuration option, use the command:

```sh
gmcommits config get <key>
```

For example, to retrieve the API key, you can use:
```sh
gmcommits config get OPENAI_KEY
```

You can also retrieve multiple configuration options at once by separating them with spaces:

```sh
gmcommits config get OPENAI_KEY generate
```

### Setting a configuration value

To set a configuration option, use the command:

```sh
gmcommits config set <key>=<value>
```

For example, to set the API key, you can use:

```sh
gmcommits config set OPENAI_KEY=<your-api-key>
```

You can also set multiple configuration options at once by separating them with spaces, like

```sh
gmcommits config set OPENAI_KEY=<your-api-key> generate=3 locale=en
```

### Options
#### OPENAI_KEY

Required

The OpenAI API key. You can retrieve it from [OpenAI API Keys page](https://platform.openai.com/account/api-keys).

#### locale
Default: `en`

The locale to use for the generated commit messages. Consult the list of codes in: https://wikipedia.org/wiki/List_of_ISO_639-1_codes.

#### generate

Default: `1`

The number of commit messages to generate to pick from.

Note, this will use more tokens as it generates more results.

#### proxy

Set a HTTP/HTTPS proxy to use for requests.

To clear the proxy option, you can use the command (note the empty value after the equals sign):

```sh
gmcommits config set proxy=
```

#### model

Default: `gpt-3.5-turbo`

The Chat Completions (`/v1/chat/completions`) model to use. Consult the list of models available in the [OpenAI Documentation](https://platform.openai.com/docs/models/model-endpoint-compatibility).

> Tip: If you have access, try upgrading to [`gpt-4`](https://platform.openai.com/docs/models/gpt-4) for next-level code analysis. It can handle double the input size, but comes at a higher cost. Check out OpenAI's website to learn more.


#### timeout
The timeout for network requests to the OpenAI API in milliseconds.

Default: `10000` (10 seconds)

```sh
gmcommits config set timeout=20000 # 20s
```

#### max-length
The maximum character length of the generated commit message.

Default: `50`

```sh
gmcommits config set max-length=100
```

## How it works

This CLI tool runs `git diff` to grab all your latest code changes, sends them to OpenAI's GPT-3, then returns the AI generated commit message.

Video coming soon where I rebuild it from scratch to show you how to easily build your own CLI tools powered by AI.

## Maintainers

- **Hassan El Mghari**: [@Nutlope](https://github.com/Nutlope) [<img src="https://img.shields.io/twitter/follow/nutlope?style=flat&label=nutlope&logo=twitter&color=0bf&logoColor=fff" align="center">](https://twitter.com/nutlope)


- **Hiroki Osame**: [@privatenumber](https://github.com/privatenumber) [<img src="https://img.shields.io/twitter/follow/privatenumbr?style=flat&label=privatenumbr&logo=twitter&color=0bf&logoColor=fff" align="center">](https://twitter.com/privatenumbr)


## Contributing

If you want to help fix a bug or implement a feature in [Issues](https://github.com/Nutlope/gmcommits/issues), checkout the [Contribution Guide](CONTRIBUTING.md) to learn how to setup and test the project.
