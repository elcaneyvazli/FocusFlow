// src/services/signalrService.js
import * as signalR from "@microsoft/signalr";

export const signalRService = {
  connection: null,

  startConnection: function (url) {
    if (!url) {
      console.error("SignalR URL is not provided.");
      return;
    }

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(url, {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.connection
      .start()
      .then(() => {
        console.log("SignalR Connected");
      })
      .catch((err) => {
        console.error("SignalR Connection Error: ", err);
      });
  },

  addListener: function (eventName, callback) {
    if (this.connection) {
      this.connection.on(eventName, callback);
    } else {
      console.error(
        "SignalR Connection is not established. Cannot add listener."
      );
    }
  },

  removeListener: function (eventName, callback) {
    if (this.connection) {
      this.connection.off(eventName, callback);
    } else {
      console.error(
        "SignalR Connection is not established. Cannot remove listener."
      );
    }
  },

  stopConnection: function () {
    if (this.connection) {
      this.connection
        .stop()
        .then(() => {
          console.log("SignalR Disconnected");
        })
        .catch((err) => {
          console.error("SignalR Disconnection Error: ", err);
        });
    } else {
      console.error(
        "SignalR Connection is not established. Cannot stop connection."
      );
    }
  },

  invoke: function (methodName, ...args) {
    if (this.connection) {
      return this.connection.invoke(methodName, ...args).catch((err) => {
        console.error(`SignalR Invoke Error for method ${methodName}: `, err);
      });
    } else {
      console.error(
        "SignalR Connection is not established. Cannot invoke method."
      );
      return Promise.reject("SignalR Connection is not established.");
    }
  },
};
