enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export enum HEADERS {
  JSON = 'application/json; charset=UTF-8',
  CONTENT_TYPE = 'Content-Type'
}

type HeadersItem = Record<string, string>;

export type Options<TData = unknown> = {
  method: METHOD;
  data?: TData;
  headers?: HeadersItem;
};

export type OptionsWithoutMethod<TData> = Omit<Options<TData>, 'method'>;

export class HTTPTransport {
  private static _instance: HTTPTransport = new HTTPTransport();

  constructor() {
    if (HTTPTransport._instance) {
      this._error('Instantiation failed: Use HTTPTransport.getInstance() instead of new.');
    }
    HTTPTransport._instance = this;
  }

  private _error(msg?: string) {
    msg = `Error: ${msg}` || 'Error: HTTPTransport';
    throw new Error(msg);
  }

  private _prepareHeaders = (headers: HeadersItem, xhr: XMLHttpRequest) => {
    Object.keys(headers).forEach((header) => {
      const value = headers[header];
      xhr.setRequestHeader(header, value);
    });
  };

  private _request<TReq = unknown, TRes = unknown>(
    url: string,
    options: Options<TReq> = { method: METHOD.GET }
  ): Promise<TRes> {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.open(method, url);

      if (headers) {
        this._prepareHeaders(headers, xhr);
      }

      xhr.onload = function () {
        let res = xhr.response;
        const checkTypeOfJson = xhr.responseType === 'json' || xhr.response !== 'OK';
        if (checkTypeOfJson) {
          res = JSON.parse(res) as TRes;
        }

        if (xhr.status === 200) {
          resolve(res as TRes);
        }

        reject({ status: xhr.status, reasons: String(res.reason) });
      }.bind(this);

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
        return;
      }

      if (headers && headers[HEADERS.CONTENT_TYPE] === HEADERS.JSON) {
        xhr.send(JSON.stringify(data));
        return;
      }

      xhr.send(data as any);
    });
  }

  static GET<TReq = unknown, TRes = unknown>(url: string, data?: TReq): Promise<TRes> {
    if (data) {
      const params = new URLSearchParams(data);
      url = `${url}?${params}`;
    }
    return HTTPTransport._instance._request<TReq, TRes>(url);
  }

  static POST<TReq = unknown, TRes = unknown>(
    url: string,
    options: OptionsWithoutMethod<TReq>
  ): Promise<TRes> {
    return HTTPTransport._instance._request<TReq, TRes>(url, {
      method: METHOD.POST,
      data: options.data,
      headers: options.headers
    });
  }

  static PUT<TReq = unknown, TRes = unknown>(
    url: string,
    options: OptionsWithoutMethod<TReq>
  ): Promise<TRes> {
    return HTTPTransport._instance._request<TReq, TRes>(url, {
      method: METHOD.PUT,
      data: options.data,
      headers: options.headers
    });
  }

  static DELETE<TReq = unknown, TRes = unknown>(
    url: string,
    options: OptionsWithoutMethod<TReq>
  ): Promise<TRes> {
    return HTTPTransport._instance._request<TReq, TRes>(url, {
      method: METHOD.DELETE,
      data: options.data,
      headers: options.headers
    });
  }
}
