#!/bin/bash
#deploy with scp
eval $(ssh-agent -s) # Start ssh-agent cache
chmod 600 ./id_rsa # Allow read access to the private key
ssh-add ./id_rsa # Add the private key to SSH
scp -r ./build/* taung@utest.eastus.cloudapp.azure.com:/var/www/html
