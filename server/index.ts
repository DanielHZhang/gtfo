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
import {format, formatLease, formatRent} from './formatters';

const app = express();

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://offcampus.uwo.ca/listings/');
    const listingPage = JSON.stringify(response.data);
    const listingIds = getListingIds(listingPage);

    const all = await Promise.all(listingIds.map(async (id) => {
      const detailUrl = `https://offcampus.uwo.ca/Listings/Details/${id}`;
      const detailResponse = await axios.get(detailUrl);
      const detailPage = JSON.stringify(detailResponse.data);
      const bedrooms = parseInt(getBedrooms(detailPage), 10);
      return {
        address: format(getAddress(detailPage)),
        rent: formatRent(getRent(detailPage), bedrooms),
        type: getHousingType(detailPage),
        bedrooms,
        utilities: getUtilities(detailPage).toLowerCase() === 'included',
        available: getDateAvailable(detailPage),
        lease: formatLease(getLeaseTerm(detailPage)),
        location: format(getLocation(detailPage)),
        distance: parseFloat(getDistance(detailPage).toLowerCase().replace('km', '').trim()),
        description: format(getDescription(detailPage)),
        images: getImages(detailPage),
        url: detailUrl,
      };
    }));
    const filtered = all.filter((house) => {
      if (!house.address) {
        return false;
      }
      if (house.type === 'House to Share' || house.type === 'Apartment to Share' || house.type === 'Sublets') {
        return false;
      }
      if (house.rent.value > 700) {
        return false;
      }
      if (house.rent.value > 600 && !house.utilities) {
        return false;
      }
      if (house.distance > 1.5) {
        return false;
      }
      if (house.bedrooms < 3) {
        return false;
      }
      return true;
    });
    console.log(filtered);
    res.send(all);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => console.log("Running on port 3000."));
