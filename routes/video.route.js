const express = require("express");
const router = express.Router();
require('dotenv/config');
const axios = require('axios');


const db = [
  {
    id: "jLCOjBkdDVI",
  },
  {
    id: "LmJrtn9pTa4",
  },
  {
    id: "hiSRDBY_0i0",
  },
  {
    id: "jD8n2CKEWtA",
  },
 
];

let myData = []

const apikey = process.env.API_KEY;

async function getVideoDetails(vid) {
  const data = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${vid}&key=${apikey}`
  );

  const newData = data.data.items[0].snippet;

  const data2 = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${vid}&key=${apikey}`
  );

  const newData2 = data2.data.items[0].statistics;

  const data3 = await axios.get(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&id=${data.data.items[0].snippet.channelId}&key=${apikey}`
  );
  const newData3 = data3.data.items[0].snippet;

  myData.push({ id: vid, ...newData, statistics: newData2, channelInfo: newData3 });  
}

function updateData(){
db.map((item) => {
  getVideoDetails(item.id);
})
}

updateData();

function resetData(){
  myData = [];
}

setInterval(()=>{
  resetData();
  updateData();
},600000)


router.get('/', (req, res) => {

  console.log(myData.length);
  res.json({ success: true, message: "Welocome to Gardenin Store", data: myData })
});

module.exports = router;