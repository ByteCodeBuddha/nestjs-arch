import { Injectable } from '@nestjs/common';
import { ResponseMessages } from '../constants';

@Injectable()
export class DBResponseService {
  async handleInsertion(
    insertionFn: () => Promise<any | null>,
  ): Promise<any> {
    try {
      const result = await insertionFn();
      return {
        message:
          ResponseMessages.InsertionSuccess,
        data: result,
      };
    } catch (error) {
      return {
        message: 'Unable to insert data.',
        error: error.message,
      };
    }
  }

  async handleUpdate(
    updateFn: () => Promise<any | null>,
  ): Promise<any> {
    try {
      const result = await updateFn();
      return {
        message: ResponseMessages.UpdateSuccess,
        data: result,
      };
    } catch (error) {
      return {
        message: 'Unable to update data.',
        error: error.message,
      };
    }
  }

  async handleDelete(
    deleteFn: () => Promise<any | null>,
  ): Promise<any> {
    try {
      const result = await deleteFn();
      if (result) {
        return {
          message: ResponseMessages.DeleteSuccess,
          data: result,
        };
      } else {
        return {
          message: 'No data found for deletion.',
        };
      }
    } catch (error) {
      return {
        message: 'Unable to delete data.',
        error: error.message,
      };
    }
  }

  async handleSelect<T>(
    selectFn: () => Promise<T | null>,
  ): Promise<any> {
    try {
      const result = await selectFn();
      if (result) {
        return result;
      } else {
        return {
          message: 'No data found.',
        };
      }
    } catch (error) {
      return {
        message: 'Unable to retrieve data.',
        error: error.message,
      };
    }
  }
}
