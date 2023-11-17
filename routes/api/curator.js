const express = require('express');
const axios = require('axios');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');
const checkObjectId = require('../../middleware/checkObjectId');

const Member = require('../../models/Member');
const Video = require('../../models/Video');


router.get('/:member_id', async (req, res) => {
  try {
    let handle = req.params.member_id
    const video_lists = await Video.find({video_curator:handle, video_check_flag:false})

    if (!video_lists) {
      return res.status(400).json({ msg: 'There is no videos or you already assigned.' });
    }

    res.json(video_lists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.get('/check/:id', async (req, res) => {
  try {
    let key = req.params.id
    let videoDetailTmp = await Video.findOne({key});

    if (!videoDetailTmp) {
      return res.status(400).json({ msg: 'There is no videoDetailTmp for this Channel' });
    }

    res.json(videoDetailTmp);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.post('/check/description', async (req, res) => {
  try {
    console.log(req.body, "REQ.BODEY")    
      const filter = { key: req.body.video_id };
      const update = { $set: { video_check_description: req.body.description, video_check_flag:true } };
      await Video.updateOne(filter, update);

    res.json({Success:"Success"});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



module.exports = router;