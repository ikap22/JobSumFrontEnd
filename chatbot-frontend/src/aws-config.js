// src/aws-config.js
import AWS from 'aws-sdk';

const config = {
  region: 'us-west-2', // e.g., 'us-east-1'

};

AWS.config.update(config);

export const lexRuntime = new AWS.LexRuntime();
