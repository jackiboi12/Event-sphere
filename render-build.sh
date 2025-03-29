#!/bin/bash

# Install dependencies
npm install

# Create the directory structure Render expects
mkdir -p /opt/render/project/src/

# Copy our index.js and necessary files
cp -r api /opt/render/project/
cp src/index.js /opt/render/project/src/

# Build the client application
npm install --prefix client && npm run build --prefix client 