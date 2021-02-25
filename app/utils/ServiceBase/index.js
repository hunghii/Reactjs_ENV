/* eslint-disable default-case */
import Axios from 'axios';
import _ from 'lodash';
import Result from './result';
import { $Token } from '../token';
import {
  JWT_TOKEN,
  API_BASE_URL,
  DEFAULT_RESPONSE_MESSAGE,
} from '../constants';

export default class ServiceBase {
  static async requestJson(opts) {

    let axiosResult = null;
    let result = null;
    const axiosRequestConfig = {
      baseURL: opts.baseUrl || API_BASE_URL,
      timeout: 30000000,
      headers: {
        'Content-Type': _.get(opts, 'contentType', 'application/json'),
        authorization:`Bearer ${$Token.get(JWT_TOKEN)}`,
      },
    };

    try {
      switch (opts.method) {
        case 'GET':
          axiosResult = await Axios.get(opts.url, {
            ...axiosRequestConfig,
            params: opts.data,
          });
          break;
        case 'POST':
          axiosResult = await Axios.post(
            opts.url,
            opts.data,
            axiosRequestConfig,
          );
          break;
        case 'PUT':
          axiosResult = await Axios.put(
            opts.url,
            opts.data,
            axiosRequestConfig,
          );
          break;
        case 'DELETE':
          axiosResult = await Axios.delete(opts.url, axiosRequestConfig);
          break;
      }
      result = new Result(axiosResult.data, null);
    } catch (error) {
      let messages = error.message;
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        if (_.isString(error.response.data.message)) {
          messages = error.response.data.message;
        } else if (_.isObject(error.response.data.message)) {
          messages = _.get(DEFAULT_RESPONSE_MESSAGE, 500);
        }
      } else if (
        _.get(error, 'response.data.errors', []) &&
        _.get(error, 'response.data.errors', []).length > 0
      ) {
        messages = _.map(_.get(error, 'response.data.errors', []), err =>
          _.get(err, 'msg'),
        );
        return new Result(null, messages);
      }
      result = new Result(null, messages);
    }
    return result;
  }
}
export function requestJsonGet(options) {
  try {
    const xhr = Axios.create({
      baseURL: API_BASE_URL,
      timeout: 100000,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${$Token.get(JWT_TOKEN)}`,
      },
    });
    return xhr
      .get(options.url, {
        params: options.data,
      })
      .then((response) => {
        console.log("response1", response);
        return response;
      })
      .catch((err) => {
        console.log("err", err.message);
      });
  } catch (error) {
    return error;
  }
  // ({ response }) => {
  //   try {
  //     if (!response) {
  //       return <Redirect to="/notFound" />;
  //     }
  //     if (response) {
  //       if (response.status === "403") {
  //         Ui.showError({
  //           message: response.data.message
  //             ? response.data.message.toString()
  //             : "Thất bại",
  //         });
  //       } else {
  //         response.data.errors.forEach((index) => {
  //           Ui.showError({
  //             message: index.msg ? index.msg.toString() : "Thất bại",
  //           });
  //         });
  //       }
  //       return response;
  //     }
  //   } catch (error) {
  //     return error;
  //   }
  // }
}