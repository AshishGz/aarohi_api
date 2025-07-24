import LearningPath from "../learningPath.model.js";


export const create = async (value) => {
    try {
        const learningPath =   await LearningPath.query().insertGraph({
            name: value.name,
            nepalitile: value.nepalitile,
            description: value.description,
            estimated_time: value.estimated_time,
            nepalidescription: value.nepalidescription,
            category: value.category,
            difficulty: value.difficulty,
            created_at: new Date(),
            updated_at: new Date(),
            relations: value.resources.map(r => ({
                resource_id: r.resource_id,
            }))
        });
        return  { id: learningPath.id };


    } catch (err) {

        console.log({err})
      throw err;
    }
};
export const get = async (req, res, next) => {
    const paths = await LearningPath.query().withGraphFetched('relations');
    const data = paths.map(p => ({
        ...p,
        resources: p.relations.map(r => ({resource_id: r.resource_id, order: r.order}))
    }));
    return data.sort((a, b) => a.order - b.order);
}