

export function getListingIds(listingPage: string) {
  const listingRegex = /<div class=\\"rental-listing\\">.+?<button class=\\"btn btn-listing-a\\">Details<\/button>.+?<\/div>/g;
  const listings = listingPage.match(listingRegex);

  return listings
    .map((listing) => {
      // Match the anchor tags of each listing
      const detailAnchorRegex = /<a href=.+?>/;
      const matches = listing.match(detailAnchorRegex);
      return matches[0];
    })
    .map((anchorTag) => {
      // Match the listing id of each href
      const listingIdRegex = /(?<=\/Listings\/Details\/)\d+/;
      const matches = anchorTag.match(listingIdRegex);
      return matches[0];
    });
}

export function getRent(page: string) {
  const rentTagRegex = /(?<=class=\\"rent_display\\">).+?(?=<div)/;
  return page.match(rentTagRegex)[0];
}

export function getAddress(page: string) {

}
