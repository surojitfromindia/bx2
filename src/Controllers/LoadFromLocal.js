function saveToLocal(key, value) {
  sessionStorage.setItem(key, value);
  if (sessionStorage.getItem(key)) return true;
  else false;
}

function isInLocal(keyValue) {
  for (const key in sessionStorage) {
    if (key === keyValue) return true;
  }
  return false;
}

function ReloadFromLocal(key) {
  return sessionStorage.getItem(key);
}

export { saveToLocal, ReloadFromLocal, isInLocal };
