/**
 * Public API middleware for development
 * Allows public read access to API endpoints
 */
module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    // Allow public access to GET requests on API routes in development
    if (ctx.method === 'GET' && ctx.path.startsWith('/api/')) {
      // For development, bypass authentication
      if (process.env.NODE_ENV === 'development') {
        // Store public access flag on context
        ctx.state.isPublic = true;
      }
    }
    
    await next();
  };
};
