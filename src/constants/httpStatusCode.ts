const HTTP_STATUS_CODE = {
  Ok: 200,
  BadRequest: 400,
  NotFound: 404,
  ServerError: 500,
} as const;

export default HTTP_STATUS_CODE;
