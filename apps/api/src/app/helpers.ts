import fetch from 'node-fetch';

interface Credentials {
  client_id: string;
  client_secret: string;
  code: string;
}
export const requestGitHubToken = (credentials: Credentials) => {
  return fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(JSON.stringify(error));
    });
};

export const requestGitHubUserAccount = (token: string) => {
  return fetch(`https://api.github.com/user?access_token=${token}`)
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(error);
    });
};

export const authorizeWithGitHub = async (credentials: Credentials) => {
  // eslint-disable-next-line @typescript-eslint/camelcase
  const { access_token } = await requestGitHubToken(credentials);
  const githubUser = await requestGitHubUserAccount(access_token);
  return {
    ...githubUser,
    // eslint-disable-next-line @typescript-eslint/camelcase
    access_token,
  };
};
