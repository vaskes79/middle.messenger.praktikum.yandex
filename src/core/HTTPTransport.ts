enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

type HeadersItem = Record<string, string>;

type Options<TData = unknown> = {
  method: METHOD;
  data?: TData;
  headers?: HeadersItem;
};

type OptionsWithoutMethod<TData> = Omit<Options<TData>, 'method'>;

type Req = Document | XMLHttpRequestBodyInit | null | undefined;

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

  private _request<TRes = unknown, TReq = unknown>(
    url: string,
    options: Options<TRes> = { method: METHOD.GET }
  ): Promise<TReq> {
    const { method, data } = options;
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      if (headers) {
        this._prepareHeaders(headers, xhr);
      }

      xhr.onload = function () {
        const res = JSON.parse(xhr.response) as TReq;
        resolve(res);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
  static GET<TReq = unknown>(url: string): Promise<TReq> {
    return HTTPTransport._instance._request<null, TReq>(url);
  }

  static POST<TReq = unknown, TRes = unknown>(
    url: string,
    options: OptionsWithoutMethod<TReq>
  ): Promise<TRes> {
    return HTTPTransport._instance._request<TReq, TRes>(url, {
      method: METHOD.POST,
      data: options.data
    });
  }
}
