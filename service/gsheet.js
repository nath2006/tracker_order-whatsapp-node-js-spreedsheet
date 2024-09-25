const axios = require('axios');

// Error handling function (consider using a dedicated error handling library)
const handleError = (error) => {
  console.error('Error Dalam Mengirim Data:', error);
  throw new Error('Gagal Mengirimkan Data ke Google Apps Script');
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
      return 'Data berhasil dikirim!'; 
    } else {
      throw new Error(`Request Gagal Dengan Status: ${response.status}`);
    }
  } catch (error) {
    handleError(error);
  }
};


//Function to get data from Google Apps Script API
exports.getData = async () => {
  try {
    //Ensure baseURL is defined in teh environment 
    if(!process.env.GET_BASED_URL) {
      throw new Error('Missing environment variabel:GET_BASED_URL')
    }

    const axiosInstance = axios.create({
      baseURL: process.env.GET_BASED_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const response = await axiosInstance.get('/exec');
    if(response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Request Gagal Dengan Status: ${response.status}`);
    }
  }catch(error){
    handleError(error);
  }
};