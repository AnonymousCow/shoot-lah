// spawn() property
Object.defineProperty(Object.prototype, 'spawn', {
    value: function(props) {
        var defs = {}, key, obj;

        for (key in props) {
            if (props.hasOwnProperty(key)) {
                defs[key] = {
                    value       : props[key],
                    enumerable  : true
                };
            }
        }

        obj = Object.create(this, defs);

        if (obj.hasOwnProperty('init')) {
            obj.init();
        }

        return obj;
    }
});
