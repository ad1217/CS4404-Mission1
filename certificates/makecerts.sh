#!/usr/bin/bash

# configs and commands heavily based on the following stack overflow questions:
# https://stackoverflow.com/questions/21297139/how-do-you-sign-a-certificate-signing-request-with-your-certification-authority/21340898#21340898
# https://stackoverflow.com/questions/10175812/how-to-create-a-self-signed-certificate-with-openssl#10176685

openssl req -new -x509 -out cacert.pem -config ca.conf -nodes
openssl req -config server.conf -newkey rsa:2048 -sha256 -nodes -out servercert.csr -outform PEM
touch index.txt
echo '01' > serial.txt
openssl ca  -batch -config ca.conf -policy signing_policy -extensions signing_req -out servercert.pem -infiles servercert.csr
