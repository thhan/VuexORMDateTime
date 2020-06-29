import DateTime from "./Type/DateTime";

export default {
    async install(components, options) {
        components.Model.dateTime = function (value, mutator) {

            let parentAfterLimit =  (typeof this.afterLimit  === 'function')? this.afterLimit : null;

            this.afterLimit = (models) => {
                if(parentAfterLimit)
                    models = parentAfterLimit(models);

                let fields = this.fields();
                let dates = [];
                Object.getOwnPropertyNames(fields).forEach((field) => {
                    if (fields[field] instanceof DateTime)
                        dates.push(field);
                });

                if (dates.length === 0)
                    return models;

                models.forEach((model) => {
                    for (let i in dates) {
                        let date = dates[i];
                        model[date] = new Date(model[date]);
                    }
                });

                return models;
            };

            return new DateTime(this, value, mutator);
        };

    }
};
