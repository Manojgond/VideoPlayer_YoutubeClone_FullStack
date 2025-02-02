export const sanitizeQueryMiddleware = (req, res, next) => {
    const allowedQueryFields = ['query', 'sortBy', 'sortType'];
    req.query = Object.keys(req.query)
        .filter(key => allowedQueryFields.includes(key))
        .reduce((sanitized, key) => {
            sanitized[key] = req.query[key];
            return sanitized;
        }, {});
    next();
};
