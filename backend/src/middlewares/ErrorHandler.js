import { Sequelize } from "sequelize"
import ApiError from "../utils/ApiError.js"

const ErrorHandling = (err, req, res, next) => {
  const obj = {
    statusCode: 500,
    message: "Internal Server Error",
    stack: err.stack,
  }

  if (err instanceof ApiError) {
    obj.statusCode = err.statusCode
    obj.message = err.message
  } else if (err instanceof Sequelize.ValidationError) {
    obj.statusCode = 400
    obj.message = err.errors[0].message
  } else if (err instanceof Sequelize.DatabaseError) {
    obj.statusCode = 500
    obj.message = "Database error occurred"
  } else {
    obj.message = err.message
  }

  res.status(obj.statusCode).json(obj)
}

export default ErrorHandling

