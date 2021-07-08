import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function index() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const router = useRouter();

  // console.log(router.query.personId ? router.query.personId );
  // useEffect(() => {
  //     fetch(`https://swapi.dev/api/people/${personId}`, {})
  //       .then((res) => res.json())
  //       .then((response) => {
  //         setData(response);
  //         setIsLoading(false);
  //         console.log(`https://swapi.dev/api/people/${personId}`);
  //       })
  //       .catch((error) => console.log(error));
  //   }, [personId]);
  return <div>xi par {router.query.personId}</div>;
}
