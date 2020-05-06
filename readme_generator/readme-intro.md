# ton-dev-cli

TON Labs Dev Command Line Tool

See [https://docs.ton.dev](https://docs.ton.dev) for documentation.  
Also check our [Youtube channel](https://www.youtube.com/channel/UC9kJ6DKaxSxk6T3lEGdq-Gg) for tutorials.

---
## Dependencies
- `Node.js` >= 10.x installed

- `Docker`  >= 19.x installed

## Install

```shell
npm install -g ton-dev-cli
```

or

```shell
sudo npm install -g ton-dev-cli
```

# Basic operations

## Invocation

While installed globally, `ton-dev-cli` package places its executable `tondev` into system path, so you could 
use it everywhere in your file system as a main command to invoke the tool.

Type:  
`tondev` `info` (or just `tondev`) - to see current status  
`tondev` `-V` - to see `ton-dev-cli` version  
`tondev` `-a` - to see versions of the compilers and node containers available in DockerHub registry  
`tondev` `-h` or `tondev` `--help` for the help about usage, options and subcommands  


>_You can use `-h` or `--help` option with any subcommand to get extended help about its usage. Also full help content is included in this document below._


## Initialization

In order to get started, run: `tondev setup`

The command triggers Docker image pull from DockerHub registry and launches the corresponding containers:

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

- `-l`, `--client-languages <languages>` to generate client code for languages: "js" (use comma to separate several languages)
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
