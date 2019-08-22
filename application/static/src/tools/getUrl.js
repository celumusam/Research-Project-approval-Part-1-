export default function getUrl() {
  const ipAddress = window.location.hostname;
  return ipAddress.trim() === 'localhost'
    ? `http://${ipAddress}:1234`
    : `https://${ipAddress}`;
}
