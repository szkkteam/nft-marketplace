#!/bin/bash

source ./load_dotenv.sh .env_dev

ganache --accounts 20 --mnemonic="gather lion search conduct antenna jar marin" --networkId 1337 --db ~/ganache_local