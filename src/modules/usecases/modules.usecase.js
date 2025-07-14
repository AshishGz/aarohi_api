import Modules from "../modules.model.js";
import {uuid} from "../../platforms/utils/common.js";
import Boom from "@hapi/boom";
import Module from "../modules.model.js";

export const add = async (data) => {
    return await Modules.query().insertAndFetch({...data, id: uuid(),updated_at:new Date().toISOString()});
};

export const update = async (id, data) => {
    const existing = await Modules.query().findById(id);
    if (!existing) throw Boom.notFound('Modules not found');

    return await Modules.query().patchAndFetchById(id, {
        ...data,
        updated_at: new Date().toISOString(),
    });
};

//delete module
export const remove = async (id) => {
    const existing = await Modules.query().findById(id);
    if (!existing) throw Boom.notFound('Module not found');

    await Module.query().deleteById(id);
    return { message: 'Module deleted successfully' };
}