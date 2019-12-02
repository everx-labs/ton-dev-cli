#!/bin/bash

TON="tondev"

which ${TON} &>/dev/null || {
    echo "ERROR! ${TON} is not installed" 
    exit 1
}

echo "## Complete help for version: $( ${TON} -V )"
echo
echo "#### \`${TON} -help\`"
echo

echo '```'
${TON} -h 
echo '```'

echo
echo "### _subcommands help:_"; 

for cmd in $( ${TON} -h | grep -A5000 -m1 -e '^Commands:' | tail -n+2 | sed 's/|/ /' | cut -f 3 -d " " - ); do
    echo
    echo "#### \`${TON} ${cmd} --help\`"
    echo

    echo '```'
    ${TON} ${cmd} -h

    echo '```'
    # echo
done
