const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

const oauthEndpoint = 'https://login.salesforce.com/services/oauth2/token';
const consumerKey = '3MVG9CecKwYCDceR43_zsw8x0rA.5gpsxvFge0.BXeR1k7JKLakprK.MlCq_V7GlY7CTOp60_MY8k5qkohcNd';
const consumerSecret = '18CE403AE533E04E829529F52E774A02DD35DCA130237F281DA79BC0AF86F65A';

const getAccessToken = async () => {
  console.log('here here');
  const params = new URLSearchParams();
  params.append('grant_type', 'password');
  params.append('client_id', consumerKey);
  params.append('client_secret', consumerSecret);
  params.append('username', 'aiemailtocase@dxc.com');
  params.append('password', 'Salesforce@12345');

  try {
    //console.log(params);
    console.log(oauthEndpoint);
    const response = await fetch(oauthEndpoint,{
      method: 'POST',
      body: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const data = await response.json();

  //  const response = await axios.post(oauthEndpoint, params);
    //console.log(response);
    const accessToken = data.access_token;
    console.log(accessToken);
    return accessToken;
  } catch (error) {
    console.error('Error getting access token:'+error);
   // console.log(error);
    throw error;
  }
};

module.exports = {
  getAccessToken
};