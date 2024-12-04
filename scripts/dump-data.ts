import axios from 'axios';

const dumpData = async () => {
  const usernamePrefix = 'testuser';
  const password = 'password';

  for (let i = 0; i < 10; i++) {
    const username = `${usernamePrefix}${i}`;
    const response = await axios.post('http://localhost:3000/auth/sign-up', {
      username,
      password,
    });

    const accessToken = response.data.accessToken;

    for (let i = 0; i < 10; i++) {
      await axios.post(
        'http://localhost:3000/leaderboard/submit-score',
        {
          gameId: i.toString(),
          score: Math.floor(Math.random() * 10000) + 1,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    }
  }
};

dumpData();
