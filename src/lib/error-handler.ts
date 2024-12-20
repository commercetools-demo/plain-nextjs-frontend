import { ExternalError } from "@/core/errors/ExternalError";
import { ValidationError } from "@/core/errors/ValidationError";

export function handleError(error: any) {
  if (error instanceof ValidationError) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
      sessionData: {},
    };
  }

  if (error instanceof ExternalError) {
    return {
      statusCode: error.statusCode,
      body: JSON.stringify({ error: error.message }),
      sessionData: {},
    };
  }

  // Handle other types of errors
  return {
    statusCode: 500,
    body: JSON.stringify({ error: 'Internal Server Error' }),
    sessionData: {},
  };
}