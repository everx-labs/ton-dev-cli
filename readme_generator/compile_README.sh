#!/bin/bash

OUT=../README.md

cat ./readme-intro.md > ${OUT}
echo -e "\n---\n\n" >> ${OUT}
./self-doc-gen.sh >> ${OUT}
echo -e "\n---\n\n" >> ${OUT}
cat ./Copyright.md  >> ${OUT}
