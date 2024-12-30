#!/bin/bash

docker buildx build --platform linux/amd64,linux/arm64 -t connectingeverycorner/group-shield-tg-bot:latest . --push