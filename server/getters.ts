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
  const addressTagRegex = /(?<=class=\\"detail-intro\\">).+?(?=<)/;
  return page.match(addressTagRegex)[0]
}

const sanitizeForRegex = (input: string) => input.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

function getRegexForTable(title: string) {
  return new RegExp(`(?<=${sanitizeForRegex(title)}<\/div>).+?<\/div>`);
}

function getFromTable(page: string, title: string) {
  const houseTagRegex = getRegexForTable(title);
  const tag = page.match(houseTagRegex)[0];
  const typeRegex = /(?<=grd-2\\">).+(?=<)/;
  const type = tag.match(typeRegex)[0];
  return type;
}

export function getHousingType(page: string) {
  return getFromTable(page, 'Housing Type');
}

export function getBedrooms(page: string) {
  return getFromTable(page, 'Bedroom(s)');
}

export function getUtilities(page: string) {
  return getFromTable(page, 'Utilities '); // Space required because it is found in HTML
}

export function getDateAvailable(page: string) {
  return getFromTable(page, 'Date Available '); // Space required because it is found in HTML
}

export function getLeaseTerm(page: string) {
  return getFromTable(page, 'Lease Term  '); // Space required because it is found in HTML
}

export function getLocation(page: string) {
  const locationRegex = /(?<=location_map_link\\">).+?(?=<)/;
  return page.match(locationRegex)[0];
}

export function getDistance(page: string) {
  return getFromTable(page, 'Distance ');
}

export function getDescription(page: string) {
  const descriptionWrapperRegex = /Tenant Type <\/div>.+?<div class=\\"clearfix\\">.+?<\/p>/;
  const descriptionWrapper = page.match(descriptionWrapperRegex)[0];
  const actualDescriptionRegex = /(?<=<p>).+(?=<)/
  const descripton = descriptionWrapper.match(actualDescriptionRegex)[0];
  return descripton;
}

export function getImages(page: string) {
  const imageRegex = /(?<=JSONImages\\" hidden value=\\"\[).+?(?=\])/;
  const imagePseudoArray = page.match(imageRegex)[0];
  const imageArray = imagePseudoArray.replace(/&quot;/g, '').split(',');
  return imageArray;
}
