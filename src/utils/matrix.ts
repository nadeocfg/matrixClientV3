import { MatrixClient, createClient } from 'matrix-js-sdk';

const matrixClient: MatrixClient = createClient({
  baseUrl: 'https://matrix.org/',
  deviceId: 'matrix-client-app',
});

export default matrixClient;
