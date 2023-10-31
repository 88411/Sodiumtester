async function checkLatestVersion() {
  try {
    const isBeta = window.location.hostname.includes('v2');
    const branch = isBeta ? 'v2' : 'master';

    const response = await fetch(`https://raw.githubusercontent.com/z1g-project/sodium/${branch}/sodium-static/public/version.txt`);
    const latestVersion = await response.text();

    const currentVersion = '2.0.0-devprev';

    if (latestVersion !== currentVersion) {
      showUpdateNotification();
    }
  } catch (error) {
    console.error('Error checking for latest version:', error);
  }
}
  
  function showUpdateNotification() {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification('New Version Available', {
        body: 'A new version of sodium is available!',
        icon: 'sodium.png'
      });
  
      notification.onclick = function () {
        window.open('https://github.com/z1g-project/sodium', '_blank');
      };
    }
  }

  if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        checkLatestVersion();
      }
    });
  }
  