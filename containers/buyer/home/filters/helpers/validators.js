import * as Yup from 'yup';

const currentYear = new Date().getFullYear();
const minYear = new Date('July 21, 1700 01:15:00').getFullYear();
const minValue = 0;
const maxValue = 9999999999;

export const yearValidation = Yup.object().shape({
  minYearBuilt: Yup.number()
      .integer()
      .nullable()
      .min(minYear)
      .default(minYear)
      .lessThan(Yup.ref('maxYearBuilt')),
  maxYearBuilt: Yup.number()
      .integer()
      .nullable()
      .default(currentYear)
      .moreThan(Yup.ref('minYearBuilt'))
      .max(currentYear),
});

export const priceValidation = Yup.object().shape({
  minPrice: Yup.number()
      .integer()
      .nullable()
      .min(minValue)
      .default(minValue)
      .lessThan(Yup.ref('maxPrice')),
  maxPrice: Yup.number()
      .integer()
      .nullable()
      .default(maxValue)
      .moreThan(Yup.ref('minPrice'))
      .max(maxValue),
});
