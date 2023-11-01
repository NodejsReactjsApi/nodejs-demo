class UserMiddlewares {
    async userFilter(req, res, next) {
      try {
        //middleware
        next();
      } catch (error) {
        next(error);
      }
    }
  }
  export default UserMiddlewares