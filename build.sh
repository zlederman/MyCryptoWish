#!/bin/bash
$(truffle migrate --reset --network kovan > migration.txt)
contractAddress=$(grep  -e "contract\saddress:\s\s\s\s" migration.txt | tail -1)
tokens=( $contractAddress )
address=${tokens[3]}
echo  "CONTRACT_ADDRESS=$address" >> .env
