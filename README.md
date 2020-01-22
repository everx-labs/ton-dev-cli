# ton-dev-cli

TON Labs Dev Command Line Tool
<br/>
<br/>

See [https://docs.ton.dev](https://docs.ton.dev) for documentation.  
Also check our [Youtube channel](https://www.youtube.com/channel/UC9kJ6DKaxSxk6T3lEGdq-Gg) for tutorials.

---

<br/>

## Dependencies
- `Node.js` >= 10.x installed

- `Docker`  >= 19.x installed
<br/>

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


## Complete help for version: 0.17.0

#### `tondev -help`

```
Usage: tondev [options] [command]

TON Labs development tools

Options:
  -V, --version                  output the version number
  -a, --available                show available versions
  -h, --help                     output usage information

Commands:
  info [options]                 Show summary about dev environment
  sol [options] [files...]       Build solidity contract[s]
  gen [options] [files...]       Generate client code for contract[s]
  start [options]                Start dev containers
  stop [options]                 Stop dev containers
  restart [options]              Restart dev containers
  recreate [options]             Recreate dev containers
  setup [options]                Setup dev environment
  clean [options]                Remove docker containers and images related 
                                 to TON Dev
  use [options] <version>        Use specified version for containers
  set [options] [network...]     Set network[s] options
  add [network...]               Add network[s]
  remove|rm [network...]         Remove network[s]
  test|t [options] [servers...]  Test network[s]
  keys|k                         Generate random Key Pair
  addr|a <addr>                  Convert address
```

### _subcommands help:_

#### `tondev info --help`

```
Usage: tondev info [options]

Show summary about dev environment

Options:
  -a, --available  show available versions
  -h, --help       output usage information
```

#### `tondev sol --help`

```
Usage: tondev sol [options] [files...]

Build solidity contract[s]

Options:
  -l, --client-languages <languages>  generate client code for languages: "js", 
                                      "rs" (multiple languages must be 
                                      separated with comma)
  -L, --client-level <client-level>   client code level: "run" to run only, 
                                      "deploy" to run and deploy (includes an 
                                      imageBase64 of binary contract) (default: 
                                      "deploy")
  --js-module <module-type>           Java Script module type: `node` to use 
                                      with `const FooContract = 
                                      require('foo`)`, `nodeNoDefault` to use 
                                      with `const {FooContract} = 
                                      require('foo`)`, `es` to use with `import 
                                      FooContract from 'foo'`, `esNoDefault` to 
                                      use with `import {FooContract} from 
                                      'foo'` (`node` is a default option) 
                                      (default: "node")
  -h, --help                          output usage information
```

#### `tondev gen --help`

```
Usage: tondev gen [options] [files...]

Generate client code for contract[s]

Options:
  -l, --client-languages <languages>  generate client code for languages: "js", 
                                      "rs" (multiple languages must be 
                                      separated with comma)
  -L, --client-level <client-level>   client code level: "run" to run only, 
                                      "deploy" to run and deploy (includes an 
                                      imageBase64 of binary contract) (default: 
                                      "deploy")
  --js-module <module-type>           Java Script module type: `node` to use 
                                      with `const FooContract = 
                                      require('foo`)`, `nodeNoDefault` to use 
                                      with `const {FooContract} = 
                                      require('foo`)`, `es` to use with `import 
                                      FooContract from 'foo'`, `esNoDefault` to 
                                      use with `import {FooContract} from 
                                      'foo'` (`node` is a default option) 
                                      (default: "node")
  -h, --help                          output usage information
```

#### `tondev start --help`

```
Usage: tondev start [options]

Start dev containers

Options:
  -n, --networks [names]  apply command to specified network[s] (names must be 
                          separated with comma)
  -m, --compilers         apply command to the compilers container
  -h, --help              output usage information
```

#### `tondev stop --help`

```
Usage: tondev stop [options]

Stop dev containers

Options:
  -n, --networks [names]  apply command to specified network[s] (names must be 
                          separated with comma)
  -m, --compilers         apply command to the compilers container
  -h, --help              output usage information
```

#### `tondev restart --help`

```
Usage: tondev restart [options]

Restart dev containers

Options:
  -n, --networks [names]  apply command to specified network[s] (names must be 
                          separated with comma)
  -m, --compilers         apply command to the compilers container
  -h, --help              output usage information
```

#### `tondev recreate --help`

```
Usage: tondev recreate [options]

Recreate dev containers

Options:
  -n, --networks [names]  apply command to specified network[s] (names must be 
                          separated with comma)
  -m, --compilers         apply command to the compilers container
  -h, --help              output usage information
```

#### `tondev setup --help`

```
Usage: tondev setup [options]

Setup dev environment

Options:
  -n, --networks [names]  apply command to specified network[s] (names must be 
                          separated with comma)
  -m, --compilers         apply command to the compilers container
  -h, --help              output usage information
```

#### `tondev clean --help`

```
Usage: tondev clean [options]

Remove docker containers and images related to TON Dev

Options:
  -n, --networks    clean local node docker containers and images
  -m, --compilers   clean compilers docker containers and images
  -c, --containers  clean containers only (default: false)
  -h, --help        output usage information
```

#### `tondev use --help`

```
Usage: tondev use [options] <version>

Use specified version for containers

Options:
  -n, --networks [names]  apply command to specified network[s] (names must be 
                          separated with comma)
  -m, --compilers         apply command to the compilers container
  -h, --help              output usage information
```

#### `tondev set --help`

```
Usage: tondev set [options] [network...]

Set network[s] options

Options:
  -p, --port <port>        host port to bound local node
  -d, --db-port <binding>  host port to bound local nodes Arango DB ("bind" to 
                           use default Arango DB port, "unbind" to unbind 
                           Arango DB port)
  -n, --new-name <name>    set new name for network
  -h, --help               output usage information
```

#### `tondev add --help`

```
Usage: tondev add [options] [network...]

Add network[s]

Options:
  -h, --help  output usage information
```

#### `tondev remove --help`

```
Usage: tondev remove|rm [options] [network...]

Remove network[s]

Options:
  -h, --help  output usage information
```

#### `tondev test --help`

```
Usage: tondev test|t [options] [servers...]

Test network[s]

Options:
  -v, --verbose  show verbose test log (default: false)
  -h, --help     output usage information
```

#### `tondev keys --help`

```
Usage: tondev keys|k [options]

Generate random Key Pair

Options:
  -h, --help  output usage information
```

#### `tondev addr --help`

```
Usage: tondev addr|a [options] <addr>

Convert address

Options:
  -h, --help  output usage information
```

---


Copyright 2018-2020 TON DEV SOLUTIONS LTD.

Licensed under the SOFTWARE EVALUATION License (the "License"); you may not use
this file except in compliance with the License.  You may obtain a copy of the
License at: https://www.ton.dev/licenses

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific TON DEV software governing permissions and
limitations under the License.
