import {Type} from "@vuex-orm/core";

export default class DateTime extends Type {
    /**
     * Create a new string instance.
     */
    constructor(model, value, mutator) {
        /* istanbul ignore next */
        super(model, value, mutator);
    }

    /**
     * Convert given value to the appropriate value for the attribute.
     */
    make(value, parent, key) {
        value = value !== undefined ? value : this.value;
        // Default Value might be a function (taking no parameter).
        var localValue = value;
        if (typeof value === 'function') {
            localValue = value();
        }
        return this.mutate(localValue, key);
    }
}
