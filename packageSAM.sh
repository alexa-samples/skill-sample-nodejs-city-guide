#!/usr/bin/env bash
cd lambda
rm index.zip
cd custom
zip  ../index.zip * –X -r

read -n1 -r -p "Zip complete, press space to deploy..." key

cd ..
# aws lambda update-function-code --function-name CityGuide --zip-file fileb://index.zip
cd ..
cp ./lambda/index.zip ./sam/

# read -n1 -r -p "Zip complete, press space to deploy..." key

aws cloudformation package --template-file ./sam/skill-lambda.yaml --s3-bucket alexabucket12 --output-template-file ./sam/packaged-lambda.yaml

# aws cloudformation deploy --template-file ./sam/packaged-lambda.yaml --stack-name city-guide-stack  --capabilities CAPABILITY_IAM


aws s3 cp ./sam/packaged-lambda.yaml s3://alexabucket12/sam/