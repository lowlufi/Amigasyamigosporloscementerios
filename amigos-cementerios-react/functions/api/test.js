// Cloudflare Functions API endpoint example
export async function onRequest(context) {
  return new Response('Hello from Cloudflare Functions!', {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}