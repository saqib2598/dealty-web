import { useMediaQuery } from 'react-responsive';

export const getBoundsFromQueryUrl = (southWest, northEast) => {
  if (southWest !== undefined) {
    southWest = southWest.split(',');
    northEast = northEast.split(',');
  } else {
    southWest = [];
    northEast = [];
  }
  return { southWest, northEast };
};

export const createParams = (obj) => {
  const explicitKey = obj.name ? 'owner_name' : 'listing';

  return {
    firstName: obj.event.target[0].value,
    lastName: obj.event.target[1].value,
    phone: obj.event.target[2].value,
    email: obj.event.target[3].value,
    message: obj.event.target[4].value,
    owner_email: obj.email,
    [explicitKey]: obj.name || obj.address
  };
};

export const checkChatRooms = (chatRooms, user) => {
  let flag = false;
  let finalRoom = null;
  chatRooms.map((room) => {
    if (user.id == room.ownerId) {
      flag = true;
      finalRoom = room;
    }
  });

  return [flag, finalRoom];
};

export const isCompletePercentage1 = (percentage1, listing) => {
  return (
    percentage1 === '100%' ||
    (percentage1 === '90%' && listing.monthlyCost == null) ||
    (percentage1 === '75%' &&
      listing.monthlyCost == null &&
      listing.parcelSize == null &&
      listing.zoningType == null) ||
    (percentage1 === '83%' &&
      listing.parcelSize == null &&
      listing.zoningType == null)
  );
};

export const isCompletePercentage2 = (percentage2, listing) => {
  return (
    percentage2 === '100%' ||
    (percentage2 === '90%' && listing.horseStalls == null) ||
    (percentage2 === '80%' &&
      listing.horseFeatures == null &&
      listing.horseStalls == null)
  );
};

export const getLogo = (home, index) => {
  return home.compliance[index] && home.compliance[index]['logoUrl'];
};

export const FormatPhone = (phone) => {
  return phone && phone.replace('+1', ' ').replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
};

export const getColSize = () => {
  const isLowReqWidth = useMediaQuery({ query: '(min-width: 992px)' });
  const isUpReqWidth = useMediaQuery({ query: '(max-width: 1279px)' });
  let colSize = 6;
  if (isLowReqWidth && isUpReqWidth) {
    colSize = 12;
  }
  return colSize;
};

export const getTitle = (title) =>  {
  switch(title) {
    case 'builder':
      return 'Builder Directory'
    case 'agent':
      return 'Agent Directory'
    case 'loan_officer':
      return 'Loan Officers'
    default :
      return 'Directory'
  }
};

export const setImagesStyle = (listingImages) => {
  let images = [];

  listingImages.map((image) => {
    images.push({src: image, width: 4, height: 3});
  });
  return images;
}
