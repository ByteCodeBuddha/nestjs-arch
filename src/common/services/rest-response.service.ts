import { Injectable } from '@nestjs/common';

@Injectable()
export class RestResponseService {
  getSuccessResponse(
    message: string,
    data: any = null,
  ): any {
    return {
      statusCode: 200,
      message,
      data,
    };
  }

  getResponse(data: any[]): any {
    if (data.length === 0) {
      return {
        statusCode: 200,
        message: 'No data found',
        data: [],
      };
    } else {
      return {
        statusCode: 200,
        message:
          'Successfully retrieved data from the server',
        data,
      };
    }
  }

  getFailureResponse(message: string): any {
    return {
      statusCode: 400,
      message,
    };
  }
}
