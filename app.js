document.getElementById('url-bar').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    const url = event.target.value;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      event.target.value = 'https://' + url;
    }
    document.getElementById('browser-window').src = event.target.value;
  }
});
