import Joi from 'joi';

// book validation
export const ArticleSchema = Joi.object({
	title: Joi.string().min(3).required(),
	slug: Joi.string().min(3).required(),
});
