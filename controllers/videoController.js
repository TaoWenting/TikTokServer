const { readVideoData, writeVideoData, readUserData } = require('../utils/videoDataUtils');
const path = require('path');

exports.getUserVideos = async (req, res) => {
  const { userId } = req.params;

  try {
    // Access authenticated user information from req.user
    const { user } = req;
    
    // Fetch videos and filter by userId
    const videos = await readVideoData();
    const userVideos = videos.filter(video => video.userId === userId);
    
    // Map video URLs to include full path
    const updatedUserVideos = userVideos.map(video => ({
      ...video,
      url: `http://localhost:5000/videosSave/${path.basename(video.url)}`
    }));
    
    res.status(200).json(updatedUserVideos);
  } catch (error) {
    console.error('Error fetching user videos:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllVideos = async (req, res) => {
  try {
    const videos = await readVideoData();
    // Map the video URLs to include the full path
    const updatedVideos = videos.map(video => ({
      ...video,
      url: `http://localhost:5000/videosSave/${path.basename(video.url)}`  // Ensure correct URL
    }));
    res.status(200).json(updatedVideos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllPublicVideos = async (req, res) => {
  try {
    const videos = await readVideoData();
    const publicVideos = videos.filter(video => video.public);
    // Map the video URLs to include the full path
    const updatedPublicVideos = publicVideos.map(video => ({
      ...video,
      url: `http://localhost:5000/videosSave/${path.basename(video.url)}`  // Ensure correct URL
    }));
    res.status(200).json(updatedPublicVideos);
  } catch (error) {
    console.error('Error fetching public videos:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.uploadVideo = async (req, res) => {
  const { title, description } = req.body;
  const { file } = req;

  if (!file) {
    return res.status(400).json({ message: 'No video file provided' });
  }

  try {
    const videos = await readVideoData();
    const newVideo = {
      id: videos.length + 1,
      userId: req.user.userId, // Assuming user ID is obtained from auth middleware
      title,
      description,
      url: file.path,
      public: false, // Default privacy
      likes: 0,
      comments: []
    };
    videos.push(newVideo);
    await writeVideoData(videos);
    res.status(201).json(newVideo);
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.setVideoPrivacy = async (req, res) => {
  const { videoId } = req.params;
  const { public: isPublic } = req.body;

  try {
    const videos = await readVideoData();
    const videoIndex = videos.findIndex(v => v.id === parseInt(videoId));

    if (videoIndex === -1) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (videos[videoIndex].userId !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to change this video\'s privacy settings' });
    }

    videos[videoIndex].public = isPublic;

    await writeVideoData(videos);

    const updatedVideo = {
      ...videos[videoIndex],
      url: `http://localhost:5000/videosSave/${path.basename(videos[videoIndex].url)}`
    };

    res.status(200).json(updatedVideo);
  } catch (error) {
    console.error('Error setting video privacy:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.likeVideo = async (req, res) => {
  const { videoId } = req.params;

  try {
    const videos = await readVideoData();
    const videoIndex = videos.findIndex(v => v.id === parseInt(videoId));

    if (videoIndex === -1) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized. Please log in to like this video.' });
    }

    // Increment likes count
    videos[videoIndex].likes += 1;

    await writeVideoData(videos);

    res.status(200).json(videos[videoIndex]);
  } catch (error) {
    console.error('Error liking video:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// exports.likeVideo = async (req, res) => {
//   const { videoId } = req.params;

//   try {
//     const videos = await readVideoData();
//     const video = videos.find(v => v.id === parseInt(videoId));

//     if (!video) {
//       return res.status(404).json({ message: 'Video not found' });
//     }

//     video.likes += 1;
//     await writeVideoData(videos);
//     res.status(200).json(video);
//   } catch (error) {
//     console.error('Error liking video:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };