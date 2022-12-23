const validateUrl = (url: string) => {
  if (url.startsWith('http') && url.endsWith('/')) {
    return url;
  }

  let formattedUrl = url;

  if (url === 'dev.techwings.com') {
    formattedUrl = url + ':8448';
  }

  if (!formattedUrl.endsWith('/')) {
    formattedUrl += '/';
  }

  if (!url.startsWith('http')) {
    formattedUrl = 'https://' + formattedUrl;
  }

  return formattedUrl;
};

export default validateUrl;
