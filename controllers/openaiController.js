const { Configuration, OpenAIApi } = require('openai');

// Create a new Configuration object with the API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create a new OpenAIApi object using the Configuration object
const openai = new OpenAIApi(configuration);

// Async function to generate an image
const generateImage = async (req, res) => {
  // Destructure the prompt and size from the request body
  
  const { prompt} = req.body;

  // Set the image size based on the size parameter

  try {
    // Use the OpenAI API to generate an image with the given prompt and size
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: '512x512',
    });

    // Get the URL of the generated image
    const imageUrl = response.data.data[0].url;

    // Return a success response with the image URL
    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    // If there was an error, log it
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message );
    }

    // Return an error response
    res.status(300).json({
      success: false,
      error: 300,
    });
  }
};

// Export the generateImage function
module.exports = { generateImage };
