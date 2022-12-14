import axios from 'axios';
export const fetchImg = async (searchImg, page) => {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '29966506-3ac2aa6cf44b4238878b6f625',
      q: searchImg,
      page,
      per_page: 12,
    },
  });
  return response.data.hits;
};
