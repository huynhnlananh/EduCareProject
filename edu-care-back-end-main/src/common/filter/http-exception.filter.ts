import { ExceptionFilter, Catch, ArgumentsHost, NotFoundException, HttpException, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'

interface ErrorResponse {
  message: string
  error: {
    detailMessage: string
    status: number
  }
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()

    const message = exception.message || 'An error occurred'
    const errorResponse: ErrorResponse = {
      message: message,
      error: {
        detailMessage:
          exception.getResponse() instanceof Object
            ? (exception.getResponse() as any).message
            : exception.getResponse(),
        status: status
      }
    }
    response.status(status).json(errorResponse)
  }
}
