/* eslint-disable */

exports.handler = async function (event) {
  try {
    const category = event.queryStringParameters?.category || "india";

    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${category}&apiKey=${process.env.VITE_NEWS_API_KEY}`
    );

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};