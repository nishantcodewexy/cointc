function headers(session) {
  return {
    Authorization: session?.user ? `Bearer ${session.user?.token}` : "",
  };
}
export default headers;
