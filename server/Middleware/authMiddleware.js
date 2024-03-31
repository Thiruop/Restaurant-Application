import {
    BadRequestError,
    UnauthorizedError,
    UnauthenticatedError,
  } from "../Errors/CustomErrors.js";
 
  import {verifyJWT} from "../Utils/tokenUtil.js";
  
  export const authenticateUser = (req, res, next) => {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];
  
      if (!token) {
        throw new UnauthenticatedError("Authentication token missing");
      }
  
      const decodedToken = verifyJWT(token);
  
      if (!decodedToken) {
        throw new UnauthenticatedError("Invalid token");
      }
  
      const {userId} = decodedToken;
      req.userId = userId
      next();
    } catch (error) {
      console.error("Error:", error);
      if (
        error instanceof UnauthenticatedError ||
        error instanceof UnauthorizedError
      ) {
        return res.status(401).json({message: error.message});
      } else {
        return res.status(500).json({message: "Internal server error"});
      }
    }
  };