require("../../base/testSetup");
var chai_1 = require("chai");
var AdvancedSlicer_1 = require("./AdvancedSlicer");
var $ = require("jquery");
describe("AdvancedSlicer", function () {
    var parentEle;
    beforeEach(function () {
        global['$'] = require("jquery");
        global['d3'] = require("d3");
        global['_'] = require("underscore");
        parentEle = $('<div></div>');
    });
    afterEach(function () {
        if (parentEle) {
            parentEle.remove();
        }
        parentEle = null;
    });
    var createInstance = function () {
        var ele = $('<div>');
        parentEle.append(ele);
        var result = {
            instance: new AdvancedSlicer_1.AdvancedSlicer(ele),
            element: ele
        };
        return result;
    };
    it("should load", function () {
        createInstance();
    });
    describe("serverSideSearch", function () {
        it("should return the property when set", function () {
            var instance = createInstance().instance;
            instance.serverSideSearch = true;
            chai_1.expect(instance.serverSideSearch).to.eq(true);
        });
    });
});