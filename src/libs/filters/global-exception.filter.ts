import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { throwError } from 'rxjs';

const handleHttpException = (exception: any, host: ArgumentsHost) => {
  const ctx = host.switchToHttp();
  const response = ctx.getResponse();
  const status = exception.status || 500;

  response.status(status).send({
    name: exception.name || 'INTERNAL_SERVER_EXCEPTION',
    status,
    message: exception.message,
    details: exception.details,
  });
};

const handleRpcException = (exception: any, host: ArgumentsHost) => {
  const ctx = host.switchToRpc().getContext();

  ctx.message.ack();

  throwError(() => exception);
};

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const exceptionType = host.getType();

    if (exceptionType === 'http') {
      return handleHttpException(exception, host);
    }

    if (exceptionType === 'rpc') {
      return handleRpcException(exception, host);
    }
  }
}

export const globalExceptionFilter = new GlobalExceptionFilter();
