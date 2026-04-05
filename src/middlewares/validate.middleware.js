export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errors = error.details.map((err) => {
        const field = err.path.join(".");

        // Clean message formatting
        let message = err.message
          .replace(/"/g, "") // remove quotes
          .replace(/must be one of \[(.*)\]/, "must be one of: $1");

        // Capitalize first letter
        message = message.charAt(0).toUpperCase() + message.slice(1);

        return {
          field,
          message,
        };
      });

      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors,
      });
    }

    next();
  };
};