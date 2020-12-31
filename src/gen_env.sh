#!/bin/bash

# This script is called during the build stage in CodePipeline to generate the 
# .env file based off environment variables. The .env file is loaded by the 
# web-ui service to set its configuration.

set -e

# Delete .env if it exists
[ -e "aws-exports.js" ] && rm aws-exports.js

printf 'const awsmobile = {
    "aws_project_region": "us-east-2",
    "aws_cloud_logic_custom": [
        {
            "name": "pythonsync",
            "endpoint": "https://q3go2n3yd6.execute-api.us-east-2.amazonaws.com/dev",
            "region": "us-east-2"
        }
    ],
    "aws_appsync_graphqlEndpoint": "https://per7yhi3rrcgzkglzmryx772g4.appsync-api.us-east-2.amazonaws.com/graphql",
    "aws_appsync_region": "us-east-2",
    "aws_appsync_authenticationType": "API_KEY",
    "aws_appsync_apiKey": "da2-ls5ohzli5jflvlfzqx2txp6peu",
    "aws_cognito_identity_pool_id": "%s"' "$COGNITO_IDENTITY_POOL_ID" >> aws-exports.js
printf ',
    "aws_cognito_region": "us-east-2",
    "aws_user_pools_id": "%s"' "$COGNITO_USER_POOL_ID" >> aws-exports.js
printf ',
    "aws_user_pools_web_client_id": "%s"' "$COGNITO_USER_POOL_CLIENT_ID" >> aws-exports.js
printf ',
    "oauth": {}
};\n' >> aws-exports.js


printf 'export default awsmobile;' >> aws-exports.js