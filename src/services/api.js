import axios from 'axios';

const SIGHTENGINE_BASE_URL = 'https://api.sightengine.com/1.0';

// API configuration
const config = {
  api_user: import.meta.env.VITE_SIGHTENGINE_API_USER,
  api_secret: import.meta.env.VITE_SIGHTENGINE_API_SECRET,
};

// AI Detection service
export const detectAI = async (file) => {
  const formData = new FormData();
  formData.append('media', file);
  formData.append('models', 'genai');
  formData.append('api_user', config.api_user);
  formData.append('api_secret', config.api_secret);

  try {
    const response = await axios.post(`${SIGHTENGINE_BASE_URL}/check.json`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to detect AI content');
  }
};

// Video Moderation service
export const moderateVideo = async (file) => {
  const formData = new FormData();
  formData.append('media', file);
  formData.append(
    'models',
    'nudity-2.1,violence,weapon,offensive,recreational_drug,alcohol,gambling,tobacco,gore-2.0'
  );
  formData.append('api_user', config.api_user);
  formData.append('api_secret', config.api_secret);

  try {
    const response = await axios.post(
      `${SIGHTENGINE_BASE_URL}/video/check-sync.json`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to moderate video');
  }
}; 