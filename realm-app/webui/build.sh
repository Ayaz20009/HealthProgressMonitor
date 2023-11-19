#!/bin/bash

echo
echo "+================================"
echo "| START: Censos Intake Form"
echo "+================================"
echo

datehash=`date | md5sum | cut -d" " -f1`
abbrvhash=${datehash: -8}

echo 
echo "Building container using tag ${abbrvhash}"
echo
docker build -t graboskyc/censosintake:latest -t graboskyc/censosintake:${abbrvhash} .

EXITCODE=$?

if [ $EXITCODE -eq 0 ]
    then

    echo 
    echo "Starting container"
    echo
    docker stop censosintake
    docker rm censosintake
    docker run -t -i -d -p 5050:3000 --name censosintake --restart unless-stopped graboskyc/censosintake:latest

    echo
    echo "+================================"
    echo "| END:  Censos Intake Form"
    echo "+================================"
    echo
else
    echo
    echo "+================================"
    echo "| ERROR: Build failed"
    echo "+================================"
    echo
fi