import { Category, Format, Difficulty } from '../resource.model.js';

export const getLookUpData = async (data) => {
    const [categories, formats, difficulties] = await Promise.all([
        Category.query().select('id', 'name'),
        Format.query().select('id', 'name'),
        Difficulty.query().select('id', 'level')
    ]);

    return {
        categories,
        formats,
        difficulties
    };
};