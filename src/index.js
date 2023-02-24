// packages import
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios")
// enable CORS
app.use(cors());
// set the port on which our app wil run
// important to read from environment variable if deploying
const port = process.env.PORT || 5000;

// basic string route to prevent Glitch error
app.get("/", (req, res) => {
  //console.log(req.query);
  res.send("Hello World!");
});

// the route we're working with
app.get("/insta", (req, res) => {
  // replace with a custom URL as required
  //console.log(req.query);
  const params = req.query;
  const backendUrl = `https://instagram.com/graphql/query/?query_id=${params.query_id}&variables=${params.variables}`;
  console.log(backendUrl);
  // return the data without modification
  const dataHeader = {
    cookie: 'ig_did=643CAF46-C8F2-4D7E-9DEB-391CD2C61AD2; ig_nrcb=1; mid=Y9ADOQALAAFbKR-3wniwR0whHMtw; datr=OAPQYwvy8bK_hHajh0FE-Vhx; fbm_124024574287414=base_domain=.instagram.com; csrftoken=iPo8Q5dwju37lEgtQWDO8MPCvkpPrpfu; ds_user_id=57342536910; shbid="14555\05457342536910\0541708795608:01f78456e66bc64efa79b6c5d14c88f3f902e94a41b4886b5710e6ca859bf905601ac50c"; shbts="1677259608\05457342536910\0541708795608:01f741ec368b8fc09e62045110d792c8a061437f9e5fb306e8e4318b040c0115dc2e5cfb"; fbsr_124024574287414=aCoFDu4BKUJEx1k-JXCNWPaWNTfTHxBdyiiLVdHJNAE.eyJ1c2VyX2lkIjoiMTAwMDAzNzI4MTI2MDY5IiwiY29kZSI6IkFRRDhScmgzRWFMRGJPZW9ScURaQ3lYbnhaZ3dtRXU3S1NkSkd0NzdmQ0ZNOGtaYVlXYzhkeGU4S1BJVURnbEFFZXlDNkZIRXVOdlJXMkJDLWYtT1Z1cFNFSmh4UnlDS1B6akZ5OFBlT0ZJRmlqVFhjSzk3SUk1bUlrWmZuWlQyc2NzSnFGaXByTUV5bzlFejRna2NpSDl1a0dSWHc2SkJGMFNiNTRWZUUtYVlNTTNVbllwTFFVTUEyQ0w5ZV9QYXFxQVRpb0szZHhNcUs2UU9UalY2NXlEWFZYZ3ZEZ1FTQi1kazh1cVFpelpyYUIyQmVHUE1VUEFuQnpFckZPMmhwV3FuM2xXb28wSHJYVDZjaTNnQUdxeXpDbmwzN0UwendlS2pENmtBSFY2eW1mSWxqMUVCam5PQnpvNmNIZzhPTElBY0FHc0JsZS1ObFpFTHBVRnQ1UUJicllPQmpKUGZIb0hrT3hPYkJqOEFIZyIsIm9hdXRoX3Rva2VuIjoiRUFBQnd6TGl4bmpZQkFGTXhibjIwSmFMRGhrUnRIaWhTUlg5bjFSQ2paQjFPVXNyek94aEQzc2haQ1V5ZDBOa0lPTlF3bW9DS2NWcVpBTnk5WkNlclNaQ0xWUGtmQ0lZb3pNU1pCU2pCYkZGVVR2WFlWWkJwdU5aQnVHQlpDQ0FCbHVxS1UwRWpoVTRtVmxYeFdBZDl3RVBCSldsQ0NHanZlQzMxcDBuakZRVXJsTEpZSjF3UXlkS3VZdUFmZVUzMldYRDBaRCIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjc3MjY2NTI5fQ; sessionid=57342536910:smeB2kAWqDQ3pd:18:AYfghKzL23kyR-imEKFa2yq5KhDlJmvfmc2h_CuMMA; rur="NCG\05457342536910\0541708802537:01f72bc834684b93449db71540010967975a1af06b10c723f46a76f29ac59c7840e5f3de"',
    "user-agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
    "x-ig-app-id:": "936619743392459"
  }
  axios.get(backendUrl, {headers: {}}).then((response) => res.send(response.data)).catch(err => console.log("deu erro"));
});

app.get("/img", (req, res) => {
    req.query.url
    const url = req.query.url || ""
    //console.log(url)
  axios
    .get(url,
      { responseType: "stream",  }
    )
    .then((axiosResp) => {
      res.set({
        "Content-Type": axiosResp.headers["content-type"],
      });
      axiosResp.data.pipe(res);
    }).catch(err => console.log("deu erro"));
});

// console text when app is running
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
