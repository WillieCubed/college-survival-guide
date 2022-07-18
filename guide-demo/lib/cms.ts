import { GraphQLClient } from 'graphql-request';

const contentUrl = process.env.CMS_CONTENT_URL as string;
if (!contentUrl) {
  throw new Error('Content URL is undefined.');
}
const graphCms = new GraphQLClient(contentUrl);

export default graphCms;