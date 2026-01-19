import * as __typia_transform__accessExpressionAsString from "typia/lib/internal/_accessExpressionAsString.js";
import * as __typia_transform__assertGuard from "typia/lib/internal/_assertGuard.js";
import { createAssertEquals } from 'typia';
import type { DeviceCosts, IBaseDevice } from '@/model/device';
import type { IAllRunSpec } from '@/model/runspec';
import type { IBus, IBusExport } from '@/model/bus';
export const assertEqualsIBusExport = (() => { const _iv2 = new Set([1, 2, 3, 4, 5, 6, 10, 15, 20, 30, 60]); const _av4 = new Set([1, 2, 3, 4, 5, 6, 10, 15, 20, 30, 60]); const _io0 = (input: any, _exceptionable: boolean = true): boolean => "number" === typeof input.basis && (undefined === input.devices || Array.isArray(input.devices) && input.devices.every((elem: any, _index1: number) => "object" === typeof elem && null !== elem && _io1(elem, true && _exceptionable))) && (undefined === input.id || "string" === typeof input.id) && (undefined === input.collectionId || "string" === typeof input.collectionId) && (undefined === input.interval || true === _iv2.has(input.interval)) && (undefined === input.startInterval || "number" === typeof input.startInterval) && (undefined === input.startHour || "number" === typeof input.startHour) && (undefined === input.title || "string" === typeof input.title) && (1 === Object.keys(input).length || Object.keys(input).every((key: any) => {
    if (["basis", "devices", "id", "collectionId", "interval", "startInterval", "startHour", "title"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return false;
})); const _io1 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.id && (undefined === input.busId || "string" === typeof input.busId) && ("fixed_load" === input.type || "load" === input.type || "supply" === input.type || "storage" === input.type || "thermal_load" === input.type) && ("object" === typeof input.attrs && null !== input.attrs && false === Array.isArray(input.attrs) && _io2(input.attrs, true && _exceptionable)) && "number" === typeof input.basis && (Array.isArray(input.hardBounds) && (input.hardBounds.length === 2 && "number" === typeof input.hardBounds[0] && "number" === typeof input.hardBounds[1])) && ("object" === typeof input.bounds && null !== input.bounds && _io3(input.bounds, true && _exceptionable)) && (undefined === input.cumulative_bounds || "object" === typeof input.cumulative_bounds && null !== input.cumulative_bounds && _io3(input.cumulative_bounds, true && _exceptionable)) && ("object" === typeof input.costs && null !== input.costs && false === Array.isArray(input.costs) && _io5(input.costs, true && _exceptionable)) && (undefined === input.title || "string" === typeof input.title) && (undefined === input.description || "string" === typeof input.description) && ("object" === typeof input.tags && null !== input.tags && false === Array.isArray(input.tags) && _io8(input.tags, true && _exceptionable)) && (undefined === input.color || "string" === typeof input.color) && (undefined === input.shape || "string" === typeof input.shape) && ("object" === typeof input.parameters && null !== input.parameters && false === Array.isArray(input.parameters) && _io9(input.parameters, true && _exceptionable)) && (9 === Object.keys(input).length || Object.keys(input).every((key: any) => {
    if (["id", "busId", "type", "attrs", "basis", "hardBounds", "bounds", "cumulative_bounds", "costs", "title", "description", "tags", "color", "shape", "parameters"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return false;
})); const _io2 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.isSupply || "boolean" === typeof input.isSupply) && (undefined === input.hasParameters || "boolean" === typeof input.hasParameters) && (undefined === input.hideBounds || "boolean" === typeof input.hideBounds) && (undefined === input.hideCBounds || "boolean" === typeof input.hideCBounds) && (undefined === input.hideCosts || "boolean" === typeof input.hideCosts) && (0 === Object.keys(input).length || Object.keys(input).every((key: any) => {
    if (["isSupply", "hasParameters", "hideBounds", "hideCBounds", "hideCosts"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return false;
})); const _io3 = (input: any, _exceptionable: boolean = true): boolean => "number" === typeof input.basis && (undefined === input.hardBounds || Array.isArray(input.hardBounds) && (input.hardBounds.length === 2 && "number" === typeof input.hardBounds[0] && "number" === typeof input.hardBounds[1])) && "boolean" === typeof input.coerce && ("object" === typeof input.runs && null !== input.runs && false === Array.isArray(input.runs) && _io4(input.runs, true && _exceptionable)) && (3 === Object.keys(input).length || Object.keys(input).every((key: any) => {
    if (["basis", "hardBounds", "coerce", "runs"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return false;
})); const _io4 = (input: any, _exceptionable: boolean = true): boolean => Object.keys(input).every((key: any) => {
    const value = input[key];
    if (undefined === value)
        return true;
    if ("number" === typeof Number(key))
        return Array.isArray(value) && (value.length === 2 && "number" === typeof value[0] && "number" === typeof value[1]);
    return false;
}); const _io5 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.flow || "object" === typeof input.flow && null !== input.flow && _io6(input.flow, true && _exceptionable)) && (undefined === input.cumulative_flow || "object" === typeof input.cumulative_flow && null !== input.cumulative_flow && _io6(input.cumulative_flow, true && _exceptionable)) && (undefined === input.flow_bounds_relative || "object" === typeof input.flow_bounds_relative && null !== input.flow_bounds_relative && _io3(input.flow_bounds_relative, true && _exceptionable)) && (undefined === input.cumulative_flow_bounds_relative || Array.isArray(input.cumulative_flow_bounds_relative) && (input.cumulative_flow_bounds_relative.length === 2 && "number" === typeof input.cumulative_flow_bounds_relative[0] && "number" === typeof input.cumulative_flow_bounds_relative[1])) && (undefined === input.peak_flow || Array.isArray(input.peak_flow) && (input.peak_flow.length === 3 && "number" === typeof input.peak_flow[0] && "number" === typeof input.peak_flow[1] && "number" === typeof input.peak_flow[2])) && (0 === Object.keys(input).length || Object.keys(input).every((key: any) => {
    if (["flow", "cumulative_flow", "flow_bounds_relative", "cumulative_flow_bounds_relative", "peak_flow"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return false;
})); const _io6 = (input: any, _exceptionable: boolean = true): boolean => "object" === typeof input.runs && null !== input.runs && false === Array.isArray(input.runs) && _io7(input.runs, true && _exceptionable) && "number" === typeof input.basis && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
    if (["runs", "basis"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return false;
})); const _io7 = (input: any, _exceptionable: boolean = true): boolean => Object.keys(input).every((key: any) => {
    const value = input[key];
    if (undefined === value)
        return true;
    if ("number" === typeof Number(key))
        return Array.isArray(value) && (value.length === 3 && "number" === typeof value[0] && "number" === typeof value[1] && "number" === typeof value[2]);
    return false;
}); const _io8 = (input: any, _exceptionable: boolean = true): boolean => Object.keys(input).every((key: any) => {
    const value = input[key];
    if (undefined === value)
        return true;
    return "string" === typeof value || "number" === typeof value || "boolean" === typeof value;
}); const _io9 = (input: any, _exceptionable: boolean = true): boolean => Object.keys(input).every((key: any) => {
    const value = input[key];
    if (undefined === value)
        return true;
    return true;
}); const _ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("number" === typeof input.basis || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".basis",
    expected: "number",
    value: input.basis
}, _errorFactory)) && (undefined === input.devices || (Array.isArray(input.devices) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".devices",
    expected: "(Array<BaseDevice> | undefined)",
    value: input.devices
}, _errorFactory)) && input.devices.every((elem: any, _index3: number) => ("object" === typeof elem && null !== elem || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".devices[" + _index3 + "]",
    expected: "BaseDevice",
    value: elem
}, _errorFactory)) && _ao1(elem, _path + ".devices[" + _index3 + "]", true && _exceptionable) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".devices[" + _index3 + "]",
    expected: "BaseDevice",
    value: elem
}, _errorFactory)) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".devices",
    expected: "(Array<BaseDevice> | undefined)",
    value: input.devices
}, _errorFactory)) && (undefined === input.id || "string" === typeof input.id || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".id",
    expected: "(string | undefined)",
    value: input.id
}, _errorFactory)) && (undefined === input.collectionId || "string" === typeof input.collectionId || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".collectionId",
    expected: "(string | undefined)",
    value: input.collectionId
}, _errorFactory)) && (undefined === input.interval || true === _av4.has(input.interval) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".interval",
    expected: "(1 | 10 | 15 | 2 | 20 | 3 | 30 | 4 | 5 | 6 | 60 | undefined)",
    value: input.interval
}, _errorFactory)) && (undefined === input.startInterval || "number" === typeof input.startInterval || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".startInterval",
    expected: "(number | undefined)",
    value: input.startInterval
}, _errorFactory)) && (undefined === input.startHour || "number" === typeof input.startHour || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".startHour",
    expected: "(number | undefined)",
    value: input.startHour
}, _errorFactory)) && (undefined === input.title || "string" === typeof input.title || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".title",
    expected: "(string | undefined)",
    value: input.title
}, _errorFactory)) && (1 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).every((key: any) => {
    if (["basis", "devices", "id", "collectionId", "interval", "startInterval", "startHour", "title"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return __typia_transform__assertGuard._assertGuard(_exceptionable, {
        method: "createAssertEquals",
        path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
        expected: "undefined",
        value: value
    }, _errorFactory);
}))); const _ao1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.id || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".id",
    expected: "string",
    value: input.id
}, _errorFactory)) && (undefined === input.busId || "string" === typeof input.busId || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".busId",
    expected: "(string | undefined)",
    value: input.busId
}, _errorFactory)) && ("fixed_load" === input.type || "load" === input.type || "supply" === input.type || "storage" === input.type || "thermal_load" === input.type || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".type",
    expected: "(\"fixed_load\" | \"load\" | \"storage\" | \"supply\" | \"thermal_load\")",
    value: input.type
}, _errorFactory)) && (("object" === typeof input.attrs && null !== input.attrs && false === Array.isArray(input.attrs) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".attrs",
    expected: "IAttributes",
    value: input.attrs
}, _errorFactory)) && _ao2(input.attrs, _path + ".attrs", true && _exceptionable) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".attrs",
    expected: "IAttributes",
    value: input.attrs
}, _errorFactory)) && ("number" === typeof input.basis || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".basis",
    expected: "number",
    value: input.basis
}, _errorFactory)) && ((Array.isArray(input.hardBounds) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hardBounds",
    expected: "[number, number]",
    value: input.hardBounds
}, _errorFactory)) && ((input.hardBounds.length === 2 || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hardBounds",
    expected: "[number, number]",
    value: input.hardBounds
}, _errorFactory)) && ("number" === typeof input.hardBounds[0] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hardBounds[0]",
    expected: "number",
    value: input.hardBounds[0]
}, _errorFactory)) && ("number" === typeof input.hardBounds[1] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hardBounds[1]",
    expected: "number",
    value: input.hardBounds[1]
}, _errorFactory))) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hardBounds",
    expected: "[number, number]",
    value: input.hardBounds
}, _errorFactory)) && (("object" === typeof input.bounds && null !== input.bounds || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".bounds",
    expected: "BoundsRunSpec",
    value: input.bounds
}, _errorFactory)) && _ao3(input.bounds, _path + ".bounds", true && _exceptionable) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".bounds",
    expected: "BoundsRunSpec",
    value: input.bounds
}, _errorFactory)) && (undefined === input.cumulative_bounds || ("object" === typeof input.cumulative_bounds && null !== input.cumulative_bounds || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".cumulative_bounds",
    expected: "(BoundsRunSpec | undefined)",
    value: input.cumulative_bounds
}, _errorFactory)) && _ao3(input.cumulative_bounds, _path + ".cumulative_bounds", true && _exceptionable) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".cumulative_bounds",
    expected: "(BoundsRunSpec | undefined)",
    value: input.cumulative_bounds
}, _errorFactory)) && (("object" === typeof input.costs && null !== input.costs && false === Array.isArray(input.costs) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".costs",
    expected: "DeviceCosts",
    value: input.costs
}, _errorFactory)) && _ao5(input.costs, _path + ".costs", true && _exceptionable) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".costs",
    expected: "DeviceCosts",
    value: input.costs
}, _errorFactory)) && (undefined === input.title || "string" === typeof input.title || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".title",
    expected: "(string | undefined)",
    value: input.title
}, _errorFactory)) && (undefined === input.description || "string" === typeof input.description || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".description",
    expected: "(string | undefined)",
    value: input.description
}, _errorFactory)) && (("object" === typeof input.tags && null !== input.tags && false === Array.isArray(input.tags) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".tags",
    expected: "Record<string, string | number | boolean>",
    value: input.tags
}, _errorFactory)) && _ao8(input.tags, _path + ".tags", true && _exceptionable) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".tags",
    expected: "Record<string, string | number | boolean>",
    value: input.tags
}, _errorFactory)) && (undefined === input.color || "string" === typeof input.color || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".color",
    expected: "(string | undefined)",
    value: input.color
}, _errorFactory)) && (undefined === input.shape || "string" === typeof input.shape || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".shape",
    expected: "(string | undefined)",
    value: input.shape
}, _errorFactory)) && (("object" === typeof input.parameters && null !== input.parameters && false === Array.isArray(input.parameters) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".parameters",
    expected: "Record<string, any>",
    value: input.parameters
}, _errorFactory)) && _ao9(input.parameters, _path + ".parameters", true && _exceptionable) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".parameters",
    expected: "Record<string, any>",
    value: input.parameters
}, _errorFactory)) && (9 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).every((key: any) => {
    if (["id", "busId", "type", "attrs", "basis", "hardBounds", "bounds", "cumulative_bounds", "costs", "title", "description", "tags", "color", "shape", "parameters"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return __typia_transform__assertGuard._assertGuard(_exceptionable, {
        method: "createAssertEquals",
        path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
        expected: "undefined",
        value: value
    }, _errorFactory);
}))); const _ao2 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.isSupply || "boolean" === typeof input.isSupply || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".isSupply",
    expected: "(boolean | undefined)",
    value: input.isSupply
}, _errorFactory)) && (undefined === input.hasParameters || "boolean" === typeof input.hasParameters || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hasParameters",
    expected: "(boolean | undefined)",
    value: input.hasParameters
}, _errorFactory)) && (undefined === input.hideBounds || "boolean" === typeof input.hideBounds || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hideBounds",
    expected: "(boolean | undefined)",
    value: input.hideBounds
}, _errorFactory)) && (undefined === input.hideCBounds || "boolean" === typeof input.hideCBounds || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hideCBounds",
    expected: "(boolean | undefined)",
    value: input.hideCBounds
}, _errorFactory)) && (undefined === input.hideCosts || "boolean" === typeof input.hideCosts || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hideCosts",
    expected: "(boolean | undefined)",
    value: input.hideCosts
}, _errorFactory)) && (0 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).every((key: any) => {
    if (["isSupply", "hasParameters", "hideBounds", "hideCBounds", "hideCosts"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return __typia_transform__assertGuard._assertGuard(_exceptionable, {
        method: "createAssertEquals",
        path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
        expected: "undefined",
        value: value
    }, _errorFactory);
}))); const _ao3 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("number" === typeof input.basis || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".basis",
    expected: "number",
    value: input.basis
}, _errorFactory)) && (undefined === input.hardBounds || (Array.isArray(input.hardBounds) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hardBounds",
    expected: "([number, number] | undefined)",
    value: input.hardBounds
}, _errorFactory)) && ((input.hardBounds.length === 2 || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hardBounds",
    expected: "[number, number]",
    value: input.hardBounds
}, _errorFactory)) && ("number" === typeof input.hardBounds[0] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hardBounds[0]",
    expected: "number",
    value: input.hardBounds[0]
}, _errorFactory)) && ("number" === typeof input.hardBounds[1] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hardBounds[1]",
    expected: "number",
    value: input.hardBounds[1]
}, _errorFactory))) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hardBounds",
    expected: "([number, number] | undefined)",
    value: input.hardBounds
}, _errorFactory)) && ("boolean" === typeof input.coerce || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".coerce",
    expected: "boolean",
    value: input.coerce
}, _errorFactory)) && (("object" === typeof input.runs && null !== input.runs && false === Array.isArray(input.runs) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".runs",
    expected: "Record<number, [number, number]>",
    value: input.runs
}, _errorFactory)) && _ao4(input.runs, _path + ".runs", true && _exceptionable) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".runs",
    expected: "Record<number, [number, number]>",
    value: input.runs
}, _errorFactory)) && (3 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).every((key: any) => {
    if (["basis", "hardBounds", "coerce", "runs"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return __typia_transform__assertGuard._assertGuard(_exceptionable, {
        method: "createAssertEquals",
        path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
        expected: "undefined",
        value: value
    }, _errorFactory);
}))); const _ao4 = (input: any, _path: string, _exceptionable: boolean = true): boolean => false === _exceptionable || Object.keys(input).every((key: any) => {
    const value = input[key];
    if (undefined === value)
        return true;
    if ("number" === typeof Number(key))
        return (Array.isArray(value) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
            expected: "[number, number]",
            value: value
        }, _errorFactory)) && ((value.length === 2 || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
            expected: "[number, number]",
            value: value
        }, _errorFactory)) && ("number" === typeof value[0] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key) + "[0]",
            expected: "number",
            value: value[0]
        }, _errorFactory)) && ("number" === typeof value[1] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key) + "[1]",
            expected: "number",
            value: value[1]
        }, _errorFactory))) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
            expected: "[number, number]",
            value: value
        }, _errorFactory);
    return __typia_transform__assertGuard._assertGuard(_exceptionable, {
        method: "createAssertEquals",
        path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
        expected: "undefined",
        value: value
    }, _errorFactory);
}); const _ao5 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.flow || ("object" === typeof input.flow && null !== input.flow || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".flow",
    expected: "(RunSpec<[number, number, number]> | undefined)",
    value: input.flow
}, _errorFactory)) && _ao6(input.flow, _path + ".flow", true && _exceptionable) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".flow",
    expected: "(RunSpec<[number, number, number]> | undefined)",
    value: input.flow
}, _errorFactory)) && (undefined === input.cumulative_flow || ("object" === typeof input.cumulative_flow && null !== input.cumulative_flow || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".cumulative_flow",
    expected: "(RunSpec<[number, number, number]> | undefined)",
    value: input.cumulative_flow
}, _errorFactory)) && _ao6(input.cumulative_flow, _path + ".cumulative_flow", true && _exceptionable) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".cumulative_flow",
    expected: "(RunSpec<[number, number, number]> | undefined)",
    value: input.cumulative_flow
}, _errorFactory)) && (undefined === input.flow_bounds_relative || ("object" === typeof input.flow_bounds_relative && null !== input.flow_bounds_relative || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".flow_bounds_relative",
    expected: "(BoundsRunSpec | undefined)",
    value: input.flow_bounds_relative
}, _errorFactory)) && _ao3(input.flow_bounds_relative, _path + ".flow_bounds_relative", true && _exceptionable) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".flow_bounds_relative",
    expected: "(BoundsRunSpec | undefined)",
    value: input.flow_bounds_relative
}, _errorFactory)) && (undefined === input.cumulative_flow_bounds_relative || (Array.isArray(input.cumulative_flow_bounds_relative) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".cumulative_flow_bounds_relative",
    expected: "([number, number] | undefined)",
    value: input.cumulative_flow_bounds_relative
}, _errorFactory)) && ((input.cumulative_flow_bounds_relative.length === 2 || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".cumulative_flow_bounds_relative",
    expected: "[number, number]",
    value: input.cumulative_flow_bounds_relative
}, _errorFactory)) && ("number" === typeof input.cumulative_flow_bounds_relative[0] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".cumulative_flow_bounds_relative[0]",
    expected: "number",
    value: input.cumulative_flow_bounds_relative[0]
}, _errorFactory)) && ("number" === typeof input.cumulative_flow_bounds_relative[1] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".cumulative_flow_bounds_relative[1]",
    expected: "number",
    value: input.cumulative_flow_bounds_relative[1]
}, _errorFactory))) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".cumulative_flow_bounds_relative",
    expected: "([number, number] | undefined)",
    value: input.cumulative_flow_bounds_relative
}, _errorFactory)) && (undefined === input.peak_flow || (Array.isArray(input.peak_flow) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".peak_flow",
    expected: "([number, number, number] | undefined)",
    value: input.peak_flow
}, _errorFactory)) && ((input.peak_flow.length === 3 || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".peak_flow",
    expected: "[number, number, number]",
    value: input.peak_flow
}, _errorFactory)) && ("number" === typeof input.peak_flow[0] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".peak_flow[0]",
    expected: "number",
    value: input.peak_flow[0]
}, _errorFactory)) && ("number" === typeof input.peak_flow[1] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".peak_flow[1]",
    expected: "number",
    value: input.peak_flow[1]
}, _errorFactory)) && ("number" === typeof input.peak_flow[2] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".peak_flow[2]",
    expected: "number",
    value: input.peak_flow[2]
}, _errorFactory))) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".peak_flow",
    expected: "([number, number, number] | undefined)",
    value: input.peak_flow
}, _errorFactory)) && (0 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).every((key: any) => {
    if (["flow", "cumulative_flow", "flow_bounds_relative", "cumulative_flow_bounds_relative", "peak_flow"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return __typia_transform__assertGuard._assertGuard(_exceptionable, {
        method: "createAssertEquals",
        path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
        expected: "undefined",
        value: value
    }, _errorFactory);
}))); const _ao6 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (("object" === typeof input.runs && null !== input.runs && false === Array.isArray(input.runs) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".runs",
    expected: "Record<number, [number, number, number]>",
    value: input.runs
}, _errorFactory)) && _ao7(input.runs, _path + ".runs", true && _exceptionable) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".runs",
    expected: "Record<number, [number, number, number]>",
    value: input.runs
}, _errorFactory)) && ("number" === typeof input.basis || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".basis",
    expected: "number",
    value: input.basis
}, _errorFactory)) && (2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).every((key: any) => {
    if (["runs", "basis"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return __typia_transform__assertGuard._assertGuard(_exceptionable, {
        method: "createAssertEquals",
        path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
        expected: "undefined",
        value: value
    }, _errorFactory);
}))); const _ao7 = (input: any, _path: string, _exceptionable: boolean = true): boolean => false === _exceptionable || Object.keys(input).every((key: any) => {
    const value = input[key];
    if (undefined === value)
        return true;
    if ("number" === typeof Number(key))
        return (Array.isArray(value) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
            expected: "[number, number, number]",
            value: value
        }, _errorFactory)) && ((value.length === 3 || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
            expected: "[number, number, number]",
            value: value
        }, _errorFactory)) && ("number" === typeof value[0] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key) + "[0]",
            expected: "number",
            value: value[0]
        }, _errorFactory)) && ("number" === typeof value[1] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key) + "[1]",
            expected: "number",
            value: value[1]
        }, _errorFactory)) && ("number" === typeof value[2] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key) + "[2]",
            expected: "number",
            value: value[2]
        }, _errorFactory))) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
            expected: "[number, number, number]",
            value: value
        }, _errorFactory);
    return __typia_transform__assertGuard._assertGuard(_exceptionable, {
        method: "createAssertEquals",
        path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
        expected: "undefined",
        value: value
    }, _errorFactory);
}); const _ao8 = (input: any, _path: string, _exceptionable: boolean = true): boolean => false === _exceptionable || Object.keys(input).every((key: any) => {
    const value = input[key];
    if (undefined === value)
        return true;
    return "string" === typeof value || "number" === typeof value || "boolean" === typeof value || __typia_transform__assertGuard._assertGuard(_exceptionable, {
        method: "createAssertEquals",
        path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
        expected: "(boolean | number | string)",
        value: value
    }, _errorFactory);
}); const _ao9 = (input: any, _path: string, _exceptionable: boolean = true): boolean => false === _exceptionable || Object.keys(input).every((key: any) => {
    const value = input[key];
    if (undefined === value)
        return true;
    return true;
}); const __is = (input: any, _exceptionable: boolean = true): input is IBusExport => "object" === typeof input && null !== input && _io0(input, true); let _errorFactory: any; return (input: any, errorFactory?: (p: import("typia").TypeGuardError.IProps) => Error): IBusExport => {
    if (false === __is(input)) {
        _errorFactory = errorFactory;
        ((input: any, _path: string, _exceptionable: boolean = true) => ("object" === typeof input && null !== input || __typia_transform__assertGuard._assertGuard(true, {
            method: "createAssertEquals",
            path: _path + "",
            expected: "IBusExport",
            value: input
        }, _errorFactory)) && _ao0(input, _path + "", true) || __typia_transform__assertGuard._assertGuard(true, {
            method: "createAssertEquals",
            path: _path + "",
            expected: "IBusExport",
            value: input
        }, _errorFactory))(input, "$input", true);
    }
    return input;
}; })();
export const assertEqualsIBus = (() => { const _iv1 = new Set([1, 2, 3, 4, 5, 6, 10, 15, 20, 30, 60]); const _av2 = new Set([1, 2, 3, 4, 5, 6, 10, 15, 20, 30, 60]); const _io0 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.id && (undefined === input.collectionId || "string" === typeof input.collectionId) && "number" === typeof input.basis && true === _iv1.has(input.interval) && "number" === typeof input.startInterval && "number" === typeof input.startHour && (undefined === input.title || "string" === typeof input.title) && (5 === Object.keys(input).length || Object.keys(input).every((key: any) => {
    if (["id", "collectionId", "basis", "interval", "startInterval", "startHour", "title"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return false;
})); const _ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.id || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".id",
    expected: "string",
    value: input.id
}, _errorFactory)) && (undefined === input.collectionId || "string" === typeof input.collectionId || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".collectionId",
    expected: "(string | undefined)",
    value: input.collectionId
}, _errorFactory)) && ("number" === typeof input.basis || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".basis",
    expected: "number",
    value: input.basis
}, _errorFactory)) && (true === _av2.has(input.interval) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".interval",
    expected: "(1 | 10 | 15 | 2 | 20 | 3 | 30 | 4 | 5 | 6 | 60)",
    value: input.interval
}, _errorFactory)) && ("number" === typeof input.startInterval || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".startInterval",
    expected: "number",
    value: input.startInterval
}, _errorFactory)) && ("number" === typeof input.startHour || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".startHour",
    expected: "number",
    value: input.startHour
}, _errorFactory)) && (undefined === input.title || "string" === typeof input.title || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".title",
    expected: "(string | undefined)",
    value: input.title
}, _errorFactory)) && (5 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).every((key: any) => {
    if (["id", "collectionId", "basis", "interval", "startInterval", "startHour", "title"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return __typia_transform__assertGuard._assertGuard(_exceptionable, {
        method: "createAssertEquals",
        path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
        expected: "undefined",
        value: value
    }, _errorFactory);
}))); const __is = (input: any, _exceptionable: boolean = true): input is IBus => "object" === typeof input && null !== input && _io0(input, true); let _errorFactory: any; return (input: any, errorFactory?: (p: import("typia").TypeGuardError.IProps) => Error): IBus => {
    if (false === __is(input)) {
        _errorFactory = errorFactory;
        ((input: any, _path: string, _exceptionable: boolean = true) => ("object" === typeof input && null !== input || __typia_transform__assertGuard._assertGuard(true, {
            method: "createAssertEquals",
            path: _path + "",
            expected: "IBus",
            value: input
        }, _errorFactory)) && _ao0(input, _path + "", true) || __typia_transform__assertGuard._assertGuard(true, {
            method: "createAssertEquals",
            path: _path + "",
            expected: "IBus",
            value: input
        }, _errorFactory))(input, "$input", true);
    }
    return input;
}; })();
export const assertEqualsDeviceCosts = (() => { const _io0 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.flow || "object" === typeof input.flow && null !== input.flow && _io1(input.flow, true && _exceptionable)) && (undefined === input.cumulative_flow || "object" === typeof input.cumulative_flow && null !== input.cumulative_flow && _io1(input.cumulative_flow, true && _exceptionable)) && (undefined === input.flow_bounds_relative || "object" === typeof input.flow_bounds_relative && null !== input.flow_bounds_relative && _io3(input.flow_bounds_relative, true && _exceptionable)) && (undefined === input.cumulative_flow_bounds_relative || Array.isArray(input.cumulative_flow_bounds_relative) && (input.cumulative_flow_bounds_relative.length === 2 && "number" === typeof input.cumulative_flow_bounds_relative[0] && "number" === typeof input.cumulative_flow_bounds_relative[1])) && (undefined === input.peak_flow || Array.isArray(input.peak_flow) && (input.peak_flow.length === 3 && "number" === typeof input.peak_flow[0] && "number" === typeof input.peak_flow[1] && "number" === typeof input.peak_flow[2])) && (0 === Object.keys(input).length || Object.keys(input).every((key: any) => {
    if (["flow", "cumulative_flow", "flow_bounds_relative", "cumulative_flow_bounds_relative", "peak_flow"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return false;
})); const _io1 = (input: any, _exceptionable: boolean = true): boolean => "object" === typeof input.runs && null !== input.runs && false === Array.isArray(input.runs) && _io2(input.runs, true && _exceptionable) && "number" === typeof input.basis && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
    if (["runs", "basis"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return false;
})); const _io2 = (input: any, _exceptionable: boolean = true): boolean => Object.keys(input).every((key: any) => {
    const value = input[key];
    if (undefined === value)
        return true;
    if ("number" === typeof Number(key))
        return Array.isArray(value) && (value.length === 3 && "number" === typeof value[0] && "number" === typeof value[1] && "number" === typeof value[2]);
    return false;
}); const _io3 = (input: any, _exceptionable: boolean = true): boolean => "number" === typeof input.basis && (undefined === input.hardBounds || Array.isArray(input.hardBounds) && (input.hardBounds.length === 2 && "number" === typeof input.hardBounds[0] && "number" === typeof input.hardBounds[1])) && "boolean" === typeof input.coerce && ("object" === typeof input.runs && null !== input.runs && false === Array.isArray(input.runs) && _io4(input.runs, true && _exceptionable)) && (3 === Object.keys(input).length || Object.keys(input).every((key: any) => {
    if (["basis", "hardBounds", "coerce", "runs"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return false;
})); const _io4 = (input: any, _exceptionable: boolean = true): boolean => Object.keys(input).every((key: any) => {
    const value = input[key];
    if (undefined === value)
        return true;
    if ("number" === typeof Number(key))
        return Array.isArray(value) && (value.length === 2 && "number" === typeof value[0] && "number" === typeof value[1]);
    return false;
}); const _ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.flow || ("object" === typeof input.flow && null !== input.flow || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".flow",
    expected: "(RunSpec<[number, number, number]> | undefined)",
    value: input.flow
}, _errorFactory)) && _ao1(input.flow, _path + ".flow", true && _exceptionable) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".flow",
    expected: "(RunSpec<[number, number, number]> | undefined)",
    value: input.flow
}, _errorFactory)) && (undefined === input.cumulative_flow || ("object" === typeof input.cumulative_flow && null !== input.cumulative_flow || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".cumulative_flow",
    expected: "(RunSpec<[number, number, number]> | undefined)",
    value: input.cumulative_flow
}, _errorFactory)) && _ao1(input.cumulative_flow, _path + ".cumulative_flow", true && _exceptionable) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".cumulative_flow",
    expected: "(RunSpec<[number, number, number]> | undefined)",
    value: input.cumulative_flow
}, _errorFactory)) && (undefined === input.flow_bounds_relative || ("object" === typeof input.flow_bounds_relative && null !== input.flow_bounds_relative || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".flow_bounds_relative",
    expected: "(BoundsRunSpec | undefined)",
    value: input.flow_bounds_relative
}, _errorFactory)) && _ao3(input.flow_bounds_relative, _path + ".flow_bounds_relative", true && _exceptionable) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".flow_bounds_relative",
    expected: "(BoundsRunSpec | undefined)",
    value: input.flow_bounds_relative
}, _errorFactory)) && (undefined === input.cumulative_flow_bounds_relative || (Array.isArray(input.cumulative_flow_bounds_relative) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".cumulative_flow_bounds_relative",
    expected: "([number, number] | undefined)",
    value: input.cumulative_flow_bounds_relative
}, _errorFactory)) && ((input.cumulative_flow_bounds_relative.length === 2 || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".cumulative_flow_bounds_relative",
    expected: "[number, number]",
    value: input.cumulative_flow_bounds_relative
}, _errorFactory)) && ("number" === typeof input.cumulative_flow_bounds_relative[0] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".cumulative_flow_bounds_relative[0]",
    expected: "number",
    value: input.cumulative_flow_bounds_relative[0]
}, _errorFactory)) && ("number" === typeof input.cumulative_flow_bounds_relative[1] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".cumulative_flow_bounds_relative[1]",
    expected: "number",
    value: input.cumulative_flow_bounds_relative[1]
}, _errorFactory))) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".cumulative_flow_bounds_relative",
    expected: "([number, number] | undefined)",
    value: input.cumulative_flow_bounds_relative
}, _errorFactory)) && (undefined === input.peak_flow || (Array.isArray(input.peak_flow) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".peak_flow",
    expected: "([number, number, number] | undefined)",
    value: input.peak_flow
}, _errorFactory)) && ((input.peak_flow.length === 3 || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".peak_flow",
    expected: "[number, number, number]",
    value: input.peak_flow
}, _errorFactory)) && ("number" === typeof input.peak_flow[0] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".peak_flow[0]",
    expected: "number",
    value: input.peak_flow[0]
}, _errorFactory)) && ("number" === typeof input.peak_flow[1] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".peak_flow[1]",
    expected: "number",
    value: input.peak_flow[1]
}, _errorFactory)) && ("number" === typeof input.peak_flow[2] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".peak_flow[2]",
    expected: "number",
    value: input.peak_flow[2]
}, _errorFactory))) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".peak_flow",
    expected: "([number, number, number] | undefined)",
    value: input.peak_flow
}, _errorFactory)) && (0 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).every((key: any) => {
    if (["flow", "cumulative_flow", "flow_bounds_relative", "cumulative_flow_bounds_relative", "peak_flow"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return __typia_transform__assertGuard._assertGuard(_exceptionable, {
        method: "createAssertEquals",
        path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
        expected: "undefined",
        value: value
    }, _errorFactory);
}))); const _ao1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (("object" === typeof input.runs && null !== input.runs && false === Array.isArray(input.runs) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".runs",
    expected: "Record<number, [number, number, number]>",
    value: input.runs
}, _errorFactory)) && _ao2(input.runs, _path + ".runs", true && _exceptionable) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".runs",
    expected: "Record<number, [number, number, number]>",
    value: input.runs
}, _errorFactory)) && ("number" === typeof input.basis || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".basis",
    expected: "number",
    value: input.basis
}, _errorFactory)) && (2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).every((key: any) => {
    if (["runs", "basis"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return __typia_transform__assertGuard._assertGuard(_exceptionable, {
        method: "createAssertEquals",
        path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
        expected: "undefined",
        value: value
    }, _errorFactory);
}))); const _ao2 = (input: any, _path: string, _exceptionable: boolean = true): boolean => false === _exceptionable || Object.keys(input).every((key: any) => {
    const value = input[key];
    if (undefined === value)
        return true;
    if ("number" === typeof Number(key))
        return (Array.isArray(value) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
            expected: "[number, number, number]",
            value: value
        }, _errorFactory)) && ((value.length === 3 || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
            expected: "[number, number, number]",
            value: value
        }, _errorFactory)) && ("number" === typeof value[0] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key) + "[0]",
            expected: "number",
            value: value[0]
        }, _errorFactory)) && ("number" === typeof value[1] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key) + "[1]",
            expected: "number",
            value: value[1]
        }, _errorFactory)) && ("number" === typeof value[2] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key) + "[2]",
            expected: "number",
            value: value[2]
        }, _errorFactory))) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
            expected: "[number, number, number]",
            value: value
        }, _errorFactory);
    return __typia_transform__assertGuard._assertGuard(_exceptionable, {
        method: "createAssertEquals",
        path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
        expected: "undefined",
        value: value
    }, _errorFactory);
}); const _ao3 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("number" === typeof input.basis || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".basis",
    expected: "number",
    value: input.basis
}, _errorFactory)) && (undefined === input.hardBounds || (Array.isArray(input.hardBounds) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hardBounds",
    expected: "([number, number] | undefined)",
    value: input.hardBounds
}, _errorFactory)) && ((input.hardBounds.length === 2 || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hardBounds",
    expected: "[number, number]",
    value: input.hardBounds
}, _errorFactory)) && ("number" === typeof input.hardBounds[0] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hardBounds[0]",
    expected: "number",
    value: input.hardBounds[0]
}, _errorFactory)) && ("number" === typeof input.hardBounds[1] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hardBounds[1]",
    expected: "number",
    value: input.hardBounds[1]
}, _errorFactory))) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hardBounds",
    expected: "([number, number] | undefined)",
    value: input.hardBounds
}, _errorFactory)) && ("boolean" === typeof input.coerce || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".coerce",
    expected: "boolean",
    value: input.coerce
}, _errorFactory)) && (("object" === typeof input.runs && null !== input.runs && false === Array.isArray(input.runs) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".runs",
    expected: "Record<number, [number, number]>",
    value: input.runs
}, _errorFactory)) && _ao4(input.runs, _path + ".runs", true && _exceptionable) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".runs",
    expected: "Record<number, [number, number]>",
    value: input.runs
}, _errorFactory)) && (3 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).every((key: any) => {
    if (["basis", "hardBounds", "coerce", "runs"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return __typia_transform__assertGuard._assertGuard(_exceptionable, {
        method: "createAssertEquals",
        path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
        expected: "undefined",
        value: value
    }, _errorFactory);
}))); const _ao4 = (input: any, _path: string, _exceptionable: boolean = true): boolean => false === _exceptionable || Object.keys(input).every((key: any) => {
    const value = input[key];
    if (undefined === value)
        return true;
    if ("number" === typeof Number(key))
        return (Array.isArray(value) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
            expected: "[number, number]",
            value: value
        }, _errorFactory)) && ((value.length === 2 || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
            expected: "[number, number]",
            value: value
        }, _errorFactory)) && ("number" === typeof value[0] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key) + "[0]",
            expected: "number",
            value: value[0]
        }, _errorFactory)) && ("number" === typeof value[1] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key) + "[1]",
            expected: "number",
            value: value[1]
        }, _errorFactory))) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
            expected: "[number, number]",
            value: value
        }, _errorFactory);
    return __typia_transform__assertGuard._assertGuard(_exceptionable, {
        method: "createAssertEquals",
        path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
        expected: "undefined",
        value: value
    }, _errorFactory);
}); const __is = (input: any, _exceptionable: boolean = true): input is DeviceCosts => "object" === typeof input && null !== input && false === Array.isArray(input) && _io0(input, true); let _errorFactory: any; return (input: any, errorFactory?: (p: import("typia").TypeGuardError.IProps) => Error): DeviceCosts => {
    if (false === __is(input)) {
        _errorFactory = errorFactory;
        ((input: any, _path: string, _exceptionable: boolean = true) => ("object" === typeof input && null !== input && false === Array.isArray(input) || __typia_transform__assertGuard._assertGuard(true, {
            method: "createAssertEquals",
            path: _path + "",
            expected: "DeviceCosts",
            value: input
        }, _errorFactory)) && _ao0(input, _path + "", true) || __typia_transform__assertGuard._assertGuard(true, {
            method: "createAssertEquals",
            path: _path + "",
            expected: "DeviceCosts",
            value: input
        }, _errorFactory))(input, "$input", true);
    }
    return input;
}; })();
export const assertEqualsIBaseDevice = (() => { const _io0 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.id && (undefined === input.busId || "string" === typeof input.busId) && ("fixed_load" === input.type || "load" === input.type || "supply" === input.type || "storage" === input.type || "thermal_load" === input.type) && ("object" === typeof input.attrs && null !== input.attrs && false === Array.isArray(input.attrs) && _io1(input.attrs, true && _exceptionable)) && "number" === typeof input.basis && (Array.isArray(input.hardBounds) && (input.hardBounds.length === 2 && "number" === typeof input.hardBounds[0] && "number" === typeof input.hardBounds[1])) && ("object" === typeof input.bounds && null !== input.bounds && _io2(input.bounds, true && _exceptionable)) && (undefined === input.cumulative_bounds || "object" === typeof input.cumulative_bounds && null !== input.cumulative_bounds && _io2(input.cumulative_bounds, true && _exceptionable)) && ("object" === typeof input.costs && null !== input.costs && false === Array.isArray(input.costs) && _io4(input.costs, true && _exceptionable)) && (undefined === input.title || "string" === typeof input.title) && (undefined === input.description || "string" === typeof input.description) && (undefined === input.tags || "object" === typeof input.tags && null !== input.tags && false === Array.isArray(input.tags) && _io7(input.tags, true && _exceptionable)) && (undefined === input.color || "string" === typeof input.color) && (undefined === input.shape || "string" === typeof input.shape) && (undefined === input.parameters || "object" === typeof input.parameters && null !== input.parameters && false === Array.isArray(input.parameters) && _io8(input.parameters, true && _exceptionable)) && (7 === Object.keys(input).length || Object.keys(input).every((key: any) => {
    if (["id", "busId", "type", "attrs", "basis", "hardBounds", "bounds", "cumulative_bounds", "costs", "title", "description", "tags", "color", "shape", "parameters"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return false;
})); const _io1 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.isSupply || "boolean" === typeof input.isSupply) && (undefined === input.hasParameters || "boolean" === typeof input.hasParameters) && (undefined === input.hideBounds || "boolean" === typeof input.hideBounds) && (undefined === input.hideCBounds || "boolean" === typeof input.hideCBounds) && (undefined === input.hideCosts || "boolean" === typeof input.hideCosts) && (0 === Object.keys(input).length || Object.keys(input).every((key: any) => {
    if (["isSupply", "hasParameters", "hideBounds", "hideCBounds", "hideCosts"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return false;
})); const _io2 = (input: any, _exceptionable: boolean = true): boolean => "number" === typeof input.basis && (undefined === input.hardBounds || Array.isArray(input.hardBounds) && (input.hardBounds.length === 2 && "number" === typeof input.hardBounds[0] && "number" === typeof input.hardBounds[1])) && "boolean" === typeof input.coerce && ("object" === typeof input.runs && null !== input.runs && false === Array.isArray(input.runs) && _io3(input.runs, true && _exceptionable)) && (3 === Object.keys(input).length || Object.keys(input).every((key: any) => {
    if (["basis", "hardBounds", "coerce", "runs"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return false;
})); const _io3 = (input: any, _exceptionable: boolean = true): boolean => Object.keys(input).every((key: any) => {
    const value = input[key];
    if (undefined === value)
        return true;
    if ("number" === typeof Number(key))
        return Array.isArray(value) && (value.length === 2 && "number" === typeof value[0] && "number" === typeof value[1]);
    return false;
}); const _io4 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.flow || "object" === typeof input.flow && null !== input.flow && _io5(input.flow, true && _exceptionable)) && (undefined === input.cumulative_flow || "object" === typeof input.cumulative_flow && null !== input.cumulative_flow && _io5(input.cumulative_flow, true && _exceptionable)) && (undefined === input.flow_bounds_relative || "object" === typeof input.flow_bounds_relative && null !== input.flow_bounds_relative && _io2(input.flow_bounds_relative, true && _exceptionable)) && (undefined === input.cumulative_flow_bounds_relative || Array.isArray(input.cumulative_flow_bounds_relative) && (input.cumulative_flow_bounds_relative.length === 2 && "number" === typeof input.cumulative_flow_bounds_relative[0] && "number" === typeof input.cumulative_flow_bounds_relative[1])) && (undefined === input.peak_flow || Array.isArray(input.peak_flow) && (input.peak_flow.length === 3 && "number" === typeof input.peak_flow[0] && "number" === typeof input.peak_flow[1] && "number" === typeof input.peak_flow[2])) && (0 === Object.keys(input).length || Object.keys(input).every((key: any) => {
    if (["flow", "cumulative_flow", "flow_bounds_relative", "cumulative_flow_bounds_relative", "peak_flow"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return false;
})); const _io5 = (input: any, _exceptionable: boolean = true): boolean => "object" === typeof input.runs && null !== input.runs && false === Array.isArray(input.runs) && _io6(input.runs, true && _exceptionable) && "number" === typeof input.basis && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
    if (["runs", "basis"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return false;
})); const _io6 = (input: any, _exceptionable: boolean = true): boolean => Object.keys(input).every((key: any) => {
    const value = input[key];
    if (undefined === value)
        return true;
    if ("number" === typeof Number(key))
        return Array.isArray(value) && (value.length === 3 && "number" === typeof value[0] && "number" === typeof value[1] && "number" === typeof value[2]);
    return false;
}); const _io7 = (input: any, _exceptionable: boolean = true): boolean => Object.keys(input).every((key: any) => {
    const value = input[key];
    if (undefined === value)
        return true;
    return "string" === typeof value || "number" === typeof value || "boolean" === typeof value;
}); const _io8 = (input: any, _exceptionable: boolean = true): boolean => Object.keys(input).every((key: any) => {
    const value = input[key];
    if (undefined === value)
        return true;
    return true;
}); const _ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.id || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".id",
    expected: "string",
    value: input.id
}, _errorFactory)) && (undefined === input.busId || "string" === typeof input.busId || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".busId",
    expected: "(string | undefined)",
    value: input.busId
}, _errorFactory)) && ("fixed_load" === input.type || "load" === input.type || "supply" === input.type || "storage" === input.type || "thermal_load" === input.type || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".type",
    expected: "(\"fixed_load\" | \"load\" | \"storage\" | \"supply\" | \"thermal_load\")",
    value: input.type
}, _errorFactory)) && (("object" === typeof input.attrs && null !== input.attrs && false === Array.isArray(input.attrs) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".attrs",
    expected: "IAttributes",
    value: input.attrs
}, _errorFactory)) && _ao1(input.attrs, _path + ".attrs", true && _exceptionable) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".attrs",
    expected: "IAttributes",
    value: input.attrs
}, _errorFactory)) && ("number" === typeof input.basis || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".basis",
    expected: "number",
    value: input.basis
}, _errorFactory)) && ((Array.isArray(input.hardBounds) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hardBounds",
    expected: "[number, number]",
    value: input.hardBounds
}, _errorFactory)) && ((input.hardBounds.length === 2 || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hardBounds",
    expected: "[number, number]",
    value: input.hardBounds
}, _errorFactory)) && ("number" === typeof input.hardBounds[0] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hardBounds[0]",
    expected: "number",
    value: input.hardBounds[0]
}, _errorFactory)) && ("number" === typeof input.hardBounds[1] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hardBounds[1]",
    expected: "number",
    value: input.hardBounds[1]
}, _errorFactory))) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hardBounds",
    expected: "[number, number]",
    value: input.hardBounds
}, _errorFactory)) && (("object" === typeof input.bounds && null !== input.bounds || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".bounds",
    expected: "BoundsRunSpec",
    value: input.bounds
}, _errorFactory)) && _ao2(input.bounds, _path + ".bounds", true && _exceptionable) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".bounds",
    expected: "BoundsRunSpec",
    value: input.bounds
}, _errorFactory)) && (undefined === input.cumulative_bounds || ("object" === typeof input.cumulative_bounds && null !== input.cumulative_bounds || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".cumulative_bounds",
    expected: "(BoundsRunSpec | undefined)",
    value: input.cumulative_bounds
}, _errorFactory)) && _ao2(input.cumulative_bounds, _path + ".cumulative_bounds", true && _exceptionable) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".cumulative_bounds",
    expected: "(BoundsRunSpec | undefined)",
    value: input.cumulative_bounds
}, _errorFactory)) && (("object" === typeof input.costs && null !== input.costs && false === Array.isArray(input.costs) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".costs",
    expected: "DeviceCosts",
    value: input.costs
}, _errorFactory)) && _ao4(input.costs, _path + ".costs", true && _exceptionable) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".costs",
    expected: "DeviceCosts",
    value: input.costs
}, _errorFactory)) && (undefined === input.title || "string" === typeof input.title || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".title",
    expected: "(string | undefined)",
    value: input.title
}, _errorFactory)) && (undefined === input.description || "string" === typeof input.description || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".description",
    expected: "(string | undefined)",
    value: input.description
}, _errorFactory)) && (undefined === input.tags || ("object" === typeof input.tags && null !== input.tags && false === Array.isArray(input.tags) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".tags",
    expected: "(Record<string, string | number | boolean> | undefined)",
    value: input.tags
}, _errorFactory)) && _ao7(input.tags, _path + ".tags", true && _exceptionable) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".tags",
    expected: "(Record<string, string | number | boolean> | undefined)",
    value: input.tags
}, _errorFactory)) && (undefined === input.color || "string" === typeof input.color || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".color",
    expected: "(string | undefined)",
    value: input.color
}, _errorFactory)) && (undefined === input.shape || "string" === typeof input.shape || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".shape",
    expected: "(string | undefined)",
    value: input.shape
}, _errorFactory)) && (undefined === input.parameters || ("object" === typeof input.parameters && null !== input.parameters && false === Array.isArray(input.parameters) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".parameters",
    expected: "(Record<string, any> | undefined)",
    value: input.parameters
}, _errorFactory)) && _ao8(input.parameters, _path + ".parameters", true && _exceptionable) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".parameters",
    expected: "(Record<string, any> | undefined)",
    value: input.parameters
}, _errorFactory)) && (7 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).every((key: any) => {
    if (["id", "busId", "type", "attrs", "basis", "hardBounds", "bounds", "cumulative_bounds", "costs", "title", "description", "tags", "color", "shape", "parameters"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return __typia_transform__assertGuard._assertGuard(_exceptionable, {
        method: "createAssertEquals",
        path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
        expected: "undefined",
        value: value
    }, _errorFactory);
}))); const _ao1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.isSupply || "boolean" === typeof input.isSupply || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".isSupply",
    expected: "(boolean | undefined)",
    value: input.isSupply
}, _errorFactory)) && (undefined === input.hasParameters || "boolean" === typeof input.hasParameters || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hasParameters",
    expected: "(boolean | undefined)",
    value: input.hasParameters
}, _errorFactory)) && (undefined === input.hideBounds || "boolean" === typeof input.hideBounds || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hideBounds",
    expected: "(boolean | undefined)",
    value: input.hideBounds
}, _errorFactory)) && (undefined === input.hideCBounds || "boolean" === typeof input.hideCBounds || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hideCBounds",
    expected: "(boolean | undefined)",
    value: input.hideCBounds
}, _errorFactory)) && (undefined === input.hideCosts || "boolean" === typeof input.hideCosts || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hideCosts",
    expected: "(boolean | undefined)",
    value: input.hideCosts
}, _errorFactory)) && (0 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).every((key: any) => {
    if (["isSupply", "hasParameters", "hideBounds", "hideCBounds", "hideCosts"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return __typia_transform__assertGuard._assertGuard(_exceptionable, {
        method: "createAssertEquals",
        path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
        expected: "undefined",
        value: value
    }, _errorFactory);
}))); const _ao2 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("number" === typeof input.basis || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".basis",
    expected: "number",
    value: input.basis
}, _errorFactory)) && (undefined === input.hardBounds || (Array.isArray(input.hardBounds) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hardBounds",
    expected: "([number, number] | undefined)",
    value: input.hardBounds
}, _errorFactory)) && ((input.hardBounds.length === 2 || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hardBounds",
    expected: "[number, number]",
    value: input.hardBounds
}, _errorFactory)) && ("number" === typeof input.hardBounds[0] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hardBounds[0]",
    expected: "number",
    value: input.hardBounds[0]
}, _errorFactory)) && ("number" === typeof input.hardBounds[1] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hardBounds[1]",
    expected: "number",
    value: input.hardBounds[1]
}, _errorFactory))) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hardBounds",
    expected: "([number, number] | undefined)",
    value: input.hardBounds
}, _errorFactory)) && ("boolean" === typeof input.coerce || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".coerce",
    expected: "boolean",
    value: input.coerce
}, _errorFactory)) && (("object" === typeof input.runs && null !== input.runs && false === Array.isArray(input.runs) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".runs",
    expected: "Record<number, [number, number]>",
    value: input.runs
}, _errorFactory)) && _ao3(input.runs, _path + ".runs", true && _exceptionable) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".runs",
    expected: "Record<number, [number, number]>",
    value: input.runs
}, _errorFactory)) && (3 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).every((key: any) => {
    if (["basis", "hardBounds", "coerce", "runs"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return __typia_transform__assertGuard._assertGuard(_exceptionable, {
        method: "createAssertEquals",
        path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
        expected: "undefined",
        value: value
    }, _errorFactory);
}))); const _ao3 = (input: any, _path: string, _exceptionable: boolean = true): boolean => false === _exceptionable || Object.keys(input).every((key: any) => {
    const value = input[key];
    if (undefined === value)
        return true;
    if ("number" === typeof Number(key))
        return (Array.isArray(value) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
            expected: "[number, number]",
            value: value
        }, _errorFactory)) && ((value.length === 2 || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
            expected: "[number, number]",
            value: value
        }, _errorFactory)) && ("number" === typeof value[0] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key) + "[0]",
            expected: "number",
            value: value[0]
        }, _errorFactory)) && ("number" === typeof value[1] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key) + "[1]",
            expected: "number",
            value: value[1]
        }, _errorFactory))) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
            expected: "[number, number]",
            value: value
        }, _errorFactory);
    return __typia_transform__assertGuard._assertGuard(_exceptionable, {
        method: "createAssertEquals",
        path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
        expected: "undefined",
        value: value
    }, _errorFactory);
}); const _ao4 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.flow || ("object" === typeof input.flow && null !== input.flow || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".flow",
    expected: "(RunSpec<[number, number, number]> | undefined)",
    value: input.flow
}, _errorFactory)) && _ao5(input.flow, _path + ".flow", true && _exceptionable) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".flow",
    expected: "(RunSpec<[number, number, number]> | undefined)",
    value: input.flow
}, _errorFactory)) && (undefined === input.cumulative_flow || ("object" === typeof input.cumulative_flow && null !== input.cumulative_flow || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".cumulative_flow",
    expected: "(RunSpec<[number, number, number]> | undefined)",
    value: input.cumulative_flow
}, _errorFactory)) && _ao5(input.cumulative_flow, _path + ".cumulative_flow", true && _exceptionable) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".cumulative_flow",
    expected: "(RunSpec<[number, number, number]> | undefined)",
    value: input.cumulative_flow
}, _errorFactory)) && (undefined === input.flow_bounds_relative || ("object" === typeof input.flow_bounds_relative && null !== input.flow_bounds_relative || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".flow_bounds_relative",
    expected: "(BoundsRunSpec | undefined)",
    value: input.flow_bounds_relative
}, _errorFactory)) && _ao2(input.flow_bounds_relative, _path + ".flow_bounds_relative", true && _exceptionable) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".flow_bounds_relative",
    expected: "(BoundsRunSpec | undefined)",
    value: input.flow_bounds_relative
}, _errorFactory)) && (undefined === input.cumulative_flow_bounds_relative || (Array.isArray(input.cumulative_flow_bounds_relative) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".cumulative_flow_bounds_relative",
    expected: "([number, number] | undefined)",
    value: input.cumulative_flow_bounds_relative
}, _errorFactory)) && ((input.cumulative_flow_bounds_relative.length === 2 || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".cumulative_flow_bounds_relative",
    expected: "[number, number]",
    value: input.cumulative_flow_bounds_relative
}, _errorFactory)) && ("number" === typeof input.cumulative_flow_bounds_relative[0] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".cumulative_flow_bounds_relative[0]",
    expected: "number",
    value: input.cumulative_flow_bounds_relative[0]
}, _errorFactory)) && ("number" === typeof input.cumulative_flow_bounds_relative[1] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".cumulative_flow_bounds_relative[1]",
    expected: "number",
    value: input.cumulative_flow_bounds_relative[1]
}, _errorFactory))) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".cumulative_flow_bounds_relative",
    expected: "([number, number] | undefined)",
    value: input.cumulative_flow_bounds_relative
}, _errorFactory)) && (undefined === input.peak_flow || (Array.isArray(input.peak_flow) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".peak_flow",
    expected: "([number, number, number] | undefined)",
    value: input.peak_flow
}, _errorFactory)) && ((input.peak_flow.length === 3 || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".peak_flow",
    expected: "[number, number, number]",
    value: input.peak_flow
}, _errorFactory)) && ("number" === typeof input.peak_flow[0] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".peak_flow[0]",
    expected: "number",
    value: input.peak_flow[0]
}, _errorFactory)) && ("number" === typeof input.peak_flow[1] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".peak_flow[1]",
    expected: "number",
    value: input.peak_flow[1]
}, _errorFactory)) && ("number" === typeof input.peak_flow[2] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".peak_flow[2]",
    expected: "number",
    value: input.peak_flow[2]
}, _errorFactory))) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".peak_flow",
    expected: "([number, number, number] | undefined)",
    value: input.peak_flow
}, _errorFactory)) && (0 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).every((key: any) => {
    if (["flow", "cumulative_flow", "flow_bounds_relative", "cumulative_flow_bounds_relative", "peak_flow"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return __typia_transform__assertGuard._assertGuard(_exceptionable, {
        method: "createAssertEquals",
        path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
        expected: "undefined",
        value: value
    }, _errorFactory);
}))); const _ao5 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (("object" === typeof input.runs && null !== input.runs && false === Array.isArray(input.runs) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".runs",
    expected: "Record<number, [number, number, number]>",
    value: input.runs
}, _errorFactory)) && _ao6(input.runs, _path + ".runs", true && _exceptionable) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".runs",
    expected: "Record<number, [number, number, number]>",
    value: input.runs
}, _errorFactory)) && ("number" === typeof input.basis || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".basis",
    expected: "number",
    value: input.basis
}, _errorFactory)) && (2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).every((key: any) => {
    if (["runs", "basis"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return __typia_transform__assertGuard._assertGuard(_exceptionable, {
        method: "createAssertEquals",
        path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
        expected: "undefined",
        value: value
    }, _errorFactory);
}))); const _ao6 = (input: any, _path: string, _exceptionable: boolean = true): boolean => false === _exceptionable || Object.keys(input).every((key: any) => {
    const value = input[key];
    if (undefined === value)
        return true;
    if ("number" === typeof Number(key))
        return (Array.isArray(value) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
            expected: "[number, number, number]",
            value: value
        }, _errorFactory)) && ((value.length === 3 || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
            expected: "[number, number, number]",
            value: value
        }, _errorFactory)) && ("number" === typeof value[0] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key) + "[0]",
            expected: "number",
            value: value[0]
        }, _errorFactory)) && ("number" === typeof value[1] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key) + "[1]",
            expected: "number",
            value: value[1]
        }, _errorFactory)) && ("number" === typeof value[2] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key) + "[2]",
            expected: "number",
            value: value[2]
        }, _errorFactory))) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
            method: "createAssertEquals",
            path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
            expected: "[number, number, number]",
            value: value
        }, _errorFactory);
    return __typia_transform__assertGuard._assertGuard(_exceptionable, {
        method: "createAssertEquals",
        path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
        expected: "undefined",
        value: value
    }, _errorFactory);
}); const _ao7 = (input: any, _path: string, _exceptionable: boolean = true): boolean => false === _exceptionable || Object.keys(input).every((key: any) => {
    const value = input[key];
    if (undefined === value)
        return true;
    return "string" === typeof value || "number" === typeof value || "boolean" === typeof value || __typia_transform__assertGuard._assertGuard(_exceptionable, {
        method: "createAssertEquals",
        path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
        expected: "(boolean | number | string)",
        value: value
    }, _errorFactory);
}); const _ao8 = (input: any, _path: string, _exceptionable: boolean = true): boolean => false === _exceptionable || Object.keys(input).every((key: any) => {
    const value = input[key];
    if (undefined === value)
        return true;
    return true;
}); const __is = (input: any, _exceptionable: boolean = true): input is IBaseDevice => "object" === typeof input && null !== input && _io0(input, true); let _errorFactory: any; return (input: any, errorFactory?: (p: import("typia").TypeGuardError.IProps) => Error): IBaseDevice => {
    if (false === __is(input)) {
        _errorFactory = errorFactory;
        ((input: any, _path: string, _exceptionable: boolean = true) => ("object" === typeof input && null !== input || __typia_transform__assertGuard._assertGuard(true, {
            method: "createAssertEquals",
            path: _path + "",
            expected: "IBaseDevice",
            value: input
        }, _errorFactory)) && _ao0(input, _path + "", true) || __typia_transform__assertGuard._assertGuard(true, {
            method: "createAssertEquals",
            path: _path + "",
            expected: "IBaseDevice",
            value: input
        }, _errorFactory))(input, "$input", true);
    }
    return input;
}; })();
export const assertEqualsIAllRunSpec = (() => { const _io0 = (input: any, _exceptionable: boolean = true): boolean => "number" === typeof input.basis && ("object" === typeof input.runs && null !== input.runs && false === Array.isArray(input.runs) && _io1(input.runs, true && _exceptionable)) && (undefined === input.hardBounds || Array.isArray(input.hardBounds) && (input.hardBounds.length === 2 && "number" === typeof input.hardBounds[0] && "number" === typeof input.hardBounds[1])) && (undefined === input.coerce || "boolean" === typeof input.coerce) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
    if (["basis", "runs", "hardBounds", "coerce"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return false;
})); const _io1 = (input: any, _exceptionable: boolean = true): boolean => Object.keys(input).every((key: any) => {
    const value = input[key];
    if (undefined === value)
        return true;
    if ("number" === typeof Number(key))
        return true;
    return false;
}); const _ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("number" === typeof input.basis || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".basis",
    expected: "number",
    value: input.basis
}, _errorFactory)) && (("object" === typeof input.runs && null !== input.runs && false === Array.isArray(input.runs) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".runs",
    expected: "Record<number, unknown>",
    value: input.runs
}, _errorFactory)) && _ao1(input.runs, _path + ".runs", true && _exceptionable) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".runs",
    expected: "Record<number, unknown>",
    value: input.runs
}, _errorFactory)) && (undefined === input.hardBounds || (Array.isArray(input.hardBounds) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hardBounds",
    expected: "([number, number] | undefined)",
    value: input.hardBounds
}, _errorFactory)) && ((input.hardBounds.length === 2 || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hardBounds",
    expected: "[number, number]",
    value: input.hardBounds
}, _errorFactory)) && ("number" === typeof input.hardBounds[0] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hardBounds[0]",
    expected: "number",
    value: input.hardBounds[0]
}, _errorFactory)) && ("number" === typeof input.hardBounds[1] || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hardBounds[1]",
    expected: "number",
    value: input.hardBounds[1]
}, _errorFactory))) || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".hardBounds",
    expected: "([number, number] | undefined)",
    value: input.hardBounds
}, _errorFactory)) && (undefined === input.coerce || "boolean" === typeof input.coerce || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".coerce",
    expected: "(boolean | undefined)",
    value: input.coerce
}, _errorFactory)) && (2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).every((key: any) => {
    if (["basis", "runs", "hardBounds", "coerce"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return __typia_transform__assertGuard._assertGuard(_exceptionable, {
        method: "createAssertEquals",
        path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
        expected: "undefined",
        value: value
    }, _errorFactory);
}))); const _ao1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => false === _exceptionable || Object.keys(input).every((key: any) => {
    const value = input[key];
    if (undefined === value)
        return true;
    if ("number" === typeof Number(key))
        return true;
    return __typia_transform__assertGuard._assertGuard(_exceptionable, {
        method: "createAssertEquals",
        path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
        expected: "undefined",
        value: value
    }, _errorFactory);
}); const __is = (input: any, _exceptionable: boolean = true): input is IAllRunSpec => "object" === typeof input && null !== input && _io0(input, true); let _errorFactory: any; return (input: any, errorFactory?: (p: import("typia").TypeGuardError.IProps) => Error): IAllRunSpec => {
    if (false === __is(input)) {
        _errorFactory = errorFactory;
        ((input: any, _path: string, _exceptionable: boolean = true) => ("object" === typeof input && null !== input || __typia_transform__assertGuard._assertGuard(true, {
            method: "createAssertEquals",
            path: _path + "",
            expected: "IAllRunSpec",
            value: input
        }, _errorFactory)) && _ao0(input, _path + "", true) || __typia_transform__assertGuard._assertGuard(true, {
            method: "createAssertEquals",
            path: _path + "",
            expected: "IAllRunSpec",
            value: input
        }, _errorFactory))(input, "$input", true);
    }
    return input;
}; })();
export const assertEqualsIdentified = (() => { const _io0 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.id && (1 === Object.keys(input).length || Object.keys(input).every((key: any) => {
    if (["id"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return false;
})); const _ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.id || __typia_transform__assertGuard._assertGuard(_exceptionable, {
    method: "createAssertEquals",
    path: _path + ".id",
    expected: "string",
    value: input.id
}, _errorFactory)) && (1 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).every((key: any) => {
    if (["id"].some((prop: any) => key === prop))
        return true;
    const value = input[key];
    if (undefined === value)
        return true;
    return __typia_transform__assertGuard._assertGuard(_exceptionable, {
        method: "createAssertEquals",
        path: _path + __typia_transform__accessExpressionAsString._accessExpressionAsString(key),
        expected: "undefined",
        value: value
    }, _errorFactory);
}))); const __is = (input: any, _exceptionable: boolean = true): input is { id: string } => "object" === typeof input && null !== input && _io0(input, true); let _errorFactory: any; return (input: any, errorFactory?: (p: import("typia").TypeGuardError.IProps) => Error): { id: string } => {
    if (false === __is(input)) {
        _errorFactory = errorFactory;
        ((input: any, _path: string, _exceptionable: boolean = true) => ("object" === typeof input && null !== input || __typia_transform__assertGuard._assertGuard(true, {
            method: "createAssertEquals",
            path: _path + "",
            expected: "__type",
            value: input
        }, _errorFactory)) && _ao0(input, _path + "", true) || __typia_transform__assertGuard._assertGuard(true, {
            method: "createAssertEquals",
            path: _path + "",
            expected: "__type",
            value: input
        }, _errorFactory))(input, "$input", true);
    }
    return input;
}; })();
