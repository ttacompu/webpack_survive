#!/bin/bash
#deploy with scp
chmod 400 id_rsa
scp -C -i ./id_rsa -r ./build/* taung@utest.eastus.cloudapp.azure.com:/var/www/html
