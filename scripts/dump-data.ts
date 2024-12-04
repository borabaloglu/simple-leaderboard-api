import axios from 'axios';
import fs from 'fs';
import path from 'path';

const dumpData = async () => {
  const usernamePrefix = 'testuser';
  const password = 'password';

  for (let i = 1; i <= 20; i++) {
    const username = `${usernamePrefix}${i}`;
    const response = await axios.post('http://localhost:3000/auth/sign-up', {
      username,
      password,
    });

    const userId = response.data.user.id;

    fs.appendFileSync(
      path.join(__dirname, '..', 'leaderboard.users.csv'),
      i === 1 ? `_id,username\n${userId},${username}\n` : `${userId},${username}\n`,
    );

    const accessToken = response.data.accessToken;

    for (let i = 1; i <= 5; i++) {
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
