#!/bin/bash

echo "Issuing connectivity test command..."

command_id=$(aws ssm send-command \
    --document-name "AWS-RunShellScript" \
    --targets "Key=tag:connectivity-test-target,Values=true" \
    --parameters '{"commands":["curl https://www.google.com"]}' \
    --query Command.CommandId --output text)

echo "Waiting for test to complete..."
sleep 5

failed_invocations=$(aws ssm list-command-invocations \
    --command-id "$command_id" \
    --query 'CommandInvocations[?Status!=`Success`].Status' --output text)

successful_invocations=$(aws ssm list-command-invocations \
    --command-id "$command_id" \
    --query 'CommandInvocations[?Status==`Success`].Status' --output text)

if [[ $failed_invocations ]]; then
    echo "Connectivity not available from one or more test VPCs"
    exit 1
fi

echo $successful_invocations

echo "Connectivity established!"
