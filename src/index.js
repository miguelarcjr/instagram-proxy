// packages import
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
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
  axios.get(backendUrl).then((response) => res.send(response.data)).catch(err => console.log("deu erro"));
});

app.get("/img", (req, res) => {
    req.query.url
    const url = req.query.url || ""
    //console.log(url)
  axios
    .get(url,
      { responseType: "stream" }
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
