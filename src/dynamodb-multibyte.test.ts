import {CreateTableCommand, DynamoDBClient, GetItemCommand, PutItemCommand} from '@aws-sdk/client-dynamodb-v2-node'

describe('DynamoDBClient', () => {
    const dynamoDB = new DynamoDBClient({
        endpoint: 'http://dynamodb:8000',
        region: 'us-west-2',
        credentials: {
            accessKeyId: 'dynamodb-local',
            secretAccessKey: '',
        }
    });

    it('create table',async () => {
        const command = new CreateTableCommand({
            TableName: 'TestTable',
            KeySchema: [{ AttributeName: 'Identifier', KeyType: 'HASH' }],
            AttributeDefinitions: [
                { AttributeName: 'Identifier', AttributeType: 'S' },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5,
            },
        });
        const result = await dynamoDB.send(command);
        expect(result.TableDescription).not.toBe(undefined);
    });

    it('put item',async () => {
        const putItem = new PutItemCommand({
            TableName: 'TestTable',
            Item: {
                Identifier: { S: 'item1' },
                Title: { S: 'This is item1.' }
            },
        });
        await dynamoDB.send(putItem);
    });

    it('get item',async () => {
        const getItem = new GetItemCommand({
            TableName: 'TestTable',
            Key: {
                Identifier: { S: 'item1' },
            },
        });
        const result = await dynamoDB.send(getItem);
        expect(result.Item!.Title.S).toEqual('This is item1.')
    });

    it('put item contains multi-byte characters',async () => {
        const putItem = new PutItemCommand({
            TableName: 'TestTable',
            Item: {
                Identifier: { S: 'item2' },
                Title: { S: 'これはitem2。' }
            },
        });
        await dynamoDB.send(putItem);
    });

    it('get item contains multi-byte characters',async () => {
        const getItem = new GetItemCommand({
            TableName: 'TestTable',
            Key: {
                Identifier: { S: 'item2' },
            },
        });
        const result = await dynamoDB.send(getItem);
        expect(result.Item!.Title.S).toEqual('これはitem2。')
    });
});
