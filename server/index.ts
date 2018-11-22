import express from 'express';
import axios from 'axios';
import {
  getListingIds,
  getRent,
  getAddress,
  getHousingType,
  getBedrooms,
  getUtilities,
  getDateAvailable,
  getLeaseTerm,
  getLocation,
  getDistance,
  getDescription,
  getImages,
} from './getters';
import {format} from './formatters';

const app = express();

app.get("/", async (req, res) => {
  try {
    const response = await axios.get('https://offcampus.uwo.ca/listings/');
    const listingPage = JSON.stringify(response.data);
    const listingIds = getListingIds(listingPage);

    const all = await Promise.all(listingIds.map(async (id) => {
      const detailUrl = `https://offcampus.uwo.ca/Listings/Details/${id}`;
      const detailResponse = await axios.get(detailUrl);
      const detailPage = JSON.stringify(detailResponse.data);
      return {
        url: detailUrl,
        address: format(getAddress(detailPage)),
        rent: format(getRent(detailPage)),
        type: getHousingType(detailPage),
        bedrooms: getBedrooms(detailPage),
        utilities: getUtilities(detailPage),
        available: getDateAvailable(detailPage),
        lease: format(getLeaseTerm(detailPage)),
        location: format(getLocation(detailPage)),
        distance: getDistance(detailPage),
        description: getDescription(detailPage).trim(),
        images: getImages(detailPage),
      };
    }));
    console.log(all);
    res.send(all);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => console.log("Running on port 3000."));
