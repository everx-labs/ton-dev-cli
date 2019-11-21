#!/bin/bash

TON="tondev"

which ${TON} &>/dev/null || {
    echo "ERROR! ${TON} is not installed" 
    exit 1
}

echo "## Full help for ton-dev-cli version: $( ${TON} -V )"
echo
echo "### ${TON} -h"
echo

echo '```'
${TON} -h 
echo '```'

echo
echo "## subcommand help"; 

for cmd in $( ${TON} -h | grep -A5000 -m1 -e '^Commands:' | tail -n+2 | sed 's/|/ /' | cut -f 3 -d " " - ); do
    echo
    echo "### ${cmd}"
    echo

    echo '```'
    ${TON} ${cmd} -h

    echo '```'
    # echo
done