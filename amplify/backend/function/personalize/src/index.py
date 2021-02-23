import json
import boto3

personalizeRt = boto3.client('personalize-runtime')


def handler(event, context):

    body = json.loads(event['body'])

    response = personalizeRt.get_recommendations(
        campaignArn='arn:aws:personalize:us-east-1:786256866628:campaign/awsprojectzeroecommerce-campaign-2',
        userId=body['userid'])

    itemsArr = []
    print("Recommended items")
    for item in response['itemList']:
        print(item['itemId'])
        itemsArr.append(item['itemId'])

    return {
        'statusCode': 200,
        'body': json.dumps(itemsArr)
    }
