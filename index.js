import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

app.use(bodyParser.urlencoded({ extended: true }));

let yourBearerToken = "";

app.get("/", (req, res) => {
    res.render("index.ejs", { content: "" });
  });
  
  app.get("/sign-up", async (req, res) => {
    res.render("signup.ejs", { content: "SIGN UP" });
});

  app.post("/register-user", async (req, res) => {
    try {
      const result = await axios.post(API_URL + "/register",req.body);
      res.render("signup.ejs", { content: JSON.stringify(result.data.success) });
    } catch (error) {
      res.render("signup.ejs", { content: JSON.stringify(error.response.data.error) });
    }
});

app.get("/sign-in", async (req, res) => {
    res.render("signin.ejs", { content: "SIGN IN" });
});

  app.post("/get-token", async (req, res) => {
    try {
      const result = await axios.post(API_URL + "/get-auth-token",req.body);
      yourBearerToken = "";
      yourBearerToken = yourBearerToken + result.data.token;
      res.render("mainpage.ejs", { content: "Waiting for data..." });
    } catch (error) {
      res.render("signin.ejs", { content: JSON.stringify(error.response.data.error) });
    }
});


const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.post("/get-secret", async (req, res) => {
    const config = {
        headers: { Authorization: `Bearer ${yourBearerToken}` },
      };
    const searchId = req.body.id;
    try {
      const result = await axios.get(API_URL + "/secrets/" + searchId, config);
      res.render("mainpage.ejs", { content: JSON.stringify(result.data) });
    } catch (error) {
      res.render("mainpage.ejs", { content: JSON.stringify(error.response.data) });
    }
  });

app.post("/post-secret", async (req, res) => {
    const config = {
        headers: { Authorization: `Bearer ${yourBearerToken}` },
      };
    try {
      const result = await axios.post(API_URL + "/secrets", req.body, config);
      res.render("mainpage.ejs", { content: JSON.stringify(result.data) });
    } catch (error) {
      res.render("mainpage.ejs", { content: JSON.stringify(error.response.data) });
    }
});

  app.post("/put-secret", async (req, res) => {
    const config = {
        headers: { Authorization: `Bearer ${yourBearerToken}` },
      };
    const searchId = req.body.id;
    try {
      const result = await axios.put(
        API_URL + "/secrets/" + searchId,
        req.body,
        config
      );
      res.render("mainpage.ejs", { content: JSON.stringify(result.data) });
    } catch (error) {
      res.render("mainpage.ejs", { content: JSON.stringify(error.response.data) });
    }
  });
  
  app.post("/patch-secret", async (req, res) => {
    const config = {
        headers: { Authorization: `Bearer ${yourBearerToken}` },
      };
    const searchId = req.body.id;
    try {
      const result = await axios.patch(
        API_URL + "/secrets/" + searchId,
        req.body,
        config
      );
      res.render("mainpage.ejs", { content: JSON.stringify(result.data) });
    } catch (error) {
      res.render("mainpage.ejs", { content: JSON.stringify(error.response.data) });
    }
  });
  
  app.post("/delete-secret", async (req, res) => {
    const config = {
        headers: { Authorization: `Bearer ${yourBearerToken}` },
      };
    const searchId = req.body.id;
    try {
      const result = await axios.delete(API_URL + "/secrets/" + searchId, config);
      res.render("mainpage.ejs", { content: JSON.stringify(result.data) });
    } catch (error) {
      res.render("mainpage.ejs", { content: JSON.stringify(error.response.data) });
    }
  });


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
