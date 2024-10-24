// /pages/api/test.js

export async function GET(request) {
  const mySecretKey = process.env.IMDB_API_KEY;
  console.log(mySecretKey);
  return new Response(JSON.stringify({ mySecretKey }), {
    headers: { "Content-Type": "application/json" },
  });
}
