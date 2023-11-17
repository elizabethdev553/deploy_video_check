const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true
  },
  video_title: {
    type: String,
    required: true
  },
  video_link: {
    type: String,
    required: true
  },
  video_channel_id: {
    type: String,
  },
  video_owner_handle: {
    type: String,
    required: true
  },
  video_curator:{
    type: String,
    default:''
  },
  video_check_flag:{
    type: Boolean,
    default:false
  },
  video_check_description:{
    type: String,
    default:''
  },
  // avatar: {
  //   type: String
  // },
  video_createdAt: {
    type: Date,
    reqired:true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('video', VideoSchema);
