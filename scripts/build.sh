#! /bin/bash

# Build production image
docker build -f Dockerfile.production -t registry.heroku.com/ezpenpal/web . && \

    # Push to registry
    docker push registry.heroku.com/ezpenpal/web
