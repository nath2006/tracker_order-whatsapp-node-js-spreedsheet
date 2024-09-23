const axios = require('axios');

// Error handling function (consider using a dedicated error handling library)
const handleError = (error) => {
  console.error('Error sending data:', error);
  throw new Error('Failed to send data to Google Apps Script');
};

// Function to send data to Google Apps Script API
exports.postData = async (data) => {
  try {
    // Ensure baseUrl is defined in the environment (replace with your actual URL)
    if (!process.env.BASED_URL) {
      throw new Error('Missing environment variable: BASED_URL');
    }

    const axiosInstance = axios.create({
      baseURL: process.env.BASED_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await axiosInstance.post('/exec', data);

    if (response.status === 200) {
      return 'Data berhasil dikirim!'; // Success message in Indonesian (as suggested in ratings)
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    handleError(error);
  }
};

