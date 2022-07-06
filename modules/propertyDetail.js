import { CALL_API, HTTP_METHODS } from '../middlewares/api';

const UPDATE_PROPERTY_DETAIL_REQUEST = 'dealty/propertyDetail/UPDATE_PROPERTY_DETAIL_REQUEST';
const UPDATE_PROPERTY_DETAIL_FAILURE = 'dealty/propertyDetail/UPDATE_PROPERTY_DETAIL_FAILURE';

export default (state = { propertyDetail: {} }, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const UPDATE_PROPERTY_DETAIL_SUCCESS ='dealty/propertyDetail/UPDATE_PROPERTY_DETAIL_SUCCESS';

export const categoryPropertyDetailCount = (propertyDetail, category) => propertyDetail.filter((propertyDetail) => propertyDetail.category === category).length

export const updatePropertyDetail = (propertyDetail, params) => ({
  [CALL_API]: {
    types: [UPDATE_PROPERTY_DETAIL_REQUEST, UPDATE_PROPERTY_DETAIL_SUCCESS, UPDATE_PROPERTY_DETAIL_FAILURE],
    endpoint: `property_details/${propertyDetail}`,
    method: HTTP_METHODS.PUT,
    body: {propertyDetail: params},
  },
});
