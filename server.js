const express = require('express');
const app = express();
const axios = require('axios');
const fs = require('fs');
const Jimp = require('jimp');
const imageDataURI = require('image-data-uri')

app.use(express.static('public'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

// app.get('/compress', async (req, ress) => {
//   let img = await axios.get(`https://nekos.life/api/v2/img/${req.query.tag}`);
//   axios.get(img.data.url, {responseType: "stream"} )  
//   .then(res=> {  
//     let d = res.data.pipe(fs.createWriteStream(`cache/${img.data.url.split("/")[4]}`));
//     d.on('finish', function () {
//       Jimp.read(`cache/${img.data.url.split("/")[4]}`)
//       .then(lenna => { 
//         lenna.resize(400, Jimp.AUTO).quality(60).write(`cache/${img.data.url.split("/")[4]}`, () => {
//           imageDataURI.encodeFromFile(__dirname + `/cache/${img.data.url.split("/")[4]}`)
//           .then(dataimg => {
//             ress.json({img: dataimg, link: img.data.url});
//             setTimeout(() => {
//               fs.unlinkSync(__dirname + `/cache/${img.data.url.split("/")[4]}`);
//             }, 1000)
//           })
//         });
//       })
//       .catch(err => {
//           console.error(err);
//       });
//     });
//   })
// });

app.get('/get', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  let result = [];
  for(let i = 0; i < 10; i++) {
    let img = await axios.get(`https://nekos.life/api/v2/img/${req.query.tag}`);
    result.push(img.data.url);
  }
  res.json(result)
});

app.get('/download', async (req, ress) => {
  ress.setHeader('Access-Control-Allow-Origin', '*');
  ress.setHeader("Access-Control-Allow-Methods", "*");
  ress.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  axios.get(req.query.url, {responseType: "stream"} )  
  .then(res=> {  
    let d = res.data.pipe(fs.createWriteStream(`cache/${req.query.url.split("/")[4]}`));
    d.on('finish', function () {
      ress.sendFile(__dirname + `/cache/${req.query.url.split("/")[4]}`);
      setTimeout(() => {
        fs.unlinkSync(__dirname + `/cache/${req.query.url.split("/")[4]}`);
      }, 1000)
    });
  })
});


const listener = app.listen(process.env.PORT, function() {
  console.log('Работает');
});
