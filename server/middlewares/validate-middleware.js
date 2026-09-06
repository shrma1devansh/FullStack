export const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (error) {
    console.error("Validation error:", error);
    res.status(400).json({ msg: "Invalid request data", error: error.errors });
  }
};
