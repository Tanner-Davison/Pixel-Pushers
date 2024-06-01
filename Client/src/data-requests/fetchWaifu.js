export const getPhoto = async (options) => {
    const apiUrl = 'https://api.waifu.im/search';  
    console.log(options.nsfw);
    
    const params = {
      included_tags: [...options.tags],
      is_nsfw:options.nsfw,
      height: '<=2000'
    };
    const queryParams = new URLSearchParams();
  
    for (const key in params) {
      if (Array.isArray(params[key])) {
        params[key].forEach(value => {
          queryParams.append(key, value);
        });
      } else {
        queryParams.set(key, params[key]);
      }
    }
    const requestUrl = `${apiUrl}?${queryParams.toString()}`;
  
    try {
      const response = await fetch(requestUrl);
  
      if (!response.ok) {
        throw new Error('Request failed with status code: ' + response.status);
      }
  
      const data = await response.json();
      console.log('Data inside getPhoto:', data);
      return data; // Return the data from the function
    } catch (error) {
      console.error('An error occurred:', error.message);
      throw error; 
    }
  };