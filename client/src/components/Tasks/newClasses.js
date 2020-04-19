"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var snippets_1 = require("../snippets");
var Task = /** @class */ (function () {
    function Task(setup) {
        setup ? this.setup(setup) : this;
    }
    Task.prototype._stamp = function (payload, isComplete, date) {
        // * Returns Timestamp
        // * Alter Method Per Class To Your Liking
        var _a;
        payload = payload ? payload : "onCreate";
        isComplete = isComplete ? isComplete : false;
        date = date ? date : Date.now();
        var stamp = {
            key: date,
            payload: payload,
            isComplete: isComplete
        };
        stamp = this._stampAdd(stamp);
        return (_a = this.timestamps) === null || _a === void 0 ? void 0 : _a.push(stamp);
    };
    Task.prototype._stampAdd = function (stamp) {
        return stamp;
    };
    Task.prototype.onNewDay = function () {
        return;
    };
    Task.prototype.transform = function (task, helpers) {
        for (var _i = 0, _a = Object.keys(task); _i < _a.length; _i++) {
            var key = _a[_i];
            // ! Typescript Error
            this[key] = task[key];
        }
        if (helpers) {
            this.helpers = {};
            for (var _b = 0, _c = Object.keys(helpers); _b < _c.length; _b++) {
                var h = _c[_b];
                this.helpers[h] = helpers[h];
            }
        }
        return this;
    };
    Task.prototype.setup = function (setup) {
        // * Interate Over Setup & Asign Each Property To Object
        var keys = Object.keys(setup);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            //! Typescript Error
            this[key] = setup[key];
        }
        this.timestamps = [];
        this.id = snippets_1.hash();
        this.isComplete = false;
        !this.isPrivate ? (this.isPrivate = false) : this.isPrivate;
        this.create(setup);
        this._stamp();
    };
    Task.prototype.create = function (setup) {
        // * Asign Non Default Properties
    };
    Task.prototype.complete = function () {
        // * Complete Task, Add Timestamp,
        // * Arhive & Use Helpers
        this.isComplete = true;
        this._stamp("onComplete", true);
        this.archive();
        // * Remove Task From Client
        return this.helpers ? this.helpers.deleteTask(this) : this;
    };
    Task.prototype.fail = function () {
        // * A Necessary Placeholder
        // * Not To Throw An Error
        this.isComplete = false;
        this._stamp("onFail", false);
        this.archive();
        // * Remove Task From Client
        return this.helpers ? this.helpers.deleteTask(this) : this;
    };
    Task.prototype.archive = function () {
        // * Send Completed Task To Backend Endpoint
        return this;
    };
    Task.prototype.reset = function (isComplete) {
        // * A Necessary Placeholder
        // * Not To Throw An Error
        return this;
    };
    return Task;
}());
exports.Task = Task;
var Streak = /** @class */ (function (_super) {
    __extends(Streak, _super);
    function Streak(setup) {
        var _this = _super.call(this) || this;
        setup ? _this.setup(setup) : _this;
        return _this;
    }
    Streak.prototype._stampAdd = function (stamp) {
        stamp.streak = this.streak;
        return stamp;
    };
    Streak.prototype.onNewDay = function () {
        var _a = this.timestamps
            ? this.timestamps[this.timestamps.length - 1]
            : Date.now(), key = _a.key, payload = _a.payload;
        var lastDate = new Date(key).getDate();
        var lastMonth = new Date(key).getMonth();
        var now = new Date();
        var toDate = now.getDate();
        var toMonth = now.getMonth();
        var diff = Math.abs(toDate - lastDate);
        if (lastDate !== toDate) {
            // * New Day
            if (diff === 1) {
                // * Yesterday, has been completed or failed
                // * No Reset necessary
                this.isComplete = false;
            }
            else if (diff !== 1) {
                // * Last Completed Or Failed > 1 Days Ago
                // * Fail Task Yesterday
                this.failYesterday();
            }
        }
    };
    Streak.prototype.create = function (setup) {
        // * Defaults Streak & Strikes To 0 If Not Given In setup
        this.streak = !setup.streak ? 0 : setup.streak;
        this.strikes = !setup.strikes ? 0 : setup.strikes;
        return this;
    };
    Streak.prototype.fail = function (helpers) {
        this.strikes++;
        this.streak = this.streak > 0 ? 0 : this.streak--;
        this.isComplete = true;
        this._stamp("onFail", false);
        return this.helpers ? this.helpers.setTask(this) : this;
    };
    Streak.prototype.failYesterday = function (helpers) {
        this.strikes++;
        this.streak = this.streak > 0 ? 0 : this.streak--;
        this.isComplete = false;
        this._stamp("onFail", false, Date.now() - 86400000);
        return this.helpers ? this.helpers.setTask(this) : this;
    };
    Streak.prototype.complete = function (helpers) {
        this.streak++;
        // ! Typescript Error
        this.isComplete = true;
        this._stamp("onComplete", true);
        return this.helpers ? this.helpers.setTask(this) : this;
    };
    Streak.prototype.completeYesterday = function (helpers) {
        this.streak++;
        this.isComplete = false;
        this._stamp("onComplete", true, Date.now() - 86400000);
        return this.helpers ? this.helpers.setTask(this) : this;
    };
    return Streak;
}(Task));
var task = new Task({
    title: "test",
    notes: "test",
    payload: "Task",
    isPrivate: true
});
var streak = new Streak({
    title: "test",
    notes: "test",
    payload: "Streak",
    isPrivate: true
});
//task.complete();
//streak.complete();
task
    .transform(task, {
    setTask: function () {
        console.log("set Task xD");
    },
    deleteTask: function () {
        console.log("deleted task xD");
    }
})
    .complete();
console.log(task);
