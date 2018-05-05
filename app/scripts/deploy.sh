#!/bin/bash
#deploy with scp
scp -C  -r -q ./build/* taung@utest.eastus.cloudapp.azure.com:/var/www/html