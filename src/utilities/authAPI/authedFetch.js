import { auth } from '../../store';

/**
 *
 * Wraps a fetch function with required token in headers
 *
 * Auth will need to be logged in otherwise returns error
 *
 * Input additional headers as json object
 *
 * Returns as json
 */
async function authedFetch(URL, methods) {
  if (!auth.currentUser) return {};
  const token = auth.currentUser.ra; //ra contains JWT token
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });
  if (methods && methods.headers)
    Object.keys(methods.headers).forEach(key =>
      headers.append(key, methods.headers[key])
    );
  const raw = await fetch(URL, {
    ...methods,
    headers,
  });
  return await raw.json();
}
export default authedFetch;
