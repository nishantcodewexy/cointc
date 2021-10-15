function headers(token) {
  return {
    Authorization: token ?`Bearer ${token}` : "",
  };
}
export default headers;
