enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

type Options<TData = unknown> = {
  method: METHOD;
  data?: TData;
};

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

  private _request<TRes = unknown, TReq = unknown>(
    url: string,
    options: Options<TRes> = { method: METHOD.GET }
  ): Promise<TReq> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

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
        xhr.send(data as Req);
      }
    });
  }
  static GET<TReq = unknown>(url: string): Promise<TReq> {
    return HTTPTransport._instance._request<null, TReq>(url);
  }
}
