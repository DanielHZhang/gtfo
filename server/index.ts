import express from "express";
import axios from "axios";
import {getListingIds, getRent} from './functions';
import {formatRent} from './formatters';

const app = express();

app.get("*", async (req, res) => {
  try {
    const response = await axios.get('https://offcampus.uwo.ca/listings/');
    const listingPage = JSON.stringify(response.data);
    const listingIds = getListingIds(listingPage);

    const detailUrl = `https://offcampus.uwo.ca/Listings/Details/${listingIds[0]}`;
    const detailResponse = await axios.get(detailUrl);
    const detailPage = JSON.stringify(detailResponse.data);
    const full = {
      url: detailUrl,
      address: detailPage.match(/(?<=class=\\"detail-intro\\">).+?(?=<)/)[0],
      rent: formatRent(getRent(detailPage))
    };


    console.log(full);

    res.send(full);
    // console.log("details:", listingIds);

    // const addressRegex = /<div class=\\"rental-listing-details\\">.+?<\/a>/g;
    // const addresses = listings
    //   .map((listing) => {
    //     // Map over each listing to extract all the relevant information
    //     const matches = listing.match(addressRegex);
    //     const innerRegex = /.+<h2><strong>.+?>/;
    //     return matches[0].replace(innerRegex, "").slice(0, -4);
    //   })
    //   .filter((address) => {
    //     const noAddressRegex = /Near South|Old North|Near West|Downtown|Masonville|North London|On Campus|Whitehills/g;
    //     return address.match(noAddressRegex) === null;
    //   });
    // res.send(listings);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => console.log("Running on port 3000."));
