import Header from "../../../components/header";
import Container from "../../../components/container";
import Footer from "../../../components/footer";

import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingScreen from "../../../components/loadingScreen";

async function getMedia(constraints: any) {
  let stream = null;

  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    /* use the stream */
  } catch (err) {
    /* handle the error */
  }
}

function Class() {
  const router = useRouter();

  const { url } = router.query;
  const [meetingUrl, setMeetingUrl] = useState<any>();

  useEffect(() => {
    getMedia({ audio: true, video: true });
  }, []);

  useEffect(() => {
    if (!url) return;
    console.log(typeof url);

    // const decodedURI = decodeURI(url);

    setMeetingUrl(url);
    // setMeetingUrl(decodeURI(JSON.stringify(url)));
    // alert(meetingUrl);
  }, [url]);

  return (
    <>
      <Head>
        <title>Tusu - Student | Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />

      <div className="container-fluid">
        {!meetingUrl ? (
          <LoadingScreen />
        ) : (
          <iframe
            height="1000px"
            width="100%"
            allow="camera; microphone"
            src={meetingUrl}
          ></iframe>
        )}
      </div>
    </>
  );
}

export default Class;
