#!/bin/bash
#deploy with scp
scp -C -i ./id_rsa -r ./build/* taung@utest.eastus.cloudapp.azure.com:/var/www/html
