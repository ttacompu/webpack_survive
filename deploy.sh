#!/bin/bash
#deploy with scp

scp -r ./build/* taung@utest.eastus.cloudapp.azure.com:/var/www/html
