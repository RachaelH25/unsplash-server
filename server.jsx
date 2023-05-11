const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = 8080;
const app = express();
app.use(cors());
const axios = require("axios");
// can't use import with express, require just a slightly newer version. If you can't find this throw an error, do not work without this thing.

app.get("/", (request, response) => {
    response.status(200).json("This is the root route");
    // can use 404 instead of 200 and an error messaage to say that it is not working?
});

app.get("/photos", async (request, response) => {
    const API = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=wizard`;
    const res = await axios.get(API);
    // process.env.info takes the info from the env file.
    const photos = res.data.results.map((photo) => {
        return {
            id: photo.id,
            img_url: photo.urls.regular,
            original_image: photo.links.self,
            photographer: photo.user.name,
        };
    });
    // res.data.results.forEach((photo)=>{
    //     photos.push({
    //         img_url: photo.urls.regular
    //         original_image: photo.links.self
    //         photographer: photo.user.name
    //     });
    console.log(res.data);
    response.json("Photos endpoint");
});

app.listen(PORT, () => console.log(`App is running on PORT ${PORT}`));
