var copy = function(from, to) {
    Object.keys(from).forEach(function(x) {
        to[x] = from[x];
    });
};

copy(require('./dist_node/stream'), exports);
copy(require('./dist_node/gen'), exports);
copy(require('./dist_node/quantifier'), exports);
copy(require('./dist_node/select'), exports);
