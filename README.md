# ton-dev-cli
TON Labs Dev Command Line Tools

See [https://docs.ton.dev](https://docs.ton.dev) for documentation. [Youtube channel](https://www.youtube.com/channel/UC9kJ6DKaxSxk6T3lEGdq-Gg).

---

# Install
```shell
npm install -g ton-dev-cli
```

or

```shell
sudo npm install -g ton-dev-cli
```

# Tondev CLI

Сall `tondev --help` for the complete list of commands.

## Initialization

In order to get started, run: `tondev setup`

The command triggers Docker image pull and launches the corresponding containers:

- tonlabs-compilers-\<local user name\> that is used for building solidity contracts
- tonlabs-local-node-\<local user name\> is a local TON node container runs compiled contracts.

You can specify additional options to customize the installation:
- `-n`, `--networks`
- `-m`, `--compilers`

## Managing containers

To start and stop both containers, use the `tondev start` and `tondev stop` commands.
Use these commands to save machine resources.

- `restart` restarts the installed containers.
- `recreate` removes containers and re-creates them again. Start tondev utility again after.

- `-n`, `--networks [names]` applies the command to specified network(s) (use comma to separate)
- `-m`, `--compilers applies` the command to the compiler kit container

## Getting environment information

- `tondev` with the following options:
- `tondev -a` - available versions of the compiler kit and node Docker containers
- `tondev -V` - version of tondev itself
- `tondev info`

## Building local nodes network

To test your contract at multiple nodes, create a network. A network consists
of multiple inter-connected local nodes.

A single run of `tondev setup` creates a single local node listening to port 80.

In order to add another node:

```shell
tondev add anotherNode
​tondev set --port 81 anotherNode
```

`tondev add` adds another node to network config. By default it uses port 80.

Given that multiple nodes cannot use the same port, reset the port with `tondev set -p`.

> Note: You can add multiple nodes simultaneously by separating names with a space.

## Exposing local node ArangoDB

It is useful to expose ArangoDB built in each local node. To do it, run:

```shell
tondev set --db-port 8881 anotherNode
```

Instead of the port number you can specify "bind" to use the default Arango DB 
port or "unbind" to stop exposing the port.

## Renaming local node

In order to rename a node, run:

```shell
tondev set --new-name newName oldName
```

To remove a node run `tondev remove anotherNode` or `tondev rm anotherNode`.

## Compiling Solidity

Solidity contracts are compiled with the following command:

```shell
tondev sol [options] [files...]
```

The following options are available:

- `-l`, `--client-languages <languages>` to generate client code for languages: "js", "rs" (use comma to separate several languages)
- `-L`, `--client-level <client-level>` client code level: "run" to run only, "deploy" to run and deploy (includes an imageBase64 of a binary contract)

## Switching compiler versions

tondev CLI allows switching between compiler versions; run:

```shell
tondev use 0.14.0
```

The command pulls a relevant Docker container. You can also run:

```
tondev use [options] <version> to use specified version for containers
```

## Removing containers

In order to remove Docker containers and images related to TON Dev, run:

```shell
tondev clean
```

The following options are available to customize the command:

- `-n`, `--networks` clean local node docker containers and images
- `-m`, `--compilers` clean compilers docker containers and images
- `-c`, `--containers` clean containers only (default: false)

If no option is specified, the command removes all TON Dev docker containers and images.

## Key Pair Generation


command: `keys`

Usage: `tondev keys|k` [options] 

Generate random Key Pair 


---

Copyright 2018-2019 TON DEV SOLUTIONS LTD.

Licensed under the SOFTWARE EVALUATION License (the "License"); you may not use
this file except in compliance with the License.  You may obtain a copy of the
License at: https://www.ton.dev/licenses

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific TON DEV software governing permissions and
limitations under the License.
