// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

var os = require("os");

export default function handler(req, res) {
  var networkInterfaces = os.networkInterfaces();

  // console.log(networkInterfaces);
  // const key =
  //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjNmNmRmYjBhLWZjYjktNDZkNi1iOTA0LWJjMGJiNzRlZjBmYiIsImlhdCI6MTU3MjQ5NjI5Nywic3ViIjoiZGV2ZWxvcGVyL2U0MDQ1NzQxLTIwMGUtZjhlYS1hNTg5LWE1MDA4NGRkYThhZiIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjY5LjE2MC4yNS4yNCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.u4mGP-LBiSDLyjotnTpjZoFm0Bv7EvOTgBNKBWLPwynr5-5hTqXZBVu-DWWUcpxES7o6E9Y1-eoiFsDaehXuww";
  // console.log("server is on !");
  res.status(200).json({ name: "John Doe" });
}
