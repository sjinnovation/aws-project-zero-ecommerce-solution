import json
import boto3

personalizeRt = boto3.client('personalize-runtime')


def handler(event, context):

    productId = event['queryStringParameters']['productId']

    response = personalizeRt.get_recommendations(
        campaignArn='arn:aws:personalize:us-east-1:786256866628:campaign/awsprojectzeroecommerce-dataset-campaign-2', productId

    itemsArr = []
    print("Recommended items")
    for item in response['itemList']:
        print(item['itemId'])
        itemsArr.append(item['itemId'])

    return {
        'statusCode': 200,
        'body': json.dumps(itemsArr)
    }
