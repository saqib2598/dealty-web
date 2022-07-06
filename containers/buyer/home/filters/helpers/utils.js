export const getBedsText = (beds, baths) => {
  let text = 'Beds & Baths';
  if (beds && baths) {
    text = `${beds}+ bd, ${baths}+ ba`;
  } else if (beds) {
    text = `${beds}+ bd, 0+ ba`;
  } else if (baths) {
    text = `0+ bd, ${baths}+ ba`;
  }
  return text;
};

export const getPriceText = (min, max) => {
  let text = 'Price';
  if (min && max) {
    text = `$${formatPrice(min)} to $${formatPrice(max)}`;
  } else if (min) {
    text = `$${formatPrice(min)}+`;
  } else if (max) {
    text = `Up to $${formatPrice(max)}`;
  }
  return text;
};

export const getHomeText = (list) => {
  return (list && list.length) ? list.toString() : 'Home Type';
};

export const truncateText = (str, len) => {
  return str.length > len ? str.substring(0, len) + '...' : str;
};

export const formatPrice = (n) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K';
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T';
};

export const clean = (obj) => {
  for (const propName in obj) {
    if (!obj[propName] || obj[propName] === 'Any' || obj[propName] === []) {
      delete obj[propName];
    }
  }
  return obj;
};

export const filtersCount = (obj) => {
  let count = Object.keys(obj).length;
  for (const propName in obj) {
    if (!obj[propName] || obj[propName] === 'Any' || obj[propName] === []) {
      count--;
    }
  }
  return count;
};

export const filterMinList = (optionsList, threshold) => {
  return optionsList.filter((e) => e.value < threshold);
};

export const filterMaxList = (optionsList, threshold) => {
  const tempOptions = optionsList.filter((e) => e.value > threshold);
  tempOptions.unshift({ label: 'Any', value: null });
  return tempOptions;
};

export const getMoreFilterInitialValues = (filters) => {
  return {
    minYearBuilt: filters && filters.minYearBuilt,
    maxYearBuilt: filters && filters.maxYearBuilt,
    saleBy: filters && filters.saleBy,
    daysOnDealty: filters && filters.daysOnDealty,
    isOpenHouse: filters && filters.isOpenHouse,
    maxHoa: filters && filters.maxHoa,
    parkingSpots: filters && filters.parkingSpots,
    minLotSize: filters && filters.minLotSize,
    maxLotSize: filters && filters.maxLotSize,
    minSqft: filters && filters.minSqft,
    maxSqft: filters && filters.maxSqft,
    keywords: filters && filters.keywords,
  };
};

export const getBedsBathsInitialValues = (filters) => {
  return {
    beds: filters && filters.beds,
    baths: filters && filters.baths
  };
};

export const getPriceInitialValues = (filters) => {
  return {
    minPrice: filters && filters.minPrice,
    maxPrice: filters && filters.maxPrice,
  };
};

export const getMoreFilterInitialValues2 = (filters) => {
  return {
    minYearBuilt: filters && filters.minYearBuilt,
    maxYearBuilt: filters && filters.maxYearBuilt,
    saleBy: filters && filters.saleBy,
    daysOnDealty: filters && filters.daysOnDealty,
    isOpenHouse: filters && filters.isOpenHouse,
    maxHoa: filters && filters.maxHoa,
    parkingSpots: filters && filters.parkingSpots,
    minLotSize: filters && filters.minLotSize,
    maxLotSize: filters && filters.maxLotSize,
    minSqft: filters && filters.minSqft,
    maxSqft: filters && filters.maxSqft,
    keywords: filters && filters.keywords,
    beds: filters && filters.beds,
    baths: filters && filters.baths,
    homeType: filters && filters.homeType,
  };
};

export const getHomeTypeInitialValues = (filters) => {
  return {
    homeType: filters && filters.homeType
  };
};

export const getListedTime = (createdDate) => {
  const [absoluteDate, hours, minutes] = calculateDate(createdDate)
  if (hours === 0) {
    return `Listed ${minutes} minutes ago`;
  }
  else if (hours < 25) {
    return `Listed ${hours} hours ago`;
  }
  else if (hours > 24 && hours < 48) {
    return 'Listed Yesterday';
  }
  else if (hours > 48) {
    return `Listed ${Math.floor(absoluteDate / (1000 * 60 * 60 * 24))} days ago`;
  }
};

export const replaceString = (data, replaceable, replacewith) => {
  return data.replace(replaceable, replacewith);
};

export const getStatusText = (status, type) => {
  const statusText = status && status.toString();
  const typeText = type && type.toString().replace('_', ' ');
  return (statusText && typeText) ? `${typeText} | ${statusText}` : 'Status';
};

export const getStatusInitialValues = (filters) => {
  return {
    status: filters && filters.status,
    listingType: filters && filters.listingType
  };
};

export const isShowBanner = (createdDate) => {
  const hours = calculateDate(createdDate)[1]
  if (hours < 25) {
    return true;
  }
  else {
    return false;
  }
};

export const getAbsoluteDate = (createdAt, currentDate) => {
  return Math.abs(createdAt - currentDate)
}

export const gethours = (absoluteDate) => {
  return Math.trunc(absoluteDate / 36e5);
}

export const convertCreatedDate = (createdDate) => {
  return new Date(createdDate);
};

export const getCurrentDate = () => {
  return new Date;
}

export const calculateDate = (createdDate) => {
  const createdAt = convertCreatedDate(createdDate);
  const currentDate = getCurrentDate();
  const absoluteDate = getAbsoluteDate(createdAt, currentDate);
  const minutes = Math.floor((absoluteDate / (1000 * 60)) % 60);
  const hours = gethours(absoluteDate);

  return [absoluteDate, hours, minutes]
}

export const checkListings = (user) => {
  return user.seller && !user.seller.listings.length
}
