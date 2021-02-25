import _ from "lodash";
import { $Cookies } from "./cookies";
import { ERP_REPORT, JWT_TOKEN } from "./constants";
import { $LocalStorage } from "./localStorage";

/**
 * Contains global session.
 */
export default class Globals {
  static isInitialized = false;

  static session = {};

  static reset() {
    this.isInitialized = false;
    this.session = {
      public: {},
      private: {},
    };
  }

  static clear() {
    $Cookies.remove(ERP_REPORT);
    $Cookies.remove(JWT_TOKEN);
    $LocalStorage.sls.clear();
    $LocalStorage.pls.clear();
    this.session = {
      public: {},
      private: {},
    };
  }

  static init(session) {
    if (this.isInitialized) {
      throw Error("Globals is already initialized.");
    }
    this.session = session || {
      public: {},
      private: {},
    };

    this.isInitialized = true;
  }

  static throwIfNotInitialized() {
    if (!this.isInitialized) {
      throw Error(
        "'Globals' is not initialized. You have to call 'Globals.init' before."
      );
    }
  }

  static getSession() {
    this.throwIfNotInitialized();
    return this.session;
  }

  static setSession(session) {
    this.throwIfNotInitialized();
    console.log('session.public',session.public)
    // Update session object by the new data.
    $Cookies.set(ERP_REPORT, session.public.erpReport);
    $Cookies.set(JWT_TOKEN, session.private.token);
    $Cookies.set("reLoad", true);

    this.session = {
      ...this.session,
      ...session,
    };
  }

  static get erpReport() {
    const currentSession = this.getSession();
    if (currentSession) {
      const publicSession = currentSession.public;
      if (publicSession && publicSession.erpReport) {
        return JSON.parse(publicSession.erpReport);
      }
      return null;
    }
    return null;
  }

  static set erpReport(erpReport) {
    this.setSession({
      public: { erpReport: JSON.stringify(erpReport) },
    });
  }

  static get isAuthenticated() {
    return !(
      this.erpReport === null ||
      _.isNaN(this.session.private.token) ||
      _.isNull(this.session.private.token) ||
      _.isUndefined(this.session.private.token)
    );
  }
}
