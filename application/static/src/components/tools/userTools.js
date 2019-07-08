export function checkEmail(email) {
  /*
  Assumptions:
    User will typically type in a valid email. Therefore,
    we only need to perform a simple check
  */
  const emailFormat = /^\S+@+\S+$/;
  if (typeof email === 'string')
    return emailFormat.test(email);
  return false
}

export function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2]; 
}
