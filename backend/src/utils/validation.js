import Joi from 'joi';

/**
 * Validation schema for sales query parameters
 */
export const salesQuerySchema = Joi.object({
  search: Joi.string().trim().allow('').optional(),
  regions: Joi.string().allow('').optional(),
  gender: Joi.string().valid('Male', 'Female', '').allow('').optional(),
  ageMin: Joi.number().integer().min(0).max(150).optional(),
  ageMax: Joi.number().integer().min(0).max(150).optional(),
  categories: Joi.string().allow('').optional(),
  tags: Joi.string().allow('').optional(),
  payment: Joi.string().allow('').optional(),
  dateFrom: Joi.date().iso().optional(),
  dateTo: Joi.date().iso().optional(),
  sort: Joi.string().valid('date', 'quantity', 'customerName', '').allow('').optional(),
  page: Joi.number().integer().min(1).default(1).optional(),
}).custom((value, helpers) => {
  // Validate that ageMax >= ageMin if both are provided
  if (value.ageMin !== undefined && value.ageMax !== undefined) {
    if (value.ageMax < value.ageMin) {
      return helpers.error('any.invalid', {
        message: 'ageMax must be greater than or equal to ageMin'
      });
    }
  }
  
  // Validate that dateTo >= dateFrom if both are provided
  if (value.dateFrom && value.dateTo) {
    if (new Date(value.dateTo) < new Date(value.dateFrom)) {
      return helpers.error('any.invalid', {
        message: 'dateTo must be greater than or equal to dateFrom'
      });
    }
  }
  
  return value;
});

/**
 * Validate query parameters
 */
export function validateQuery(queryParams) {
  const { error, value } = salesQuerySchema.validate(queryParams, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const errorMessages = error.details.map(detail => detail.message);
    throw new Error(`Validation Error: ${errorMessages.join(', ')}`);
  }

  return value;
}
