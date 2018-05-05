#!/bin/bash
#deploy with scp
scp -C -i -r /tmp/deploy_rsa ./build/* taung@utest.eastus.cloudapp.azure.com:/var/www/html