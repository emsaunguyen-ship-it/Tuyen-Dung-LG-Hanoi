process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const fs = require('fs');
const https = require('https');

const files = [
  { id: '1aKLFCh1mK6wQHr2XNmT_68lP1rV3t-FJ', name: 'post_01.png' },
  { id: '1Xp9GEOHu33EYUeHCPFnSsAzvVqQisy7Y', name: 'post_02.png' },
  { id: '1RTFQpJpcNV-yUyduQjifsiTmm9qHPHLA', name: 'post_03.png' },
  { id: '1GLDtrWHZHw6FGUaVUkKDoxQD8brcrVuM', name: 'post_04.png' },
  { id: '1gt0KTRrMEoX9nekweqcNQvsTQ_H6lsg6', name: 'post_05.png' },
  { id: '1Ujw7zSIuqmdu3Ed4oQQN4bwBZ4ZUKdqU', name: 'post_06.png' },
  { id: '1PnpQT2LeGPLhJ4K1EuVAAiJtez_UUo2u', name: 'post_07.png' }
];

function downloadFile(file) {
  const url = `https://docs.google.com/uc?export=download&confirm=t&id=${file.id}`;
  const path = `public/${file.name}`;
  const fileStream = fs.createWriteStream(path);

  https.get(url, (response) => {
    // Google Drive download URL might redirect, handle redirection
    if (response.statusCode === 302 || response.statusCode === 301) {
      https.get(response.headers.location, (redirectResponse) => {
        redirectResponse.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`Downloaded: ${file.name}`);
        });
      });
    } else {
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded: ${file.name}`);
      });
    }
  }).on('error', (err) => {
    console.error(`Error downloading ${file.name}:`, err);
  });
}

files.forEach(downloadFile);
