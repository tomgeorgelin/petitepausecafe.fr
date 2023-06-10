/**
 *
 * @param text - string to slugify
 * @returns string - slugified string
 */
export const slug = (text: string) =>
	text
		.toLowerCase()
		.replace(/[^\w ]+/g, '')
		.replace(/ +/g, '-');
