import {
  __publicField
} from "./chunk-GKWPUQBP.js";

// node_modules/@reduxjs/toolkit/node_modules/redux/dist/redux.mjs
var $$observable = (() => typeof Symbol === "function" && Symbol.observable || "@@observable")();
var symbol_observable_default = $$observable;
var randomString = () => Math.random().toString(36).substring(7).split("").join(".");
var ActionTypes = {
  INIT: `@@redux/INIT${randomString()}`,
  REPLACE: `@@redux/REPLACE${randomString()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${randomString()}`
};
var actionTypes_default = ActionTypes;
function isPlainObject(obj) {
  if (typeof obj !== "object" || obj === null)
    return false;
  let proto2 = obj;
  while (Object.getPrototypeOf(proto2) !== null) {
    proto2 = Object.getPrototypeOf(proto2);
  }
  return Object.getPrototypeOf(obj) === proto2;
}
function miniKindOf(val) {
  if (val === void 0)
    return "undefined";
  if (val === null)
    return "null";
  const type = typeof val;
  switch (type) {
    case "boolean":
    case "string":
    case "number":
    case "symbol":
    case "function": {
      return type;
    }
  }
  if (Array.isArray(val))
    return "array";
  if (isDate(val))
    return "date";
  if (isError(val))
    return "error";
  const constructorName = ctorName(val);
  switch (constructorName) {
    case "Symbol":
    case "Promise":
    case "WeakMap":
    case "WeakSet":
    case "Map":
    case "Set":
      return constructorName;
  }
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase().replace(/\s/g, "");
}
function ctorName(val) {
  return typeof val.constructor === "function" ? val.constructor.name : null;
}
function isError(val) {
  return val instanceof Error || typeof val.message === "string" && val.constructor && typeof val.constructor.stackTraceLimit === "number";
}
function isDate(val) {
  if (val instanceof Date)
    return true;
  return typeof val.toDateString === "function" && typeof val.getDate === "function" && typeof val.setDate === "function";
}
function kindOf(val) {
  let typeOfVal = typeof val;
  if (true) {
    typeOfVal = miniKindOf(val);
  }
  return typeOfVal;
}
function createStore(reducer, preloadedState, enhancer) {
  if (typeof reducer !== "function") {
    throw new Error(false ? formatProdErrorMessage(2) : `Expected the root reducer to be a function. Instead, received: '${kindOf(reducer)}'`);
  }
  if (typeof preloadedState === "function" && typeof enhancer === "function" || typeof enhancer === "function" && typeof arguments[3] === "function") {
    throw new Error(false ? formatProdErrorMessage(0) : "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");
  }
  if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
    enhancer = preloadedState;
    preloadedState = void 0;
  }
  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      throw new Error(false ? formatProdErrorMessage(1) : `Expected the enhancer to be a function. Instead, received: '${kindOf(enhancer)}'`);
    }
    return enhancer(createStore)(reducer, preloadedState);
  }
  let currentReducer = reducer;
  let currentState = preloadedState;
  let currentListeners = /* @__PURE__ */ new Map();
  let nextListeners = currentListeners;
  let listenerIdCounter = 0;
  let isDispatching = false;
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = /* @__PURE__ */ new Map();
      currentListeners.forEach((listener2, key) => {
        nextListeners.set(key, listener2);
      });
    }
  }
  function getState() {
    if (isDispatching) {
      throw new Error(false ? formatProdErrorMessage(3) : "You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
    }
    return currentState;
  }
  function subscribe(listener2) {
    if (typeof listener2 !== "function") {
      throw new Error(false ? formatProdErrorMessage(4) : `Expected the listener to be a function. Instead, received: '${kindOf(listener2)}'`);
    }
    if (isDispatching) {
      throw new Error(false ? formatProdErrorMessage(5) : "You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");
    }
    let isSubscribed = true;
    ensureCanMutateNextListeners();
    const listenerId = listenerIdCounter++;
    nextListeners.set(listenerId, listener2);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }
      if (isDispatching) {
        throw new Error(false ? formatProdErrorMessage(6) : "You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");
      }
      isSubscribed = false;
      ensureCanMutateNextListeners();
      nextListeners.delete(listenerId);
      currentListeners = null;
    };
  }
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error(false ? formatProdErrorMessage(7) : `Actions must be plain objects. Instead, the actual type was: '${kindOf(action)}'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.`);
    }
    if (typeof action.type === "undefined") {
      throw new Error(false ? formatProdErrorMessage(8) : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
    }
    if (typeof action.type !== "string") {
      throw new Error(false ? formatProdErrorMessage(17) : `Action "type" property must be a string. Instead, the actual type was: '${kindOf(action.type)}'. Value was: '${action.type}' (stringified)`);
    }
    if (isDispatching) {
      throw new Error(false ? formatProdErrorMessage(9) : "Reducers may not dispatch actions.");
    }
    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }
    const listeners = currentListeners = nextListeners;
    listeners.forEach((listener2) => {
      listener2();
    });
    return action;
  }
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== "function") {
      throw new Error(false ? formatProdErrorMessage(10) : `Expected the nextReducer to be a function. Instead, received: '${kindOf(nextReducer)}`);
    }
    currentReducer = nextReducer;
    dispatch({
      type: actionTypes_default.REPLACE
    });
  }
  function observable() {
    const outerSubscribe = subscribe;
    return {
      /**
       * The minimal observable subscription method.
       * @param observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe(observer) {
        if (typeof observer !== "object" || observer === null) {
          throw new Error(false ? formatProdErrorMessage(11) : `Expected the observer to be an object. Instead, received: '${kindOf(observer)}'`);
        }
        function observeState() {
          const observerAsObserver = observer;
          if (observerAsObserver.next) {
            observerAsObserver.next(getState());
          }
        }
        observeState();
        const unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe
        };
      },
      [symbol_observable_default]() {
        return this;
      }
    };
  }
  dispatch({
    type: actionTypes_default.INIT
  });
  const store = {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [symbol_observable_default]: observable
  };
  return store;
}
function legacy_createStore(reducer, preloadedState, enhancer) {
  return createStore(reducer, preloadedState, enhancer);
}
function warning(message) {
  if (typeof console !== "undefined" && typeof console.error === "function") {
    console.error(message);
  }
  try {
    throw new Error(message);
  } catch (e) {
  }
}
function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  const reducerKeys = Object.keys(reducers);
  const argumentName = action && action.type === actionTypes_default.INIT ? "preloadedState argument passed to createStore" : "previous state received by the reducer";
  if (reducerKeys.length === 0) {
    return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
  }
  if (!isPlainObject(inputState)) {
    return `The ${argumentName} has unexpected type of "${kindOf(inputState)}". Expected argument to be an object with the following keys: "${reducerKeys.join('", "')}"`;
  }
  const unexpectedKeys = Object.keys(inputState).filter((key) => !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key]);
  unexpectedKeys.forEach((key) => {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === actionTypes_default.REPLACE)
    return;
  if (unexpectedKeys.length > 0) {
    return `Unexpected ${unexpectedKeys.length > 1 ? "keys" : "key"} "${unexpectedKeys.join('", "')}" found in ${argumentName}. Expected to find one of the known reducer keys instead: "${reducerKeys.join('", "')}". Unexpected keys will be ignored.`;
  }
}
function assertReducerShape(reducers) {
  Object.keys(reducers).forEach((key) => {
    const reducer = reducers[key];
    const initialState = reducer(void 0, {
      type: actionTypes_default.INIT
    });
    if (typeof initialState === "undefined") {
      throw new Error(false ? formatProdErrorMessage(12) : `The slice reducer for key "${key}" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`);
    }
    if (typeof reducer(void 0, {
      type: actionTypes_default.PROBE_UNKNOWN_ACTION()
    }) === "undefined") {
      throw new Error(false ? formatProdErrorMessage(13) : `The slice reducer for key "${key}" returned undefined when probed with a random type. Don't try to handle '${actionTypes_default.INIT}' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.`);
    }
  });
}
function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);
  const finalReducers = {};
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i];
    if (true) {
      if (typeof reducers[key] === "undefined") {
        warning(`No reducer provided for key "${key}"`);
      }
    }
    if (typeof reducers[key] === "function") {
      finalReducers[key] = reducers[key];
    }
  }
  const finalReducerKeys = Object.keys(finalReducers);
  let unexpectedKeyCache;
  if (true) {
    unexpectedKeyCache = {};
  }
  let shapeAssertionError;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }
  return function combination(state = {}, action) {
    if (shapeAssertionError) {
      throw shapeAssertionError;
    }
    if (true) {
      const warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        warning(warningMessage);
      }
    }
    let hasChanged = false;
    const nextState = {};
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i];
      const reducer = finalReducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === "undefined") {
        const actionType = action && action.type;
        throw new Error(false ? formatProdErrorMessage(14) : `When called with an action of type ${actionType ? `"${String(actionType)}"` : "(unknown type)"}, the slice reducer for key "${key}" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.`);
      }
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}
function bindActionCreator(actionCreator, dispatch) {
  return function(...args) {
    return dispatch(actionCreator.apply(this, args));
  };
}
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === "function") {
    return bindActionCreator(actionCreators, dispatch);
  }
  if (typeof actionCreators !== "object" || actionCreators === null) {
    throw new Error(false ? formatProdErrorMessage(16) : `bindActionCreators expected an object or a function, but instead received: '${kindOf(actionCreators)}'. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`);
  }
  const boundActionCreators = {};
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key];
    if (typeof actionCreator === "function") {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}
function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
function applyMiddleware(...middlewares) {
  return (createStore2) => (reducer, preloadedState) => {
    const store = createStore2(reducer, preloadedState);
    let dispatch = () => {
      throw new Error(false ? formatProdErrorMessage(15) : "Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.");
    };
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args)
    };
    const chain = middlewares.map((middleware) => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);
    return {
      ...store,
      dispatch
    };
  };
}

// node_modules/immer/dist/immer.mjs
var NOTHING = Symbol.for("immer-nothing");
var DRAFTABLE = Symbol.for("immer-draftable");
var DRAFT_STATE = Symbol.for("immer-state");
var errors = true ? [
  // All error codes, starting by 0:
  function(plugin) {
    return `The plugin for '${plugin}' has not been loaded into Immer. To enable the plugin, import and call \`enable${plugin}()\` when initializing your application.`;
  },
  function(thing) {
    return `produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${thing}'`;
  },
  "This object has been frozen and should not be mutated",
  function(data) {
    return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + data;
  },
  "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
  "Immer forbids circular references",
  "The first or second argument to `produce` must be a function",
  "The third argument to `produce` must be a function or undefined",
  "First argument to `createDraft` must be a plain object, an array, or an immerable object",
  "First argument to `finishDraft` must be a draft returned by `createDraft`",
  function(thing) {
    return `'current' expects a draft, got: ${thing}`;
  },
  "Object.defineProperty() cannot be used on an Immer draft",
  "Object.setPrototypeOf() cannot be used on an Immer draft",
  "Immer only supports deleting array indices",
  "Immer only supports setting array indices and the 'length' property",
  function(thing) {
    return `'original' expects a draft, got: ${thing}`;
  }
  // Note: if more errors are added, the errorOffset in Patches.ts should be increased
  // See Patches.ts for additional errors
] : [];
function die(error, ...args) {
  if (true) {
    const e = errors[error];
    const msg = typeof e === "function" ? e.apply(null, args) : e;
    throw new Error(`[Immer] ${msg}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${error}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var getPrototypeOf = Object.getPrototypeOf;
function isDraft(value) {
  return !!value && !!value[DRAFT_STATE];
}
function isDraftable(value) {
  var _a;
  if (!value)
    return false;
  return isPlainObject2(value) || Array.isArray(value) || !!value[DRAFTABLE] || !!((_a = value.constructor) == null ? void 0 : _a[DRAFTABLE]) || isMap(value) || isSet(value);
}
var objectCtorString = Object.prototype.constructor.toString();
function isPlainObject2(value) {
  if (!value || typeof value !== "object")
    return false;
  const proto2 = getPrototypeOf(value);
  if (proto2 === null) {
    return true;
  }
  const Ctor = Object.hasOwnProperty.call(proto2, "constructor") && proto2.constructor;
  if (Ctor === Object)
    return true;
  return typeof Ctor == "function" && Function.toString.call(Ctor) === objectCtorString;
}
function original(value) {
  if (!isDraft(value))
    die(15, value);
  return value[DRAFT_STATE].base_;
}
function each(obj, iter) {
  if (getArchtype(obj) === 0) {
    Object.entries(obj).forEach(([key, value]) => {
      iter(key, value, obj);
    });
  } else {
    obj.forEach((entry, index) => iter(index, entry, obj));
  }
}
function getArchtype(thing) {
  const state = thing[DRAFT_STATE];
  return state ? state.type_ : Array.isArray(thing) ? 1 : isMap(thing) ? 2 : isSet(thing) ? 3 : 0;
}
function has(thing, prop) {
  return getArchtype(thing) === 2 ? thing.has(prop) : Object.prototype.hasOwnProperty.call(thing, prop);
}
function get(thing, prop) {
  return getArchtype(thing) === 2 ? thing.get(prop) : thing[prop];
}
function set(thing, propOrOldValue, value) {
  const t = getArchtype(thing);
  if (t === 2)
    thing.set(propOrOldValue, value);
  else if (t === 3) {
    thing.add(value);
  } else
    thing[propOrOldValue] = value;
}
function is(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
function isMap(target) {
  return target instanceof Map;
}
function isSet(target) {
  return target instanceof Set;
}
function latest(state) {
  return state.copy_ || state.base_;
}
function shallowCopy(base, strict) {
  if (isMap(base)) {
    return new Map(base);
  }
  if (isSet(base)) {
    return new Set(base);
  }
  if (Array.isArray(base))
    return Array.prototype.slice.call(base);
  if (!strict && isPlainObject2(base)) {
    if (!getPrototypeOf(base)) {
      const obj = /* @__PURE__ */ Object.create(null);
      return Object.assign(obj, base);
    }
    return { ...base };
  }
  const descriptors = Object.getOwnPropertyDescriptors(base);
  delete descriptors[DRAFT_STATE];
  let keys = Reflect.ownKeys(descriptors);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const desc = descriptors[key];
    if (desc.writable === false) {
      desc.writable = true;
      desc.configurable = true;
    }
    if (desc.get || desc.set)
      descriptors[key] = {
        configurable: true,
        writable: true,
        // could live with !!desc.set as well here...
        enumerable: desc.enumerable,
        value: base[key]
      };
  }
  return Object.create(getPrototypeOf(base), descriptors);
}
function freeze(obj, deep = false) {
  if (isFrozen(obj) || isDraft(obj) || !isDraftable(obj))
    return obj;
  if (getArchtype(obj) > 1) {
    obj.set = obj.add = obj.clear = obj.delete = dontMutateFrozenCollections;
  }
  Object.freeze(obj);
  if (deep)
    each(obj, (_key, value) => freeze(value, true), true);
  return obj;
}
function dontMutateFrozenCollections() {
  die(2);
}
function isFrozen(obj) {
  return Object.isFrozen(obj);
}
var plugins = {};
function getPlugin(pluginKey) {
  const plugin = plugins[pluginKey];
  if (!plugin) {
    die(0, pluginKey);
  }
  return plugin;
}
function loadPlugin(pluginKey, implementation) {
  if (!plugins[pluginKey])
    plugins[pluginKey] = implementation;
}
var currentScope;
function getCurrentScope() {
  return currentScope;
}
function createScope(parent_, immer_) {
  return {
    drafts_: [],
    parent_,
    immer_,
    // Whenever the modified draft contains a draft from another scope, we
    // need to prevent auto-freezing so the unowned draft can be finalized.
    canAutoFreeze_: true,
    unfinalizedDrafts_: 0
  };
}
function usePatchesInScope(scope, patchListener) {
  if (patchListener) {
    getPlugin("Patches");
    scope.patches_ = [];
    scope.inversePatches_ = [];
    scope.patchListener_ = patchListener;
  }
}
function revokeScope(scope) {
  leaveScope(scope);
  scope.drafts_.forEach(revokeDraft);
  scope.drafts_ = null;
}
function leaveScope(scope) {
  if (scope === currentScope) {
    currentScope = scope.parent_;
  }
}
function enterScope(immer2) {
  return currentScope = createScope(currentScope, immer2);
}
function revokeDraft(draft) {
  const state = draft[DRAFT_STATE];
  if (state.type_ === 0 || state.type_ === 1)
    state.revoke_();
  else
    state.revoked_ = true;
}
function processResult(result, scope) {
  scope.unfinalizedDrafts_ = scope.drafts_.length;
  const baseDraft = scope.drafts_[0];
  const isReplaced = result !== void 0 && result !== baseDraft;
  if (isReplaced) {
    if (baseDraft[DRAFT_STATE].modified_) {
      revokeScope(scope);
      die(4);
    }
    if (isDraftable(result)) {
      result = finalize(scope, result);
      if (!scope.parent_)
        maybeFreeze(scope, result);
    }
    if (scope.patches_) {
      getPlugin("Patches").generateReplacementPatches_(
        baseDraft[DRAFT_STATE].base_,
        result,
        scope.patches_,
        scope.inversePatches_
      );
    }
  } else {
    result = finalize(scope, baseDraft, []);
  }
  revokeScope(scope);
  if (scope.patches_) {
    scope.patchListener_(scope.patches_, scope.inversePatches_);
  }
  return result !== NOTHING ? result : void 0;
}
function finalize(rootScope, value, path) {
  if (isFrozen(value))
    return value;
  const state = value[DRAFT_STATE];
  if (!state) {
    each(
      value,
      (key, childValue) => finalizeProperty(rootScope, state, value, key, childValue, path),
      true
      // See #590, don't recurse into non-enumerable of non drafted objects
    );
    return value;
  }
  if (state.scope_ !== rootScope)
    return value;
  if (!state.modified_) {
    maybeFreeze(rootScope, state.base_, true);
    return state.base_;
  }
  if (!state.finalized_) {
    state.finalized_ = true;
    state.scope_.unfinalizedDrafts_--;
    const result = state.copy_;
    let resultEach = result;
    let isSet2 = false;
    if (state.type_ === 3) {
      resultEach = new Set(result);
      result.clear();
      isSet2 = true;
    }
    each(
      resultEach,
      (key, childValue) => finalizeProperty(rootScope, state, result, key, childValue, path, isSet2)
    );
    maybeFreeze(rootScope, result, false);
    if (path && rootScope.patches_) {
      getPlugin("Patches").generatePatches_(
        state,
        path,
        rootScope.patches_,
        rootScope.inversePatches_
      );
    }
  }
  return state.copy_;
}
function finalizeProperty(rootScope, parentState, targetObject, prop, childValue, rootPath, targetIsSet) {
  if (childValue === targetObject)
    die(5);
  if (isDraft(childValue)) {
    const path = rootPath && parentState && parentState.type_ !== 3 && // Set objects are atomic since they have no keys.
    !has(parentState.assigned_, prop) ? rootPath.concat(prop) : void 0;
    const res = finalize(rootScope, childValue, path);
    set(targetObject, prop, res);
    if (isDraft(res)) {
      rootScope.canAutoFreeze_ = false;
    } else
      return;
  } else if (targetIsSet) {
    targetObject.add(childValue);
  }
  if (isDraftable(childValue) && !isFrozen(childValue)) {
    if (!rootScope.immer_.autoFreeze_ && rootScope.unfinalizedDrafts_ < 1) {
      return;
    }
    finalize(rootScope, childValue);
    if (!parentState || !parentState.scope_.parent_)
      maybeFreeze(rootScope, childValue);
  }
}
function maybeFreeze(scope, value, deep = false) {
  if (!scope.parent_ && scope.immer_.autoFreeze_ && scope.canAutoFreeze_) {
    freeze(value, deep);
  }
}
function createProxyProxy(base, parent) {
  const isArray = Array.isArray(base);
  const state = {
    type_: isArray ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: parent ? parent.scope_ : getCurrentScope(),
    // True for both shallow and deep changes.
    modified_: false,
    // Used during finalization.
    finalized_: false,
    // Track which properties have been assigned (true) or deleted (false).
    assigned_: {},
    // The parent draft state.
    parent_: parent,
    // The base state.
    base_: base,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: false
  };
  let target = state;
  let traps = objectTraps;
  if (isArray) {
    target = [state];
    traps = arrayTraps;
  }
  const { revoke, proxy } = Proxy.revocable(target, traps);
  state.draft_ = proxy;
  state.revoke_ = revoke;
  return proxy;
}
var objectTraps = {
  get(state, prop) {
    if (prop === DRAFT_STATE)
      return state;
    const source = latest(state);
    if (!has(source, prop)) {
      return readPropFromProto(state, source, prop);
    }
    const value = source[prop];
    if (state.finalized_ || !isDraftable(value)) {
      return value;
    }
    if (value === peek(state.base_, prop)) {
      prepareCopy(state);
      return state.copy_[prop] = createProxy(value, state);
    }
    return value;
  },
  has(state, prop) {
    return prop in latest(state);
  },
  ownKeys(state) {
    return Reflect.ownKeys(latest(state));
  },
  set(state, prop, value) {
    const desc = getDescriptorFromProto(latest(state), prop);
    if (desc == null ? void 0 : desc.set) {
      desc.set.call(state.draft_, value);
      return true;
    }
    if (!state.modified_) {
      const current2 = peek(latest(state), prop);
      const currentState = current2 == null ? void 0 : current2[DRAFT_STATE];
      if (currentState && currentState.base_ === value) {
        state.copy_[prop] = value;
        state.assigned_[prop] = false;
        return true;
      }
      if (is(value, current2) && (value !== void 0 || has(state.base_, prop)))
        return true;
      prepareCopy(state);
      markChanged(state);
    }
    if (state.copy_[prop] === value && // special case: handle new props with value 'undefined'
    (value !== void 0 || prop in state.copy_) || // special case: NaN
    Number.isNaN(value) && Number.isNaN(state.copy_[prop]))
      return true;
    state.copy_[prop] = value;
    state.assigned_[prop] = true;
    return true;
  },
  deleteProperty(state, prop) {
    if (peek(state.base_, prop) !== void 0 || prop in state.base_) {
      state.assigned_[prop] = false;
      prepareCopy(state);
      markChanged(state);
    } else {
      delete state.assigned_[prop];
    }
    if (state.copy_) {
      delete state.copy_[prop];
    }
    return true;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(state, prop) {
    const owner = latest(state);
    const desc = Reflect.getOwnPropertyDescriptor(owner, prop);
    if (!desc)
      return desc;
    return {
      writable: true,
      configurable: state.type_ !== 1 || prop !== "length",
      enumerable: desc.enumerable,
      value: owner[prop]
    };
  },
  defineProperty() {
    die(11);
  },
  getPrototypeOf(state) {
    return getPrototypeOf(state.base_);
  },
  setPrototypeOf() {
    die(12);
  }
};
var arrayTraps = {};
each(objectTraps, (key, fn) => {
  arrayTraps[key] = function() {
    arguments[0] = arguments[0][0];
    return fn.apply(this, arguments);
  };
});
arrayTraps.deleteProperty = function(state, prop) {
  if (isNaN(parseInt(prop)))
    die(13);
  return arrayTraps.set.call(this, state, prop, void 0);
};
arrayTraps.set = function(state, prop, value) {
  if (prop !== "length" && isNaN(parseInt(prop)))
    die(14);
  return objectTraps.set.call(this, state[0], prop, value, state[0]);
};
function peek(draft, prop) {
  const state = draft[DRAFT_STATE];
  const source = state ? latest(state) : draft;
  return source[prop];
}
function readPropFromProto(state, source, prop) {
  var _a;
  const desc = getDescriptorFromProto(source, prop);
  return desc ? `value` in desc ? desc.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    (_a = desc.get) == null ? void 0 : _a.call(state.draft_)
  ) : void 0;
}
function getDescriptorFromProto(source, prop) {
  if (!(prop in source))
    return void 0;
  let proto2 = getPrototypeOf(source);
  while (proto2) {
    const desc = Object.getOwnPropertyDescriptor(proto2, prop);
    if (desc)
      return desc;
    proto2 = getPrototypeOf(proto2);
  }
  return void 0;
}
function markChanged(state) {
  if (!state.modified_) {
    state.modified_ = true;
    if (state.parent_) {
      markChanged(state.parent_);
    }
  }
}
function prepareCopy(state) {
  if (!state.copy_) {
    state.copy_ = shallowCopy(
      state.base_,
      state.scope_.immer_.useStrictShallowCopy_
    );
  }
}
var Immer2 = class {
  constructor(config) {
    this.autoFreeze_ = true;
    this.useStrictShallowCopy_ = false;
    this.produce = (base, recipe, patchListener) => {
      if (typeof base === "function" && typeof recipe !== "function") {
        const defaultBase = recipe;
        recipe = base;
        const self = this;
        return function curriedProduce(base2 = defaultBase, ...args) {
          return self.produce(base2, (draft) => recipe.call(this, draft, ...args));
        };
      }
      if (typeof recipe !== "function")
        die(6);
      if (patchListener !== void 0 && typeof patchListener !== "function")
        die(7);
      let result;
      if (isDraftable(base)) {
        const scope = enterScope(this);
        const proxy = createProxy(base, void 0);
        let hasError = true;
        try {
          result = recipe(proxy);
          hasError = false;
        } finally {
          if (hasError)
            revokeScope(scope);
          else
            leaveScope(scope);
        }
        usePatchesInScope(scope, patchListener);
        return processResult(result, scope);
      } else if (!base || typeof base !== "object") {
        result = recipe(base);
        if (result === void 0)
          result = base;
        if (result === NOTHING)
          result = void 0;
        if (this.autoFreeze_)
          freeze(result, true);
        if (patchListener) {
          const p = [];
          const ip = [];
          getPlugin("Patches").generateReplacementPatches_(base, result, p, ip);
          patchListener(p, ip);
        }
        return result;
      } else
        die(1, base);
    };
    this.produceWithPatches = (base, recipe) => {
      if (typeof base === "function") {
        return (state, ...args) => this.produceWithPatches(state, (draft) => base(draft, ...args));
      }
      let patches, inversePatches;
      const result = this.produce(base, recipe, (p, ip) => {
        patches = p;
        inversePatches = ip;
      });
      return [result, patches, inversePatches];
    };
    if (typeof (config == null ? void 0 : config.autoFreeze) === "boolean")
      this.setAutoFreeze(config.autoFreeze);
    if (typeof (config == null ? void 0 : config.useStrictShallowCopy) === "boolean")
      this.setUseStrictShallowCopy(config.useStrictShallowCopy);
  }
  createDraft(base) {
    if (!isDraftable(base))
      die(8);
    if (isDraft(base))
      base = current(base);
    const scope = enterScope(this);
    const proxy = createProxy(base, void 0);
    proxy[DRAFT_STATE].isManual_ = true;
    leaveScope(scope);
    return proxy;
  }
  finishDraft(draft, patchListener) {
    const state = draft && draft[DRAFT_STATE];
    if (!state || !state.isManual_)
      die(9);
    const { scope_: scope } = state;
    usePatchesInScope(scope, patchListener);
    return processResult(void 0, scope);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(value) {
    this.autoFreeze_ = value;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(value) {
    this.useStrictShallowCopy_ = value;
  }
  applyPatches(base, patches) {
    let i;
    for (i = patches.length - 1; i >= 0; i--) {
      const patch = patches[i];
      if (patch.path.length === 0 && patch.op === "replace") {
        base = patch.value;
        break;
      }
    }
    if (i > -1) {
      patches = patches.slice(i + 1);
    }
    const applyPatchesImpl = getPlugin("Patches").applyPatches_;
    if (isDraft(base)) {
      return applyPatchesImpl(base, patches);
    }
    return this.produce(
      base,
      (draft) => applyPatchesImpl(draft, patches)
    );
  }
};
function createProxy(value, parent) {
  const draft = isMap(value) ? getPlugin("MapSet").proxyMap_(value, parent) : isSet(value) ? getPlugin("MapSet").proxySet_(value, parent) : createProxyProxy(value, parent);
  const scope = parent ? parent.scope_ : getCurrentScope();
  scope.drafts_.push(draft);
  return draft;
}
function current(value) {
  if (!isDraft(value))
    die(10, value);
  return currentImpl(value);
}
function currentImpl(value) {
  if (!isDraftable(value) || isFrozen(value))
    return value;
  const state = value[DRAFT_STATE];
  let copy;
  if (state) {
    if (!state.modified_)
      return state.base_;
    state.finalized_ = true;
    copy = shallowCopy(value, state.scope_.immer_.useStrictShallowCopy_);
  } else {
    copy = shallowCopy(value, true);
  }
  each(copy, (key, childValue) => {
    set(copy, key, currentImpl(childValue));
  });
  if (state) {
    state.finalized_ = false;
  }
  return copy;
}
function enablePatches() {
  const errorOffset = 16;
  if (true) {
    errors.push(
      'Sets cannot have "replace" patches.',
      function(op) {
        return "Unsupported patch operation: " + op;
      },
      function(path) {
        return "Cannot apply patch, path doesn't resolve: " + path;
      },
      "Patching reserved attributes like __proto__, prototype and constructor is not allowed"
    );
  }
  const REPLACE = "replace";
  const ADD = "add";
  const REMOVE = "remove";
  function generatePatches_(state, basePath, patches, inversePatches) {
    switch (state.type_) {
      case 0:
      case 2:
        return generatePatchesFromAssigned(
          state,
          basePath,
          patches,
          inversePatches
        );
      case 1:
        return generateArrayPatches(state, basePath, patches, inversePatches);
      case 3:
        return generateSetPatches(
          state,
          basePath,
          patches,
          inversePatches
        );
    }
  }
  function generateArrayPatches(state, basePath, patches, inversePatches) {
    let { base_, assigned_ } = state;
    let copy_ = state.copy_;
    if (copy_.length < base_.length) {
      ;
      [base_, copy_] = [copy_, base_];
      [patches, inversePatches] = [inversePatches, patches];
    }
    for (let i = 0; i < base_.length; i++) {
      if (assigned_[i] && copy_[i] !== base_[i]) {
        const path = basePath.concat([i]);
        patches.push({
          op: REPLACE,
          path,
          // Need to maybe clone it, as it can in fact be the original value
          // due to the base/copy inversion at the start of this function
          value: clonePatchValueIfNeeded(copy_[i])
        });
        inversePatches.push({
          op: REPLACE,
          path,
          value: clonePatchValueIfNeeded(base_[i])
        });
      }
    }
    for (let i = base_.length; i < copy_.length; i++) {
      const path = basePath.concat([i]);
      patches.push({
        op: ADD,
        path,
        // Need to maybe clone it, as it can in fact be the original value
        // due to the base/copy inversion at the start of this function
        value: clonePatchValueIfNeeded(copy_[i])
      });
    }
    for (let i = copy_.length - 1; base_.length <= i; --i) {
      const path = basePath.concat([i]);
      inversePatches.push({
        op: REMOVE,
        path
      });
    }
  }
  function generatePatchesFromAssigned(state, basePath, patches, inversePatches) {
    const { base_, copy_ } = state;
    each(state.assigned_, (key, assignedValue) => {
      const origValue = get(base_, key);
      const value = get(copy_, key);
      const op = !assignedValue ? REMOVE : has(base_, key) ? REPLACE : ADD;
      if (origValue === value && op === REPLACE)
        return;
      const path = basePath.concat(key);
      patches.push(op === REMOVE ? { op, path } : { op, path, value });
      inversePatches.push(
        op === ADD ? { op: REMOVE, path } : op === REMOVE ? { op: ADD, path, value: clonePatchValueIfNeeded(origValue) } : { op: REPLACE, path, value: clonePatchValueIfNeeded(origValue) }
      );
    });
  }
  function generateSetPatches(state, basePath, patches, inversePatches) {
    let { base_, copy_ } = state;
    let i = 0;
    base_.forEach((value) => {
      if (!copy_.has(value)) {
        const path = basePath.concat([i]);
        patches.push({
          op: REMOVE,
          path,
          value
        });
        inversePatches.unshift({
          op: ADD,
          path,
          value
        });
      }
      i++;
    });
    i = 0;
    copy_.forEach((value) => {
      if (!base_.has(value)) {
        const path = basePath.concat([i]);
        patches.push({
          op: ADD,
          path,
          value
        });
        inversePatches.unshift({
          op: REMOVE,
          path,
          value
        });
      }
      i++;
    });
  }
  function generateReplacementPatches_(baseValue, replacement, patches, inversePatches) {
    patches.push({
      op: REPLACE,
      path: [],
      value: replacement === NOTHING ? void 0 : replacement
    });
    inversePatches.push({
      op: REPLACE,
      path: [],
      value: baseValue
    });
  }
  function applyPatches_(draft, patches) {
    patches.forEach((patch) => {
      const { path, op } = patch;
      let base = draft;
      for (let i = 0; i < path.length - 1; i++) {
        const parentType = getArchtype(base);
        let p = path[i];
        if (typeof p !== "string" && typeof p !== "number") {
          p = "" + p;
        }
        if ((parentType === 0 || parentType === 1) && (p === "__proto__" || p === "constructor"))
          die(errorOffset + 3);
        if (typeof base === "function" && p === "prototype")
          die(errorOffset + 3);
        base = get(base, p);
        if (typeof base !== "object")
          die(errorOffset + 2, path.join("/"));
      }
      const type = getArchtype(base);
      const value = deepClonePatchValue(patch.value);
      const key = path[path.length - 1];
      switch (op) {
        case REPLACE:
          switch (type) {
            case 2:
              return base.set(key, value);
            case 3:
              die(errorOffset);
            default:
              return base[key] = value;
          }
        case ADD:
          switch (type) {
            case 1:
              return key === "-" ? base.push(value) : base.splice(key, 0, value);
            case 2:
              return base.set(key, value);
            case 3:
              return base.add(value);
            default:
              return base[key] = value;
          }
        case REMOVE:
          switch (type) {
            case 1:
              return base.splice(key, 1);
            case 2:
              return base.delete(key);
            case 3:
              return base.delete(patch.value);
            default:
              return delete base[key];
          }
        default:
          die(errorOffset + 1, op);
      }
    });
    return draft;
  }
  function deepClonePatchValue(obj) {
    if (!isDraftable(obj))
      return obj;
    if (Array.isArray(obj))
      return obj.map(deepClonePatchValue);
    if (isMap(obj))
      return new Map(
        Array.from(obj.entries()).map(([k, v]) => [k, deepClonePatchValue(v)])
      );
    if (isSet(obj))
      return new Set(Array.from(obj).map(deepClonePatchValue));
    const cloned = Object.create(getPrototypeOf(obj));
    for (const key in obj)
      cloned[key] = deepClonePatchValue(obj[key]);
    if (has(obj, DRAFTABLE))
      cloned[DRAFTABLE] = obj[DRAFTABLE];
    return cloned;
  }
  function clonePatchValueIfNeeded(obj) {
    if (isDraft(obj)) {
      return deepClonePatchValue(obj);
    } else
      return obj;
  }
  loadPlugin("Patches", {
    applyPatches_,
    generatePatches_,
    generateReplacementPatches_
  });
}
var immer = new Immer2();
var produce = immer.produce;
var produceWithPatches = immer.produceWithPatches.bind(
  immer
);
var setAutoFreeze = immer.setAutoFreeze.bind(immer);
var setUseStrictShallowCopy = immer.setUseStrictShallowCopy.bind(immer);
var applyPatches = immer.applyPatches.bind(immer);
var createDraft = immer.createDraft.bind(immer);
var finishDraft = immer.finishDraft.bind(immer);

// node_modules/reselect/dist/reselect.mjs
var NOT_FOUND = "NOT_FOUND";
function createSingletonCache(equals) {
  let entry;
  return {
    get(key) {
      if (entry && equals(entry.key, key)) {
        return entry.value;
      }
      return NOT_FOUND;
    },
    put(key, value) {
      entry = { key, value };
    },
    getEntries() {
      return entry ? [entry] : [];
    },
    clear() {
      entry = void 0;
    }
  };
}
function createLruCache(maxSize, equals) {
  let entries = [];
  function get2(key) {
    const cacheIndex = entries.findIndex((entry) => equals(key, entry.key));
    if (cacheIndex > -1) {
      const entry = entries[cacheIndex];
      if (cacheIndex > 0) {
        entries.splice(cacheIndex, 1);
        entries.unshift(entry);
      }
      return entry.value;
    }
    return NOT_FOUND;
  }
  function put(key, value) {
    if (get2(key) === NOT_FOUND) {
      entries.unshift({ key, value });
      if (entries.length > maxSize) {
        entries.pop();
      }
    }
  }
  function getEntries() {
    return entries;
  }
  function clear() {
    entries = [];
  }
  return { get: get2, put, getEntries, clear };
}
var defaultEqualityCheck = (a, b) => {
  return a === b;
};
function createCacheKeyComparator(equalityCheck) {
  return function areArgumentsShallowlyEqual(prev, next) {
    if (prev === null || next === null || prev.length !== next.length) {
      return false;
    }
    const length = prev.length;
    for (let i = 0; i < length; i++) {
      if (!equalityCheck(prev[i], next[i])) {
        return false;
      }
    }
    return true;
  };
}
function defaultMemoize(func, equalityCheckOrOptions) {
  const providedOptions = typeof equalityCheckOrOptions === "object" ? equalityCheckOrOptions : { equalityCheck: equalityCheckOrOptions };
  const {
    equalityCheck = defaultEqualityCheck,
    maxSize = 1,
    resultEqualityCheck
  } = providedOptions;
  const comparator = createCacheKeyComparator(equalityCheck);
  const cache = maxSize === 1 ? createSingletonCache(comparator) : createLruCache(maxSize, comparator);
  function memoized() {
    let value = cache.get(arguments);
    if (value === NOT_FOUND) {
      value = func.apply(null, arguments);
      if (resultEqualityCheck) {
        const entries = cache.getEntries();
        const matchingEntry = entries.find(
          (entry) => resultEqualityCheck(entry.value, value)
        );
        if (matchingEntry) {
          value = matchingEntry.value;
        }
      }
      cache.put(arguments, value);
    }
    return value;
  }
  memoized.clearCache = () => cache.clear();
  return memoized;
}
function assert(condition, msg = "Assertion failed!") {
  if (!condition) {
    console.error(msg);
    throw new Error(msg);
  }
}
var $REVISION = 0;
var CURRENT_TRACKER = null;
var Cell = class {
  constructor(initialValue, isEqual = tripleEq) {
    __publicField(this, "revision", $REVISION);
    __publicField(this, "_value");
    __publicField(this, "_lastValue");
    __publicField(this, "_isEqual", tripleEq);
    this._value = this._lastValue = initialValue;
    this._isEqual = isEqual;
  }
  // Whenever a storage value is read, it'll add itself to the current tracker if
  // one exists, entangling its state with that cache.
  get value() {
    CURRENT_TRACKER == null ? void 0 : CURRENT_TRACKER.add(this);
    return this._value;
  }
  // Whenever a storage value is updated, we bump the global revision clock,
  // assign the revision for this storage to the new value, _and_ we schedule a
  // rerender. This is important, and it's what makes autotracking  _pull_
  // based. We don't actively tell the caches which depend on the storage that
  // anything has happened. Instead, we recompute the caches when needed.
  set value(newValue) {
    if (this.value === newValue)
      return;
    this._value = newValue;
    this.revision = ++$REVISION;
  }
};
function tripleEq(a, b) {
  return a === b;
}
var TrackingCache = class {
  constructor(fn) {
    __publicField(this, "_cachedValue");
    __publicField(this, "_cachedRevision", -1);
    __publicField(this, "_deps", []);
    __publicField(this, "hits", 0);
    __publicField(this, "fn");
    this.fn = fn;
  }
  clear() {
    this._cachedValue = void 0;
    this._cachedRevision = -1;
    this._deps = [];
    this.hits = 0;
  }
  get value() {
    if (this.revision > this._cachedRevision) {
      const { fn } = this;
      const currentTracker = /* @__PURE__ */ new Set();
      const prevTracker = CURRENT_TRACKER;
      CURRENT_TRACKER = currentTracker;
      this._cachedValue = fn();
      CURRENT_TRACKER = prevTracker;
      this.hits++;
      this._deps = Array.from(currentTracker);
      this._cachedRevision = this.revision;
    }
    CURRENT_TRACKER == null ? void 0 : CURRENT_TRACKER.add(this);
    return this._cachedValue;
  }
  get revision() {
    return Math.max(...this._deps.map((d) => d.revision), 0);
  }
};
function getValue(cell) {
  if (!(cell instanceof Cell)) {
    console.warn("Not a valid cell! ", cell);
  }
  return cell.value;
}
function setValue(storage, value) {
  assert(
    storage instanceof Cell,
    "setValue must be passed a tracked store created with `createStorage`."
  );
  storage.value = storage._lastValue = value;
}
function createCell(initialValue, isEqual = tripleEq) {
  return new Cell(initialValue, isEqual);
}
function createCache(fn) {
  assert(
    typeof fn === "function",
    "the first parameter to `createCache` must be a function"
  );
  return new TrackingCache(fn);
}
var neverEq = (a, b) => false;
function createTag() {
  return createCell(null, neverEq);
}
function dirtyTag(tag, value) {
  setValue(tag, value);
}
var consumeCollection = (node) => {
  let tag = node.collectionTag;
  if (tag === null) {
    tag = node.collectionTag = createTag();
  }
  getValue(tag);
};
var dirtyCollection = (node) => {
  const tag = node.collectionTag;
  if (tag !== null) {
    dirtyTag(tag, null);
  }
};
var REDUX_PROXY_LABEL = Symbol();
var nextId = 0;
var proto = Object.getPrototypeOf({});
var ObjectTreeNode = class {
  constructor(value) {
    __publicField(this, "proxy", new Proxy(this, objectProxyHandler));
    __publicField(this, "tag", createTag());
    __publicField(this, "tags", {});
    __publicField(this, "children", {});
    __publicField(this, "collectionTag", null);
    __publicField(this, "id", nextId++);
    this.value = value;
    this.value = value;
    this.tag.value = value;
  }
};
var objectProxyHandler = {
  get(node, key) {
    function calculateResult() {
      const { value } = node;
      const childValue = Reflect.get(value, key);
      if (typeof key === "symbol") {
        return childValue;
      }
      if (key in proto) {
        return childValue;
      }
      if (typeof childValue === "object" && childValue !== null) {
        let childNode = node.children[key];
        if (childNode === void 0) {
          childNode = node.children[key] = createNode(childValue);
        }
        if (childNode.tag) {
          getValue(childNode.tag);
        }
        return childNode.proxy;
      } else {
        let tag = node.tags[key];
        if (tag === void 0) {
          tag = node.tags[key] = createTag();
          tag.value = childValue;
        }
        getValue(tag);
        return childValue;
      }
    }
    const res = calculateResult();
    return res;
  },
  ownKeys(node) {
    consumeCollection(node);
    return Reflect.ownKeys(node.value);
  },
  getOwnPropertyDescriptor(node, prop) {
    return Reflect.getOwnPropertyDescriptor(node.value, prop);
  },
  has(node, prop) {
    return Reflect.has(node.value, prop);
  }
};
var ArrayTreeNode = class {
  constructor(value) {
    __publicField(this, "proxy", new Proxy([this], arrayProxyHandler));
    __publicField(this, "tag", createTag());
    __publicField(this, "tags", {});
    __publicField(this, "children", {});
    __publicField(this, "collectionTag", null);
    __publicField(this, "id", nextId++);
    this.value = value;
    this.value = value;
    this.tag.value = value;
  }
};
var arrayProxyHandler = {
  get([node], key) {
    if (key === "length") {
      consumeCollection(node);
    }
    return objectProxyHandler.get(node, key);
  },
  ownKeys([node]) {
    return objectProxyHandler.ownKeys(node);
  },
  getOwnPropertyDescriptor([node], prop) {
    return objectProxyHandler.getOwnPropertyDescriptor(node, prop);
  },
  has([node], prop) {
    return objectProxyHandler.has(node, prop);
  }
};
function createNode(value) {
  if (Array.isArray(value)) {
    return new ArrayTreeNode(value);
  }
  return new ObjectTreeNode(value);
}
function updateNode(node, newValue) {
  const { value, tags, children } = node;
  node.value = newValue;
  if (Array.isArray(value) && Array.isArray(newValue) && value.length !== newValue.length) {
    dirtyCollection(node);
  } else {
    if (value !== newValue) {
      let oldKeysSize = 0;
      let newKeysSize = 0;
      let anyKeysAdded = false;
      for (const _key in value) {
        oldKeysSize++;
      }
      for (const key in newValue) {
        newKeysSize++;
        if (!(key in value)) {
          anyKeysAdded = true;
          break;
        }
      }
      const isDifferent = anyKeysAdded || oldKeysSize !== newKeysSize;
      if (isDifferent) {
        dirtyCollection(node);
      }
    }
  }
  for (const key in tags) {
    const childValue = value[key];
    const newChildValue = newValue[key];
    if (childValue !== newChildValue) {
      dirtyCollection(node);
      dirtyTag(tags[key], newChildValue);
    }
    if (typeof newChildValue === "object" && newChildValue !== null) {
      delete tags[key];
    }
  }
  for (const key in children) {
    const childNode = children[key];
    const newChildValue = newValue[key];
    const childValue = childNode.value;
    if (childValue === newChildValue) {
      continue;
    } else if (typeof newChildValue === "object" && newChildValue !== null) {
      updateNode(childNode, newChildValue);
    } else {
      deleteNode(childNode);
      delete children[key];
    }
  }
}
function deleteNode(node) {
  if (node.tag) {
    dirtyTag(node.tag, null);
  }
  dirtyCollection(node);
  for (const key in node.tags) {
    dirtyTag(node.tags[key], null);
  }
  for (const key in node.children) {
    deleteNode(node.children[key]);
  }
}
function autotrackMemoize(func) {
  const node = createNode(
    []
  );
  let lastArgs = null;
  const shallowEqual = createCacheKeyComparator(defaultEqualityCheck);
  const cache = createCache(() => {
    const res = func.apply(null, node.proxy);
    return res;
  });
  function memoized() {
    if (!shallowEqual(lastArgs, arguments)) {
      updateNode(node, arguments);
      lastArgs = arguments;
    }
    return cache.value;
  }
  memoized.clearCache = () => cache.clear();
  return memoized;
}
var UNTERMINATED = 0;
var TERMINATED = 1;
function createCacheNode() {
  return {
    s: UNTERMINATED,
    // status, represents whether the cached computation returned a value or threw an error
    v: void 0,
    // value, either the cached result or an error, depending on s
    o: null,
    // object cache, a WeakMap where non-primitive arguments are stored
    p: null
    // primitive cache, a regular Map where primitive arguments are stored.
  };
}
function weakMapMemoize(func) {
  let fnNode = createCacheNode();
  function memoized() {
    let cacheNode = fnNode;
    for (let i = 0, l = arguments.length; i < l; i++) {
      const arg = arguments[i];
      if (typeof arg === "function" || typeof arg === "object" && arg !== null) {
        let objectCache = cacheNode.o;
        if (objectCache === null) {
          cacheNode.o = objectCache = /* @__PURE__ */ new WeakMap();
        }
        const objectNode = objectCache.get(arg);
        if (objectNode === void 0) {
          cacheNode = createCacheNode();
          objectCache.set(arg, cacheNode);
        } else {
          cacheNode = objectNode;
        }
      } else {
        let primitiveCache = cacheNode.p;
        if (primitiveCache === null) {
          cacheNode.p = primitiveCache = /* @__PURE__ */ new Map();
        }
        const primitiveNode = primitiveCache.get(arg);
        if (primitiveNode === void 0) {
          cacheNode = createCacheNode();
          primitiveCache.set(arg, cacheNode);
        } else {
          cacheNode = primitiveNode;
        }
      }
    }
    if (cacheNode.s === TERMINATED) {
      return cacheNode.v;
    }
    const result = func.apply(null, arguments);
    const terminatedNode = cacheNode;
    terminatedNode.s = TERMINATED;
    terminatedNode.v = result;
    return result;
  }
  memoized.clearCache = () => {
    fnNode = createCacheNode();
  };
  return memoized;
}
var globalStabilityCheck = "once";
function getDependencies(funcs) {
  const dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;
  if (!dependencies.every((dep) => typeof dep === "function")) {
    const dependencyTypes = dependencies.map(
      (dep) => typeof dep === "function" ? `function ${dep.name || "unnamed"}()` : typeof dep
    ).join(", ");
    throw new Error(
      `createSelector expects all input-selectors to be functions, but received the following types: [${dependencyTypes}]`
    );
  }
  return dependencies;
}
function createSelectorCreator(memoize, ...memoizeOptionsFromArgs) {
  const createSelector2 = (...funcs) => {
    let recomputations = 0;
    let lastResult;
    let directlyPassedOptions = {};
    let resultFunc = funcs.pop();
    if (typeof resultFunc === "object") {
      directlyPassedOptions = resultFunc;
      resultFunc = funcs.pop();
    }
    if (typeof resultFunc !== "function") {
      throw new Error(
        `createSelector expects an output function after the inputs, but received: [${typeof resultFunc}]`
      );
    }
    const { memoizeOptions = memoizeOptionsFromArgs, inputStabilityCheck } = directlyPassedOptions;
    const finalMemoizeOptions = Array.isArray(memoizeOptions) ? memoizeOptions : [memoizeOptions];
    const dependencies = getDependencies(funcs);
    const memoizedResultFunc = memoize(
      function recomputationWrapper() {
        recomputations++;
        return resultFunc.apply(null, arguments);
      },
      ...finalMemoizeOptions
    );
    const makeAnObject = memoize(
      // @ts-ignore
      () => ({}),
      ...finalMemoizeOptions
    );
    let firstRun = true;
    const selector = defaultMemoize(function dependenciesChecker() {
      const params = [];
      const { length } = dependencies;
      for (let i = 0; i < length; i++) {
        params.push(dependencies[i].apply(null, arguments));
      }
      const finalStabilityCheck = inputStabilityCheck ?? globalStabilityCheck;
      if (finalStabilityCheck === "always" || finalStabilityCheck === "once" && firstRun) {
        const paramsCopy = [];
        for (let i = 0; i < length; i++) {
          paramsCopy.push(dependencies[i].apply(null, arguments));
        }
        const equal = makeAnObject.apply(null, params) === makeAnObject.apply(null, paramsCopy);
        if (!equal) {
          console.warn(
            "An input selector returned a different result when passed same arguments.\nThis means your output selector will likely run more frequently than intended.\nAvoid returning a new reference inside your input selector, e.g.\n`createSelector([(arg1, arg2) => ({ arg1, arg2 })],(arg1, arg2) => {})`",
            {
              arguments,
              firstInputs: params,
              secondInputs: paramsCopy
            }
          );
        }
        if (firstRun)
          firstRun = false;
      }
      lastResult = memoizedResultFunc.apply(null, params);
      return lastResult;
    });
    Object.assign(selector, {
      resultFunc,
      memoizedResultFunc,
      dependencies,
      lastResult: () => lastResult,
      recomputations: () => recomputations,
      resetRecomputations: () => recomputations = 0
    });
    return selector;
  };
  return createSelector2;
}
var createSelector = createSelectorCreator(defaultMemoize);

// node_modules/redux-thunk/dist/redux-thunk.mjs
function createThunkMiddleware(extraArgument) {
  const middleware = ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState, extraArgument);
    }
    return next(action);
  };
  return middleware;
}
var thunk = createThunkMiddleware();
var withExtraArgument = createThunkMiddleware;

// node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs
var createDraftSafeSelectorCreator = (...args) => {
  const createSelector2 = createSelectorCreator(...args);
  return (...args2) => {
    const selector = createSelector2(...args2);
    const wrappedSelector = (value, ...rest) => selector(isDraft(value) ? current(value) : value, ...rest);
    return wrappedSelector;
  };
};
var createDraftSafeSelector = createDraftSafeSelectorCreator(defaultMemoize);
var composeWithDevTools = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length === 0)
    return void 0;
  if (typeof arguments[0] === "object")
    return compose;
  return compose.apply(null, arguments);
};
var devToolsEnhancer = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ : function() {
  return function(noop3) {
    return noop3;
  };
};
function isPlainObject3(value) {
  if (typeof value !== "object" || value === null)
    return false;
  let proto2 = Object.getPrototypeOf(value);
  if (proto2 === null)
    return true;
  let baseProto = proto2;
  while (Object.getPrototypeOf(baseProto) !== null) {
    baseProto = Object.getPrototypeOf(baseProto);
  }
  return proto2 === baseProto;
}
var hasMatchFunction = (v) => {
  return v && typeof v.match === "function";
};
function createAction(type, prepareAction) {
  function actionCreator(...args) {
    if (prepareAction) {
      let prepared = prepareAction(...args);
      if (!prepared) {
        throw new Error("prepareAction did not return an object");
      }
      return {
        type,
        payload: prepared.payload,
        ..."meta" in prepared && { meta: prepared.meta },
        ..."error" in prepared && { error: prepared.error }
      };
    }
    return { type, payload: args[0] };
  }
  actionCreator.type = type;
  actionCreator.match = (action) => action.type === type;
  return actionCreator;
}
function isAction(action) {
  return isPlainObject3(action) && "type" in action && typeof action.type === "string";
}
function isActionCreator(action) {
  return typeof action === "function" && "type" in action && // hasMatchFunction only wants Matchers but I don't see the point in rewriting it
  hasMatchFunction(action);
}
function isFSA(action) {
  return isAction(action) && Object.keys(action).every(isValidKey);
}
function isValidKey(key) {
  return ["type", "payload", "error", "meta"].indexOf(key) > -1;
}
function getMessage(type) {
  const splitType = type ? `${type}`.split("/") : [];
  const actionName = splitType[splitType.length - 1] || "actionCreator";
  return `Detected an action creator with type "${type || "unknown"}" being dispatched. 
Make sure you're calling the action creator before dispatching, i.e. \`dispatch(${actionName}())\` instead of \`dispatch(${actionName})\`. This is necessary even if the action has no payload.`;
}
function createActionCreatorInvariantMiddleware(options = {}) {
  if (false) {
    return () => (next) => (action) => next(action);
  }
  const { isActionCreator: isActionCreator2 = isActionCreator } = options;
  return () => (next) => (action) => {
    if (isActionCreator2(action)) {
      console.warn(getMessage(action.type));
    }
    return next(action);
  };
}
function getTimeMeasureUtils(maxDelay, fnName) {
  let elapsed = 0;
  return {
    measureTime(fn) {
      const started = Date.now();
      try {
        return fn();
      } finally {
        const finished = Date.now();
        elapsed += finished - started;
      }
    },
    warnIfExceeded() {
      if (elapsed > maxDelay) {
        console.warn(`${fnName} took ${elapsed}ms, which is more than the warning threshold of ${maxDelay}ms. 
If your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode. See https://redux-toolkit.js.org/api/getDefaultMiddleware for instructions.
It is disabled in production builds, so you don't need to worry about that.`);
      }
    }
  };
}
function find(iterable, comparator) {
  for (const entry of iterable) {
    if (comparator(entry)) {
      return entry;
    }
  }
  return void 0;
}
var Tuple = class extends Array {
  constructor(...items) {
    super(...items);
    Object.setPrototypeOf(this, Tuple.prototype);
  }
  static get [Symbol.species]() {
    return Tuple;
  }
  concat(...arr) {
    return super.concat.apply(this, arr);
  }
  prepend(...arr) {
    if (arr.length === 1 && Array.isArray(arr[0])) {
      return new Tuple(...arr[0].concat(this));
    }
    return new Tuple(...arr.concat(this));
  }
};
function freezeDraftable(val) {
  return isDraftable(val) ? produce(val, () => {
  }) : val;
}
var isProduction = false;
var prefix = "Invariant failed";
function invariant(condition, message) {
  if (condition) {
    return;
  }
  if (isProduction) {
    throw new Error(prefix);
  }
  throw new Error(`${prefix}: ${message || ""}`);
}
function isImmutableDefault(value) {
  return typeof value !== "object" || value == null || Object.isFrozen(value);
}
function trackForMutations(isImmutable, ignorePaths, obj) {
  const trackedProperties = trackProperties(isImmutable, ignorePaths, obj);
  return {
    detectMutations() {
      return detectMutations(isImmutable, ignorePaths, trackedProperties, obj);
    }
  };
}
function trackProperties(isImmutable, ignorePaths = [], obj, path = "", checkedObjects = /* @__PURE__ */ new Set()) {
  const tracked = { value: obj };
  if (!isImmutable(obj) && !checkedObjects.has(obj)) {
    checkedObjects.add(obj);
    tracked.children = {};
    for (const key in obj) {
      const childPath = path ? path + "." + key : key;
      if (ignorePaths.length && ignorePaths.indexOf(childPath) !== -1) {
        continue;
      }
      tracked.children[key] = trackProperties(
        isImmutable,
        ignorePaths,
        obj[key],
        childPath
      );
    }
  }
  return tracked;
}
function detectMutations(isImmutable, ignoredPaths = [], trackedProperty, obj, sameParentRef = false, path = "") {
  const prevObj = trackedProperty ? trackedProperty.value : void 0;
  const sameRef = prevObj === obj;
  if (sameParentRef && !sameRef && !Number.isNaN(obj)) {
    return { wasMutated: true, path };
  }
  if (isImmutable(prevObj) || isImmutable(obj)) {
    return { wasMutated: false };
  }
  const keysToDetect = {};
  for (let key in trackedProperty.children) {
    keysToDetect[key] = true;
  }
  for (let key in obj) {
    keysToDetect[key] = true;
  }
  const hasIgnoredPaths = ignoredPaths.length > 0;
  for (let key in keysToDetect) {
    const nestedPath = path ? path + "." + key : key;
    if (hasIgnoredPaths) {
      const hasMatches = ignoredPaths.some((ignored) => {
        if (ignored instanceof RegExp) {
          return ignored.test(nestedPath);
        }
        return nestedPath === ignored;
      });
      if (hasMatches) {
        continue;
      }
    }
    const result = detectMutations(
      isImmutable,
      ignoredPaths,
      trackedProperty.children[key],
      obj[key],
      sameRef,
      nestedPath
    );
    if (result.wasMutated) {
      return result;
    }
  }
  return { wasMutated: false };
}
function createImmutableStateInvariantMiddleware(options = {}) {
  if (false) {
    return () => (next) => (action) => next(action);
  } else {
    let stringify2 = function(obj, serializer, indent, decycler) {
      return JSON.stringify(obj, getSerialize2(serializer, decycler), indent);
    }, getSerialize2 = function(serializer, decycler) {
      let stack = [], keys = [];
      if (!decycler)
        decycler = function(_, value) {
          if (stack[0] === value)
            return "[Circular ~]";
          return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]";
        };
      return function(key, value) {
        if (stack.length > 0) {
          var thisPos = stack.indexOf(this);
          ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
          ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
          if (~stack.indexOf(value))
            value = decycler.call(this, key, value);
        } else
          stack.push(value);
        return serializer == null ? value : serializer.call(this, key, value);
      };
    };
    var stringify = stringify2, getSerialize = getSerialize2;
    let {
      isImmutable = isImmutableDefault,
      ignoredPaths,
      warnAfter = 32
    } = options;
    const track = trackForMutations.bind(null, isImmutable, ignoredPaths);
    return ({ getState }) => {
      let state = getState();
      let tracker = track(state);
      let result;
      return (next) => (action) => {
        const measureUtils = getTimeMeasureUtils(
          warnAfter,
          "ImmutableStateInvariantMiddleware"
        );
        measureUtils.measureTime(() => {
          state = getState();
          result = tracker.detectMutations();
          tracker = track(state);
          invariant(
            !result.wasMutated,
            `A state mutation was detected between dispatches, in the path '${result.path || ""}'.  This may cause incorrect behavior. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)`
          );
        });
        const dispatchedAction = next(action);
        measureUtils.measureTime(() => {
          state = getState();
          result = tracker.detectMutations();
          tracker = track(state);
          result.wasMutated && invariant(
            !result.wasMutated,
            `A state mutation was detected inside a dispatch, in the path: ${result.path || ""}. Take a look at the reducer(s) handling the action ${stringify2(
              action
            )}. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)`
          );
        });
        measureUtils.warnIfExceeded();
        return dispatchedAction;
      };
    };
  }
}
function isPlain(val) {
  const type = typeof val;
  return val == null || type === "string" || type === "boolean" || type === "number" || Array.isArray(val) || isPlainObject3(val);
}
function findNonSerializableValue(value, path = "", isSerializable = isPlain, getEntries, ignoredPaths = [], cache) {
  let foundNestedSerializable;
  if (!isSerializable(value)) {
    return {
      keyPath: path || "<root>",
      value
    };
  }
  if (typeof value !== "object" || value === null) {
    return false;
  }
  if (cache == null ? void 0 : cache.has(value))
    return false;
  const entries = getEntries != null ? getEntries(value) : Object.entries(value);
  const hasIgnoredPaths = ignoredPaths.length > 0;
  for (const [key, nestedValue] of entries) {
    const nestedPath = path ? path + "." + key : key;
    if (hasIgnoredPaths) {
      const hasMatches = ignoredPaths.some((ignored) => {
        if (ignored instanceof RegExp) {
          return ignored.test(nestedPath);
        }
        return nestedPath === ignored;
      });
      if (hasMatches) {
        continue;
      }
    }
    if (!isSerializable(nestedValue)) {
      return {
        keyPath: nestedPath,
        value: nestedValue
      };
    }
    if (typeof nestedValue === "object") {
      foundNestedSerializable = findNonSerializableValue(
        nestedValue,
        nestedPath,
        isSerializable,
        getEntries,
        ignoredPaths,
        cache
      );
      if (foundNestedSerializable) {
        return foundNestedSerializable;
      }
    }
  }
  if (cache && isNestedFrozen(value))
    cache.add(value);
  return false;
}
function isNestedFrozen(value) {
  if (!Object.isFrozen(value))
    return false;
  for (const nestedValue of Object.values(value)) {
    if (typeof nestedValue !== "object" || nestedValue === null)
      continue;
    if (!isNestedFrozen(nestedValue))
      return false;
  }
  return true;
}
function createSerializableStateInvariantMiddleware(options = {}) {
  if (false) {
    return () => (next) => (action) => next(action);
  } else {
    const {
      isSerializable = isPlain,
      getEntries,
      ignoredActions = [],
      ignoredActionPaths = ["meta.arg", "meta.baseQueryMeta"],
      ignoredPaths = [],
      warnAfter = 32,
      ignoreState = false,
      ignoreActions = false,
      disableCache = false
    } = options;
    const cache = !disableCache && WeakSet ? /* @__PURE__ */ new WeakSet() : void 0;
    return (storeAPI) => (next) => (action) => {
      if (!isAction(action)) {
        return next(action);
      }
      const result = next(action);
      const measureUtils = getTimeMeasureUtils(
        warnAfter,
        "SerializableStateInvariantMiddleware"
      );
      if (!ignoreActions && !(ignoredActions.length && ignoredActions.indexOf(action.type) !== -1)) {
        measureUtils.measureTime(() => {
          const foundActionNonSerializableValue = findNonSerializableValue(
            action,
            "",
            isSerializable,
            getEntries,
            ignoredActionPaths,
            cache
          );
          if (foundActionNonSerializableValue) {
            const { keyPath, value } = foundActionNonSerializableValue;
            console.error(
              `A non-serializable value was detected in an action, in the path: \`${keyPath}\`. Value:`,
              value,
              "\nTake a look at the logic that dispatched this action: ",
              action,
              "\n(See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)",
              "\n(To allow non-serializable values see: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)"
            );
          }
        });
      }
      if (!ignoreState) {
        measureUtils.measureTime(() => {
          const state = storeAPI.getState();
          const foundStateNonSerializableValue = findNonSerializableValue(
            state,
            "",
            isSerializable,
            getEntries,
            ignoredPaths,
            cache
          );
          if (foundStateNonSerializableValue) {
            const { keyPath, value } = foundStateNonSerializableValue;
            console.error(
              `A non-serializable value was detected in the state, in the path: \`${keyPath}\`. Value:`,
              value,
              `
Take a look at the reducer(s) handling this action type: ${action.type}.
(See https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state)`
            );
          }
        });
        measureUtils.warnIfExceeded();
      }
      return result;
    };
  }
}
function isBoolean(x) {
  return typeof x === "boolean";
}
var buildGetDefaultMiddleware = () => function getDefaultMiddleware(options) {
  const {
    thunk: thunk2 = true,
    immutableCheck = true,
    serializableCheck = true,
    actionCreatorCheck = true
  } = options ?? {};
  let middlewareArray = new Tuple();
  if (thunk2) {
    if (isBoolean(thunk2)) {
      middlewareArray.push(thunk);
    } else {
      middlewareArray.push(withExtraArgument(thunk2.extraArgument));
    }
  }
  if (true) {
    if (immutableCheck) {
      let immutableOptions = {};
      if (!isBoolean(immutableCheck)) {
        immutableOptions = immutableCheck;
      }
      middlewareArray.unshift(
        createImmutableStateInvariantMiddleware(immutableOptions)
      );
    }
    if (serializableCheck) {
      let serializableOptions = {};
      if (!isBoolean(serializableCheck)) {
        serializableOptions = serializableCheck;
      }
      middlewareArray.push(
        createSerializableStateInvariantMiddleware(serializableOptions)
      );
    }
    if (actionCreatorCheck) {
      let actionCreatorOptions = {};
      if (!isBoolean(actionCreatorCheck)) {
        actionCreatorOptions = actionCreatorCheck;
      }
      middlewareArray.unshift(
        createActionCreatorInvariantMiddleware(actionCreatorOptions)
      );
    }
  }
  return middlewareArray;
};
var SHOULD_AUTOBATCH = "RTK_autoBatch";
var prepareAutoBatched = () => (payload) => ({
  payload,
  meta: { [SHOULD_AUTOBATCH]: true }
});
var createQueueWithTimer = (timeout) => {
  return (notify) => {
    setTimeout(notify, timeout);
  };
};
var rAF = typeof window !== "undefined" && window.requestAnimationFrame ? window.requestAnimationFrame : createQueueWithTimer(10);
var autoBatchEnhancer = (options = { type: "raf" }) => (next) => (...args) => {
  const store = next(...args);
  let notifying = true;
  let shouldNotifyAtEndOfTick = false;
  let notificationQueued = false;
  const listeners = /* @__PURE__ */ new Set();
  const queueCallback = options.type === "tick" ? queueMicrotask : options.type === "raf" ? rAF : options.type === "callback" ? options.queueNotification : createQueueWithTimer(options.timeout);
  const notifyListeners = () => {
    notificationQueued = false;
    if (shouldNotifyAtEndOfTick) {
      shouldNotifyAtEndOfTick = false;
      listeners.forEach((l) => l());
    }
  };
  return Object.assign({}, store, {
    // Override the base `store.subscribe` method to keep original listeners
    // from running if we're delaying notifications
    subscribe(listener2) {
      const wrappedListener = () => notifying && listener2();
      const unsubscribe = store.subscribe(wrappedListener);
      listeners.add(listener2);
      return () => {
        unsubscribe();
        listeners.delete(listener2);
      };
    },
    // Override the base `store.dispatch` method so that we can check actions
    // for the `shouldAutoBatch` flag and determine if batching is active
    dispatch(action) {
      var _a;
      try {
        notifying = !((_a = action == null ? void 0 : action.meta) == null ? void 0 : _a[SHOULD_AUTOBATCH]);
        shouldNotifyAtEndOfTick = !notifying;
        if (shouldNotifyAtEndOfTick) {
          if (!notificationQueued) {
            notificationQueued = true;
            queueCallback(notifyListeners);
          }
        }
        return store.dispatch(action);
      } finally {
        notifying = true;
      }
    }
  });
};
var buildGetDefaultEnhancers = (middlewareEnhancer) => function getDefaultEnhancers(options) {
  const { autoBatch = true } = options ?? {};
  let enhancerArray = new Tuple(middlewareEnhancer);
  if (autoBatch) {
    enhancerArray.push(
      autoBatchEnhancer(typeof autoBatch === "object" ? autoBatch : void 0)
    );
  }
  return enhancerArray;
};
var IS_PRODUCTION = false;
function configureStore(options) {
  const getDefaultMiddleware = buildGetDefaultMiddleware();
  const {
    reducer = void 0,
    middleware = getDefaultMiddleware(),
    devTools = true,
    preloadedState = void 0,
    enhancers = void 0
  } = options || {};
  let rootReducer;
  if (typeof reducer === "function") {
    rootReducer = reducer;
  } else if (isPlainObject3(reducer)) {
    rootReducer = combineReducers(reducer);
  } else {
    throw new Error(
      '"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers'
    );
  }
  let finalMiddleware = middleware;
  if (typeof finalMiddleware === "function") {
    finalMiddleware = finalMiddleware(getDefaultMiddleware);
    if (!IS_PRODUCTION && !Array.isArray(finalMiddleware)) {
      throw new Error(
        "when using a middleware builder function, an array of middleware must be returned"
      );
    }
  }
  if (!IS_PRODUCTION && finalMiddleware.some((item) => typeof item !== "function")) {
    throw new Error(
      "each middleware provided to configureStore must be a function"
    );
  }
  let finalCompose = compose;
  if (devTools) {
    finalCompose = composeWithDevTools({
      // Enable capture of stack traces for dispatched Redux actions
      trace: !IS_PRODUCTION,
      ...typeof devTools === "object" && devTools
    });
  }
  const middlewareEnhancer = applyMiddleware(...finalMiddleware);
  const getDefaultEnhancers = buildGetDefaultEnhancers(middlewareEnhancer);
  if (!IS_PRODUCTION && enhancers && typeof enhancers !== "function") {
    throw new Error('"enhancers" field must be a callback');
  }
  let storeEnhancers = typeof enhancers === "function" ? enhancers(getDefaultEnhancers) : getDefaultEnhancers();
  if (!IS_PRODUCTION && !Array.isArray(storeEnhancers)) {
    throw new Error('"enhancers" callback must return an array');
  }
  if (!IS_PRODUCTION && storeEnhancers.some((item) => typeof item !== "function")) {
    throw new Error(
      "each enhancer provided to configureStore must be a function"
    );
  }
  if (!IS_PRODUCTION && finalMiddleware.length && !storeEnhancers.includes(middlewareEnhancer)) {
    console.error(
      "middlewares were provided, but middleware enhancer was not included in final enhancers - make sure to call `getDefaultEnhancers`"
    );
  }
  const composedEnhancer = finalCompose(...storeEnhancers);
  return createStore(rootReducer, preloadedState, composedEnhancer);
}
function executeReducerBuilderCallback(builderCallback) {
  const actionsMap = {};
  const actionMatchers = [];
  let defaultCaseReducer;
  const builder = {
    addCase(typeOrActionCreator, reducer) {
      if (true) {
        if (actionMatchers.length > 0) {
          throw new Error(
            "`builder.addCase` should only be called before calling `builder.addMatcher`"
          );
        }
        if (defaultCaseReducer) {
          throw new Error(
            "`builder.addCase` should only be called before calling `builder.addDefaultCase`"
          );
        }
      }
      const type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
      if (type in actionsMap) {
        throw new Error(
          "addCase cannot be called with two reducers for the same action type"
        );
      }
      actionsMap[type] = reducer;
      return builder;
    },
    addMatcher(matcher, reducer) {
      if (true) {
        if (defaultCaseReducer) {
          throw new Error(
            "`builder.addMatcher` should only be called before calling `builder.addDefaultCase`"
          );
        }
      }
      actionMatchers.push({ matcher, reducer });
      return builder;
    },
    addDefaultCase(reducer) {
      if (true) {
        if (defaultCaseReducer) {
          throw new Error("`builder.addDefaultCase` can only be called once");
        }
      }
      defaultCaseReducer = reducer;
      return builder;
    }
  };
  builderCallback(builder);
  return [actionsMap, actionMatchers, defaultCaseReducer];
}
function isStateFunction(x) {
  return typeof x === "function";
}
function createReducer(initialState, mapOrBuilderCallback) {
  if (true) {
    if (typeof mapOrBuilderCallback === "object") {
      throw new Error(
        "The object notation for `createReducer` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer"
      );
    }
  }
  let [actionsMap, finalActionMatchers, finalDefaultCaseReducer] = executeReducerBuilderCallback(mapOrBuilderCallback);
  let getInitialState;
  if (isStateFunction(initialState)) {
    getInitialState = () => freezeDraftable(initialState());
  } else {
    const frozenInitialState = freezeDraftable(initialState);
    getInitialState = () => frozenInitialState;
  }
  function reducer(state = getInitialState(), action) {
    let caseReducers = [
      actionsMap[action.type],
      ...finalActionMatchers.filter(({ matcher }) => matcher(action)).map(({ reducer: reducer2 }) => reducer2)
    ];
    if (caseReducers.filter((cr) => !!cr).length === 0) {
      caseReducers = [finalDefaultCaseReducer];
    }
    return caseReducers.reduce((previousState, caseReducer) => {
      if (caseReducer) {
        if (isDraft(previousState)) {
          const draft = previousState;
          const result = caseReducer(draft, action);
          if (result === void 0) {
            return previousState;
          }
          return result;
        } else if (!isDraftable(previousState)) {
          const result = caseReducer(previousState, action);
          if (result === void 0) {
            if (previousState === null) {
              return previousState;
            }
            throw Error(
              "A case reducer on a non-draftable value must not return undefined"
            );
          }
          return result;
        } else {
          return produce(previousState, (draft) => {
            return caseReducer(draft, action);
          });
        }
      }
      return previousState;
    }, state);
  }
  reducer.getInitialState = getInitialState;
  return reducer;
}
var urlAlphabet = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW";
var nanoid = (size = 21) => {
  let id = "";
  let i = size;
  while (i--) {
    id += urlAlphabet[Math.random() * 64 | 0];
  }
  return id;
};
var commonProperties = [
  "name",
  "message",
  "stack",
  "code"
];
var RejectWithValue = class {
  constructor(payload, meta) {
    /*
    type-only property to distinguish between RejectWithValue and FulfillWithMeta
    does not exist at runtime
    */
    __publicField(this, "_type");
    this.payload = payload;
    this.meta = meta;
  }
};
var FulfillWithMeta = class {
  constructor(payload, meta) {
    /*
    type-only property to distinguish between RejectWithValue and FulfillWithMeta
    does not exist at runtime
    */
    __publicField(this, "_type");
    this.payload = payload;
    this.meta = meta;
  }
};
var miniSerializeError = (value) => {
  if (typeof value === "object" && value !== null) {
    const simpleError = {};
    for (const property of commonProperties) {
      if (typeof value[property] === "string") {
        simpleError[property] = value[property];
      }
    }
    return simpleError;
  }
  return { message: String(value) };
};
var createAsyncThunk = (() => {
  function createAsyncThunk2(typePrefix, payloadCreator, options) {
    const fulfilled = createAction(
      typePrefix + "/fulfilled",
      (payload, requestId, arg, meta) => ({
        payload,
        meta: {
          ...meta || {},
          arg,
          requestId,
          requestStatus: "fulfilled"
        }
      })
    );
    const pending = createAction(
      typePrefix + "/pending",
      (requestId, arg, meta) => ({
        payload: void 0,
        meta: {
          ...meta || {},
          arg,
          requestId,
          requestStatus: "pending"
        }
      })
    );
    const rejected = createAction(
      typePrefix + "/rejected",
      (error, requestId, arg, payload, meta) => ({
        payload,
        error: (options && options.serializeError || miniSerializeError)(
          error || "Rejected"
        ),
        meta: {
          ...meta || {},
          arg,
          requestId,
          rejectedWithValue: !!payload,
          requestStatus: "rejected",
          aborted: (error == null ? void 0 : error.name) === "AbortError",
          condition: (error == null ? void 0 : error.name) === "ConditionError"
        }
      })
    );
    let displayedWarning = false;
    const AC = typeof AbortController !== "undefined" ? AbortController : class {
      constructor() {
        __publicField(this, "signal", {
          aborted: false,
          addEventListener() {
          },
          dispatchEvent() {
            return false;
          },
          onabort() {
          },
          removeEventListener() {
          },
          reason: void 0,
          throwIfAborted() {
          }
        });
      }
      abort() {
        if (true) {
          if (!displayedWarning) {
            displayedWarning = true;
            console.info(
              `This platform does not implement AbortController. 
If you want to use the AbortController to react to \`abort\` events, please consider importing a polyfill like 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'.`
            );
          }
        }
      }
    };
    function actionCreator(arg) {
      return (dispatch, getState, extra) => {
        const requestId = (options == null ? void 0 : options.idGenerator) ? options.idGenerator(arg) : nanoid();
        const abortController = new AC();
        let abortReason;
        let started = false;
        function abort(reason) {
          abortReason = reason;
          abortController.abort();
        }
        const promise = async function() {
          var _a, _b;
          let finalAction;
          try {
            let conditionResult = (_a = options == null ? void 0 : options.condition) == null ? void 0 : _a.call(options, arg, { getState, extra });
            if (isThenable(conditionResult)) {
              conditionResult = await conditionResult;
            }
            if (conditionResult === false || abortController.signal.aborted) {
              throw {
                name: "ConditionError",
                message: "Aborted due to condition callback returning false."
              };
            }
            started = true;
            const abortedPromise = new Promise(
              (_, reject) => abortController.signal.addEventListener(
                "abort",
                () => reject({
                  name: "AbortError",
                  message: abortReason || "Aborted"
                })
              )
            );
            dispatch(
              pending(
                requestId,
                arg,
                (_b = options == null ? void 0 : options.getPendingMeta) == null ? void 0 : _b.call(
                  options,
                  { requestId, arg },
                  { getState, extra }
                )
              )
            );
            finalAction = await Promise.race([
              abortedPromise,
              Promise.resolve(
                payloadCreator(arg, {
                  dispatch,
                  getState,
                  extra,
                  requestId,
                  signal: abortController.signal,
                  abort,
                  rejectWithValue: (value, meta) => {
                    return new RejectWithValue(value, meta);
                  },
                  fulfillWithValue: (value, meta) => {
                    return new FulfillWithMeta(value, meta);
                  }
                })
              ).then((result) => {
                if (result instanceof RejectWithValue) {
                  throw result;
                }
                if (result instanceof FulfillWithMeta) {
                  return fulfilled(result.payload, requestId, arg, result.meta);
                }
                return fulfilled(result, requestId, arg);
              })
            ]);
          } catch (err) {
            finalAction = err instanceof RejectWithValue ? rejected(null, requestId, arg, err.payload, err.meta) : rejected(err, requestId, arg);
          }
          const skipDispatch = options && !options.dispatchConditionRejection && rejected.match(finalAction) && finalAction.meta.condition;
          if (!skipDispatch) {
            dispatch(finalAction);
          }
          return finalAction;
        }();
        return Object.assign(promise, {
          abort,
          requestId,
          arg,
          unwrap() {
            return promise.then(unwrapResult);
          }
        });
      };
    }
    return Object.assign(
      actionCreator,
      {
        pending,
        rejected,
        fulfilled,
        typePrefix
      }
    );
  }
  createAsyncThunk2.withTypes = () => createAsyncThunk2;
  return createAsyncThunk2;
})();
function unwrapResult(action) {
  if (action.meta && action.meta.rejectedWithValue) {
    throw action.payload;
  }
  if (action.error) {
    throw action.error;
  }
  return action.payload;
}
function isThenable(value) {
  return value !== null && typeof value === "object" && typeof value.then === "function";
}
var reducerDefinitionType = Symbol.for("rtk-reducer-type");
function getType(slice, actionKey) {
  return `${slice}/${actionKey}`;
}
function createSlice(options) {
  const { name, reducerPath = name } = options;
  if (!name) {
    throw new Error("`name` is a required option for createSlice");
  }
  if (typeof process !== "undefined" && true) {
    if (options.initialState === void 0) {
      console.error(
        "You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`"
      );
    }
  }
  const reducers = (typeof options.reducers === "function" ? options.reducers(buildReducerCreators()) : options.reducers) || {};
  const reducerNames = Object.keys(reducers);
  const context = {
    sliceCaseReducersByName: {},
    sliceCaseReducersByType: {},
    actionCreators: {}
  };
  reducerNames.forEach((reducerName) => {
    const reducerDefinition = reducers[reducerName];
    const reducerDetails = {
      reducerName,
      type: getType(name, reducerName),
      createNotation: typeof options.reducers === "function"
    };
    if (isAsyncThunkSliceReducerDefinition(reducerDefinition)) {
      handleThunkCaseReducerDefinition(
        reducerDetails,
        reducerDefinition,
        context
      );
    } else {
      handleNormalReducerDefinition(
        reducerDetails,
        reducerDefinition,
        context
      );
    }
  });
  function buildReducer() {
    if (true) {
      if (typeof options.extraReducers === "object") {
        throw new Error(
          "The object notation for `createSlice.extraReducers` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice"
        );
      }
    }
    const [
      extraReducers = {},
      actionMatchers = [],
      defaultCaseReducer = void 0
    ] = typeof options.extraReducers === "function" ? executeReducerBuilderCallback(options.extraReducers) : [options.extraReducers];
    const finalCaseReducers = {
      ...extraReducers,
      ...context.sliceCaseReducersByType
    };
    return createReducer(options.initialState, (builder) => {
      for (let key in finalCaseReducers) {
        builder.addCase(key, finalCaseReducers[key]);
      }
      for (let m of actionMatchers) {
        builder.addMatcher(m.matcher, m.reducer);
      }
      if (defaultCaseReducer) {
        builder.addDefaultCase(defaultCaseReducer);
      }
    });
  }
  const defaultSelectSlice = (rootState) => rootState[reducerPath];
  const selectSelf = (state) => state;
  const injectedSelectorCache = /* @__PURE__ */ new WeakMap();
  let _reducer;
  const slice = {
    name,
    reducerPath,
    reducer(state, action) {
      if (!_reducer)
        _reducer = buildReducer();
      return _reducer(state, action);
    },
    actions: context.actionCreators,
    caseReducers: context.sliceCaseReducersByName,
    getInitialState() {
      if (!_reducer)
        _reducer = buildReducer();
      return _reducer.getInitialState();
    },
    getSelectors(selectState = selectSelf) {
      let selectorCache = injectedSelectorCache.get(this);
      if (!selectorCache) {
        selectorCache = /* @__PURE__ */ new WeakMap();
        injectedSelectorCache.set(this, selectorCache);
      }
      let cached = selectorCache.get(selectState);
      if (!cached) {
        cached = {};
        for (const [name2, selector] of Object.entries(
          options.selectors ?? {}
        )) {
          cached[name2] = (rootState, ...args) => {
            let sliceState = selectState(rootState);
            if (typeof sliceState === "undefined") {
              if (this !== slice) {
                sliceState = this.getInitialState();
              } else if (true) {
                throw new Error(
                  "selectState returned undefined for an uninjected slice reducer"
                );
              }
            }
            return selector(sliceState, ...args);
          };
        }
        selectorCache.set(selectState, cached);
      }
      return cached;
    },
    get selectors() {
      return this.getSelectors(defaultSelectSlice);
    },
    injectInto(injectable, { reducerPath: reducerPath2, ...config } = {}) {
      injectable.inject(
        { reducerPath: reducerPath2 ?? this.reducerPath, reducer: this.reducer },
        config
      );
      return {
        ...this,
        get selectors() {
          return this.getSelectors(defaultSelectSlice);
        }
      };
    }
  };
  return slice;
}
function buildReducerCreators() {
  function asyncThunk(payloadCreator, config) {
    return {
      [reducerDefinitionType]: "asyncThunk",
      payloadCreator,
      ...config
    };
  }
  asyncThunk.withTypes = () => asyncThunk;
  return {
    reducer(caseReducer) {
      return Object.assign(
        {
          // hack so the wrapping function has the same name as the original
          // we need to create a wrapper so the `reducerDefinitionType` is not assigned to the original
          [caseReducer.name](...args) {
            return caseReducer(...args);
          }
        }[caseReducer.name],
        {
          [reducerDefinitionType]: "reducer"
          /* reducer */
        }
      );
    },
    preparedReducer(prepare, reducer) {
      return {
        [reducerDefinitionType]: "reducerWithPrepare",
        prepare,
        reducer
      };
    },
    asyncThunk
  };
}
function handleNormalReducerDefinition({ type, reducerName, createNotation }, maybeReducerWithPrepare, context) {
  let caseReducer;
  let prepareCallback;
  if ("reducer" in maybeReducerWithPrepare) {
    if (createNotation && !isCaseReducerWithPrepareDefinition(maybeReducerWithPrepare)) {
      throw new Error(
        "Please use the `create.preparedReducer` notation for prepared action creators with the `create` notation."
      );
    }
    caseReducer = maybeReducerWithPrepare.reducer;
    prepareCallback = maybeReducerWithPrepare.prepare;
  } else {
    caseReducer = maybeReducerWithPrepare;
  }
  context.sliceCaseReducersByName[reducerName] = caseReducer;
  context.sliceCaseReducersByType[type] = caseReducer;
  context.actionCreators[reducerName] = prepareCallback ? createAction(type, prepareCallback) : createAction(type);
}
function isAsyncThunkSliceReducerDefinition(reducerDefinition) {
  return reducerDefinition[reducerDefinitionType] === "asyncThunk";
}
function isCaseReducerWithPrepareDefinition(reducerDefinition) {
  return reducerDefinition[reducerDefinitionType] === "reducerWithPrepare";
}
function handleThunkCaseReducerDefinition({ type, reducerName }, reducerDefinition, context) {
  const { payloadCreator, fulfilled, pending, rejected, options } = reducerDefinition;
  const thunk2 = createAsyncThunk(type, payloadCreator, options);
  context.actionCreators[reducerName] = thunk2;
  if (fulfilled) {
    context.sliceCaseReducersByType[thunk2.fulfilled.type] = fulfilled;
  }
  if (pending) {
    context.sliceCaseReducersByType[thunk2.pending.type] = pending;
  }
  if (rejected) {
    context.sliceCaseReducersByType[thunk2.rejected.type] = rejected;
  }
  context.sliceCaseReducersByName[reducerName] = {
    fulfilled: fulfilled || noop,
    pending: pending || noop,
    rejected: rejected || noop
  };
}
function noop() {
}
function getInitialEntityState() {
  return {
    ids: [],
    entities: {}
  };
}
function createInitialStateFactory() {
  function getInitialState(additionalState = {}) {
    return Object.assign(getInitialEntityState(), additionalState);
  }
  return { getInitialState };
}
function createSelectorsFactory() {
  function getSelectors(selectState, options = {}) {
    const { createSelector: createSelector2 = createDraftSafeSelector } = options;
    const selectIds = (state) => state.ids;
    const selectEntities = (state) => state.entities;
    const selectAll = createSelector2(
      selectIds,
      selectEntities,
      (ids, entities) => ids.map((id) => entities[id])
    );
    const selectId = (_, id) => id;
    const selectById = (entities, id) => entities[id];
    const selectTotal = createSelector2(selectIds, (ids) => ids.length);
    if (!selectState) {
      return {
        selectIds,
        selectEntities,
        selectAll,
        selectTotal,
        selectById: createSelector2(selectEntities, selectId, selectById)
      };
    }
    const selectGlobalizedEntities = createSelector2(
      selectState,
      selectEntities
    );
    return {
      selectIds: createSelector2(selectState, selectIds),
      selectEntities: selectGlobalizedEntities,
      selectAll: createSelector2(selectState, selectAll),
      selectTotal: createSelector2(selectState, selectTotal),
      selectById: createSelector2(
        selectGlobalizedEntities,
        selectId,
        selectById
      )
    };
  }
  return { getSelectors };
}
function createSingleArgumentStateOperator(mutator) {
  const operator = createStateOperator(
    (_, state) => mutator(state)
  );
  return function operation(state) {
    return operator(state, void 0);
  };
}
function createStateOperator(mutator) {
  return function operation(state, arg) {
    function isPayloadActionArgument(arg2) {
      return isFSA(arg2);
    }
    const runMutator = (draft) => {
      if (isPayloadActionArgument(arg)) {
        mutator(arg.payload, draft);
      } else {
        mutator(arg, draft);
      }
    };
    if (isDraft(state)) {
      runMutator(state);
      return state;
    } else {
      return produce(state, runMutator);
    }
  };
}
function selectIdValue(entity, selectId) {
  const key = selectId(entity);
  if (key === void 0) {
    console.warn(
      "The entity passed to the `selectId` implementation returned undefined.",
      "You should probably provide your own `selectId` implementation.",
      "The entity that was passed:",
      entity,
      "The `selectId` implementation:",
      selectId.toString()
    );
  }
  return key;
}
function ensureEntitiesArray(entities) {
  if (!Array.isArray(entities)) {
    entities = Object.values(entities);
  }
  return entities;
}
function splitAddedUpdatedEntities(newEntities, selectId, state) {
  newEntities = ensureEntitiesArray(newEntities);
  const added = [];
  const updated = [];
  for (const entity of newEntities) {
    const id = selectIdValue(entity, selectId);
    if (id in state.entities) {
      updated.push({ id, changes: entity });
    } else {
      added.push(entity);
    }
  }
  return [added, updated];
}
function createUnsortedStateAdapter(selectId) {
  function addOneMutably(entity, state) {
    const key = selectIdValue(entity, selectId);
    if (key in state.entities) {
      return;
    }
    state.ids.push(key);
    state.entities[key] = entity;
  }
  function addManyMutably(newEntities, state) {
    newEntities = ensureEntitiesArray(newEntities);
    for (const entity of newEntities) {
      addOneMutably(entity, state);
    }
  }
  function setOneMutably(entity, state) {
    const key = selectIdValue(entity, selectId);
    if (!(key in state.entities)) {
      state.ids.push(key);
    }
    state.entities[key] = entity;
  }
  function setManyMutably(newEntities, state) {
    newEntities = ensureEntitiesArray(newEntities);
    for (const entity of newEntities) {
      setOneMutably(entity, state);
    }
  }
  function setAllMutably(newEntities, state) {
    newEntities = ensureEntitiesArray(newEntities);
    state.ids = [];
    state.entities = {};
    addManyMutably(newEntities, state);
  }
  function removeOneMutably(key, state) {
    return removeManyMutably([key], state);
  }
  function removeManyMutably(keys, state) {
    let didMutate = false;
    keys.forEach((key) => {
      if (key in state.entities) {
        delete state.entities[key];
        didMutate = true;
      }
    });
    if (didMutate) {
      state.ids = state.ids.filter((id) => id in state.entities);
    }
  }
  function removeAllMutably(state) {
    Object.assign(state, {
      ids: [],
      entities: {}
    });
  }
  function takeNewKey(keys, update, state) {
    const original3 = state.entities[update.id];
    if (original3 === void 0) {
      return false;
    }
    const updated = Object.assign({}, original3, update.changes);
    const newKey = selectIdValue(updated, selectId);
    const hasNewKey = newKey !== update.id;
    if (hasNewKey) {
      keys[update.id] = newKey;
      delete state.entities[update.id];
    }
    state.entities[newKey] = updated;
    return hasNewKey;
  }
  function updateOneMutably(update, state) {
    return updateManyMutably([update], state);
  }
  function updateManyMutably(updates, state) {
    const newKeys = {};
    const updatesPerEntity = {};
    updates.forEach((update) => {
      if (update.id in state.entities) {
        updatesPerEntity[update.id] = {
          id: update.id,
          // Spreads ignore falsy values, so this works even if there isn't
          // an existing update already at this key
          changes: {
            ...updatesPerEntity[update.id] ? updatesPerEntity[update.id].changes : null,
            ...update.changes
          }
        };
      }
    });
    updates = Object.values(updatesPerEntity);
    const didMutateEntities = updates.length > 0;
    if (didMutateEntities) {
      const didMutateIds = updates.filter((update) => takeNewKey(newKeys, update, state)).length > 0;
      if (didMutateIds) {
        state.ids = Object.values(state.entities).map(
          (e) => selectIdValue(e, selectId)
        );
      }
    }
  }
  function upsertOneMutably(entity, state) {
    return upsertManyMutably([entity], state);
  }
  function upsertManyMutably(newEntities, state) {
    const [added, updated] = splitAddedUpdatedEntities(
      newEntities,
      selectId,
      state
    );
    updateManyMutably(updated, state);
    addManyMutably(added, state);
  }
  return {
    removeAll: createSingleArgumentStateOperator(removeAllMutably),
    addOne: createStateOperator(addOneMutably),
    addMany: createStateOperator(addManyMutably),
    setOne: createStateOperator(setOneMutably),
    setMany: createStateOperator(setManyMutably),
    setAll: createStateOperator(setAllMutably),
    updateOne: createStateOperator(updateOneMutably),
    updateMany: createStateOperator(updateManyMutably),
    upsertOne: createStateOperator(upsertOneMutably),
    upsertMany: createStateOperator(upsertManyMutably),
    removeOne: createStateOperator(removeOneMutably),
    removeMany: createStateOperator(removeManyMutably)
  };
}
function createSortedStateAdapter(selectId, sort) {
  const { removeOne, removeMany, removeAll } = createUnsortedStateAdapter(selectId);
  function addOneMutably(entity, state) {
    return addManyMutably([entity], state);
  }
  function addManyMutably(newEntities, state) {
    newEntities = ensureEntitiesArray(newEntities);
    const models = newEntities.filter(
      (model) => !(selectIdValue(model, selectId) in state.entities)
    );
    if (models.length !== 0) {
      merge(models, state);
    }
  }
  function setOneMutably(entity, state) {
    return setManyMutably([entity], state);
  }
  function setManyMutably(newEntities, state) {
    newEntities = ensureEntitiesArray(newEntities);
    if (newEntities.length !== 0) {
      merge(newEntities, state);
    }
  }
  function setAllMutably(newEntities, state) {
    newEntities = ensureEntitiesArray(newEntities);
    state.entities = {};
    state.ids = [];
    addManyMutably(newEntities, state);
  }
  function updateOneMutably(update, state) {
    return updateManyMutably([update], state);
  }
  function updateManyMutably(updates, state) {
    let appliedUpdates = false;
    for (let update of updates) {
      const entity = state.entities[update.id];
      if (!entity) {
        continue;
      }
      appliedUpdates = true;
      Object.assign(entity, update.changes);
      const newId = selectId(entity);
      if (update.id !== newId) {
        delete state.entities[update.id];
        state.entities[newId] = entity;
      }
    }
    if (appliedUpdates) {
      resortEntities(state);
    }
  }
  function upsertOneMutably(entity, state) {
    return upsertManyMutably([entity], state);
  }
  function upsertManyMutably(newEntities, state) {
    const [added, updated] = splitAddedUpdatedEntities(
      newEntities,
      selectId,
      state
    );
    updateManyMutably(updated, state);
    addManyMutably(added, state);
  }
  function areArraysEqual(a, b) {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length && i < b.length; i++) {
      if (a[i] === b[i]) {
        continue;
      }
      return false;
    }
    return true;
  }
  function merge(models, state) {
    models.forEach((model) => {
      state.entities[selectId(model)] = model;
    });
    resortEntities(state);
  }
  function resortEntities(state) {
    const allEntities = Object.values(state.entities);
    allEntities.sort(sort);
    const newSortedIds = allEntities.map(selectId);
    const { ids } = state;
    if (!areArraysEqual(ids, newSortedIds)) {
      state.ids = newSortedIds;
    }
  }
  return {
    removeOne,
    removeMany,
    removeAll,
    addOne: createStateOperator(addOneMutably),
    updateOne: createStateOperator(updateOneMutably),
    upsertOne: createStateOperator(upsertOneMutably),
    setOne: createStateOperator(setOneMutably),
    setMany: createStateOperator(setManyMutably),
    setAll: createStateOperator(setAllMutably),
    addMany: createStateOperator(addManyMutably),
    updateMany: createStateOperator(updateManyMutably),
    upsertMany: createStateOperator(upsertManyMutably)
  };
}
function createEntityAdapter(options = {}) {
  const { selectId, sortComparer } = {
    sortComparer: false,
    selectId: (instance) => instance.id,
    ...options
  };
  const stateFactory = createInitialStateFactory();
  const selectorsFactory = createSelectorsFactory();
  const stateAdapter = sortComparer ? createSortedStateAdapter(selectId, sortComparer) : createUnsortedStateAdapter(selectId);
  return {
    selectId,
    sortComparer,
    ...stateFactory,
    ...selectorsFactory,
    ...stateAdapter
  };
}
var matches = (matcher, action) => {
  if (hasMatchFunction(matcher)) {
    return matcher.match(action);
  } else {
    return matcher(action);
  }
};
function isAnyOf(...matchers) {
  return (action) => {
    return matchers.some((matcher) => matches(matcher, action));
  };
}
function isAllOf(...matchers) {
  return (action) => {
    return matchers.every((matcher) => matches(matcher, action));
  };
}
function hasExpectedRequestMetadata(action, validStatus) {
  if (!action || !action.meta)
    return false;
  const hasValidRequestId = typeof action.meta.requestId === "string";
  const hasValidRequestStatus = validStatus.indexOf(action.meta.requestStatus) > -1;
  return hasValidRequestId && hasValidRequestStatus;
}
function isAsyncThunkArray(a) {
  return typeof a[0] === "function" && "pending" in a[0] && "fulfilled" in a[0] && "rejected" in a[0];
}
function isPending(...asyncThunks) {
  if (asyncThunks.length === 0) {
    return (action) => hasExpectedRequestMetadata(action, ["pending"]);
  }
  if (!isAsyncThunkArray(asyncThunks)) {
    return isPending()(asyncThunks[0]);
  }
  return (action) => {
    const matchers = asyncThunks.map(
      (asyncThunk) => asyncThunk.pending
    );
    const combinedMatcher = isAnyOf(...matchers);
    return combinedMatcher(action);
  };
}
function isRejected(...asyncThunks) {
  if (asyncThunks.length === 0) {
    return (action) => hasExpectedRequestMetadata(action, ["rejected"]);
  }
  if (!isAsyncThunkArray(asyncThunks)) {
    return isRejected()(asyncThunks[0]);
  }
  return (action) => {
    const matchers = asyncThunks.map(
      (asyncThunk) => asyncThunk.rejected
    );
    const combinedMatcher = isAnyOf(...matchers);
    return combinedMatcher(action);
  };
}
function isRejectedWithValue(...asyncThunks) {
  const hasFlag = (action) => {
    return action && action.meta && action.meta.rejectedWithValue;
  };
  if (asyncThunks.length === 0) {
    return (action) => {
      const combinedMatcher = isAllOf(isRejected(...asyncThunks), hasFlag);
      return combinedMatcher(action);
    };
  }
  if (!isAsyncThunkArray(asyncThunks)) {
    return isRejectedWithValue()(asyncThunks[0]);
  }
  return (action) => {
    const combinedMatcher = isAllOf(isRejected(...asyncThunks), hasFlag);
    return combinedMatcher(action);
  };
}
function isFulfilled(...asyncThunks) {
  if (asyncThunks.length === 0) {
    return (action) => hasExpectedRequestMetadata(action, ["fulfilled"]);
  }
  if (!isAsyncThunkArray(asyncThunks)) {
    return isFulfilled()(asyncThunks[0]);
  }
  return (action) => {
    const matchers = asyncThunks.map(
      (asyncThunk) => asyncThunk.fulfilled
    );
    const combinedMatcher = isAnyOf(...matchers);
    return combinedMatcher(action);
  };
}
function isAsyncThunkAction(...asyncThunks) {
  if (asyncThunks.length === 0) {
    return (action) => hasExpectedRequestMetadata(action, ["pending", "fulfilled", "rejected"]);
  }
  if (!isAsyncThunkArray(asyncThunks)) {
    return isAsyncThunkAction()(asyncThunks[0]);
  }
  return (action) => {
    const matchers = [];
    for (const asyncThunk of asyncThunks) {
      matchers.push(
        asyncThunk.pending,
        asyncThunk.rejected,
        asyncThunk.fulfilled
      );
    }
    const combinedMatcher = isAnyOf(...matchers);
    return combinedMatcher(action);
  };
}
var assertFunction = (func, expected) => {
  if (typeof func !== "function") {
    throw new TypeError(`${expected} is not a function`);
  }
};
var noop2 = () => {
};
var catchRejection = (promise, onError = noop2) => {
  promise.catch(onError);
  return promise;
};
var addAbortSignalListener = (abortSignal, callback) => {
  abortSignal.addEventListener("abort", callback, { once: true });
  return () => abortSignal.removeEventListener("abort", callback);
};
var abortControllerWithReason = (abortController, reason) => {
  const signal = abortController.signal;
  if (signal.aborted) {
    return;
  }
  if (!("reason" in signal)) {
    Object.defineProperty(signal, "reason", {
      enumerable: true,
      value: reason,
      configurable: true,
      writable: true
    });
  }
  ;
  abortController.abort(reason);
};
var task = "task";
var listener = "listener";
var completed = "completed";
var cancelled = "cancelled";
var taskCancelled = `task-${cancelled}`;
var taskCompleted = `task-${completed}`;
var listenerCancelled = `${listener}-${cancelled}`;
var listenerCompleted = `${listener}-${completed}`;
var TaskAbortError = class {
  constructor(code) {
    __publicField(this, "name", "TaskAbortError");
    __publicField(this, "message");
    this.code = code;
    this.message = `${task} ${cancelled} (reason: ${code})`;
  }
};
var validateActive = (signal) => {
  if (signal.aborted) {
    throw new TaskAbortError(signal.reason);
  }
};
function raceWithSignal(signal, promise) {
  let cleanup = noop2;
  return new Promise((resolve, reject) => {
    const notifyRejection = () => reject(new TaskAbortError(signal.reason));
    if (signal.aborted) {
      notifyRejection();
      return;
    }
    cleanup = addAbortSignalListener(signal, notifyRejection);
    promise.finally(() => cleanup()).then(resolve, reject);
  }).finally(() => {
    cleanup = noop2;
  });
}
var runTask = async (task2, cleanUp) => {
  try {
    await Promise.resolve();
    const value = await task2();
    return {
      status: "ok",
      value
    };
  } catch (error) {
    return {
      status: error instanceof TaskAbortError ? "cancelled" : "rejected",
      error
    };
  } finally {
    cleanUp == null ? void 0 : cleanUp();
  }
};
var createPause = (signal) => {
  return (promise) => {
    return catchRejection(
      raceWithSignal(signal, promise).then((output) => {
        validateActive(signal);
        return output;
      })
    );
  };
};
var createDelay = (signal) => {
  const pause = createPause(signal);
  return (timeoutMs) => {
    return pause(new Promise((resolve) => setTimeout(resolve, timeoutMs)));
  };
};
var { assign } = Object;
var INTERNAL_NIL_TOKEN = {};
var alm = "listenerMiddleware";
var createFork = (parentAbortSignal, parentBlockingPromises) => {
  const linkControllers = (controller) => addAbortSignalListener(
    parentAbortSignal,
    () => abortControllerWithReason(controller, parentAbortSignal.reason)
  );
  return (taskExecutor, opts) => {
    assertFunction(taskExecutor, "taskExecutor");
    const childAbortController = new AbortController();
    linkControllers(childAbortController);
    const result = runTask(
      async () => {
        validateActive(parentAbortSignal);
        validateActive(childAbortController.signal);
        const result2 = await taskExecutor({
          pause: createPause(childAbortController.signal),
          delay: createDelay(childAbortController.signal),
          signal: childAbortController.signal
        });
        validateActive(childAbortController.signal);
        return result2;
      },
      () => abortControllerWithReason(childAbortController, taskCompleted)
    );
    if (opts == null ? void 0 : opts.autoJoin) {
      parentBlockingPromises.push(result);
    }
    return {
      result: createPause(parentAbortSignal)(result),
      cancel() {
        abortControllerWithReason(childAbortController, taskCancelled);
      }
    };
  };
};
var createTakePattern = (startListening, signal) => {
  const take = async (predicate, timeout) => {
    validateActive(signal);
    let unsubscribe = () => {
    };
    const tuplePromise = new Promise((resolve, reject) => {
      let stopListening = startListening({
        predicate,
        effect: (action, listenerApi) => {
          listenerApi.unsubscribe();
          resolve([
            action,
            listenerApi.getState(),
            listenerApi.getOriginalState()
          ]);
        }
      });
      unsubscribe = () => {
        stopListening();
        reject();
      };
    });
    const promises = [tuplePromise];
    if (timeout != null) {
      promises.push(
        new Promise((resolve) => setTimeout(resolve, timeout, null))
      );
    }
    try {
      const output = await raceWithSignal(signal, Promise.race(promises));
      validateActive(signal);
      return output;
    } finally {
      unsubscribe();
    }
  };
  return (predicate, timeout) => catchRejection(take(predicate, timeout));
};
var getListenerEntryPropsFrom = (options) => {
  let { type, actionCreator, matcher, predicate, effect } = options;
  if (type) {
    predicate = createAction(type).match;
  } else if (actionCreator) {
    type = actionCreator.type;
    predicate = actionCreator.match;
  } else if (matcher) {
    predicate = matcher;
  } else if (predicate) {
  } else {
    throw new Error(
      "Creating or removing a listener requires one of the known fields for matching an action"
    );
  }
  assertFunction(effect, "options.listener");
  return { predicate, type, effect };
};
var createListenerEntry = (options) => {
  const { type, predicate, effect } = getListenerEntryPropsFrom(options);
  const id = nanoid();
  const entry = {
    id,
    effect,
    type,
    predicate,
    pending: /* @__PURE__ */ new Set(),
    unsubscribe: () => {
      throw new Error("Unsubscribe not initialized");
    }
  };
  return entry;
};
var cancelActiveListeners = (entry) => {
  entry.pending.forEach((controller) => {
    abortControllerWithReason(controller, listenerCancelled);
  });
};
var createClearListenerMiddleware = (listenerMap) => {
  return () => {
    listenerMap.forEach(cancelActiveListeners);
    listenerMap.clear();
  };
};
var safelyNotifyError = (errorHandler, errorToNotify, errorInfo) => {
  try {
    errorHandler(errorToNotify, errorInfo);
  } catch (errorHandlerError) {
    setTimeout(() => {
      throw errorHandlerError;
    }, 0);
  }
};
var addListener = createAction(
  `${alm}/add`
);
var clearAllListeners = createAction(`${alm}/removeAll`);
var removeListener = createAction(
  `${alm}/remove`
);
var defaultErrorHandler = (...args) => {
  console.error(`${alm}/error`, ...args);
};
function createListenerMiddleware(middlewareOptions = {}) {
  const listenerMap = /* @__PURE__ */ new Map();
  const { extra, onError = defaultErrorHandler } = middlewareOptions;
  assertFunction(onError, "onError");
  const insertEntry = (entry) => {
    entry.unsubscribe = () => listenerMap.delete(entry.id);
    listenerMap.set(entry.id, entry);
    return (cancelOptions) => {
      entry.unsubscribe();
      if (cancelOptions == null ? void 0 : cancelOptions.cancelActive) {
        cancelActiveListeners(entry);
      }
    };
  };
  const startListening = (options) => {
    let entry = find(
      Array.from(listenerMap.values()),
      (existingEntry) => existingEntry.effect === options.effect
    );
    if (!entry) {
      entry = createListenerEntry(options);
    }
    return insertEntry(entry);
  };
  const stopListening = (options) => {
    const { type, effect, predicate } = getListenerEntryPropsFrom(options);
    const entry = find(Array.from(listenerMap.values()), (entry2) => {
      const matchPredicateOrType = typeof type === "string" ? entry2.type === type : entry2.predicate === predicate;
      return matchPredicateOrType && entry2.effect === effect;
    });
    if (entry) {
      entry.unsubscribe();
      if (options.cancelActive) {
        cancelActiveListeners(entry);
      }
    }
    return !!entry;
  };
  const notifyListener = async (entry, action, api, getOriginalState) => {
    const internalTaskController = new AbortController();
    const take = createTakePattern(
      startListening,
      internalTaskController.signal
    );
    const autoJoinPromises = [];
    try {
      entry.pending.add(internalTaskController);
      await Promise.resolve(
        entry.effect(
          action,
          // Use assign() rather than ... to avoid extra helper functions added to bundle
          assign({}, api, {
            getOriginalState,
            condition: (predicate, timeout) => take(predicate, timeout).then(Boolean),
            take,
            delay: createDelay(internalTaskController.signal),
            pause: createPause(internalTaskController.signal),
            extra,
            signal: internalTaskController.signal,
            fork: createFork(internalTaskController.signal, autoJoinPromises),
            unsubscribe: entry.unsubscribe,
            subscribe: () => {
              listenerMap.set(entry.id, entry);
            },
            cancelActiveListeners: () => {
              entry.pending.forEach((controller, _, set2) => {
                if (controller !== internalTaskController) {
                  abortControllerWithReason(controller, listenerCancelled);
                  set2.delete(controller);
                }
              });
            }
          })
        )
      );
    } catch (listenerError) {
      if (!(listenerError instanceof TaskAbortError)) {
        safelyNotifyError(onError, listenerError, {
          raisedBy: "effect"
        });
      }
    } finally {
      await Promise.allSettled(autoJoinPromises);
      abortControllerWithReason(internalTaskController, listenerCompleted);
      entry.pending.delete(internalTaskController);
    }
  };
  const clearListenerMiddleware = createClearListenerMiddleware(listenerMap);
  const middleware = (api) => (next) => (action) => {
    if (!isAction(action)) {
      return next(action);
    }
    if (addListener.match(action)) {
      return startListening(action.payload);
    }
    if (clearAllListeners.match(action)) {
      clearListenerMiddleware();
      return;
    }
    if (removeListener.match(action)) {
      return stopListening(action.payload);
    }
    let originalState = api.getState();
    const getOriginalState = () => {
      if (originalState === INTERNAL_NIL_TOKEN) {
        throw new Error(
          `${alm}: getOriginalState can only be called synchronously`
        );
      }
      return originalState;
    };
    let result;
    try {
      result = next(action);
      if (listenerMap.size > 0) {
        let currentState = api.getState();
        const listenerEntries = Array.from(listenerMap.values());
        for (let entry of listenerEntries) {
          let runListener = false;
          try {
            runListener = entry.predicate(action, currentState, originalState);
          } catch (predicateError) {
            runListener = false;
            safelyNotifyError(onError, predicateError, {
              raisedBy: "predicate"
            });
          }
          if (!runListener) {
            continue;
          }
          notifyListener(entry, action, api, getOriginalState);
        }
      }
    } finally {
      originalState = INTERNAL_NIL_TOKEN;
    }
    return result;
  };
  return {
    middleware,
    startListening,
    stopListening,
    clearListeners: clearListenerMiddleware
  };
}
var createMiddlewareEntry = (middleware) => ({
  id: nanoid(),
  middleware,
  applied: /* @__PURE__ */ new Map()
});
var createDynamicMiddleware = () => {
  const instanceId = nanoid();
  const middlewareMap = /* @__PURE__ */ new Map();
  const insertEntry = (entry) => {
    middlewareMap.set(entry.id, entry);
  };
  const withMiddleware = (() => {
    const withMiddleware2 = createAction(
      "dynamicMiddleware/add",
      (...middlewares) => ({
        payload: middlewares,
        meta: {
          instanceId
        }
      })
    );
    withMiddleware2.withTypes = () => withMiddleware2;
    return withMiddleware2;
  })();
  const addMiddleware = (() => {
    function addMiddleware2(...middlewares) {
      middlewares.forEach((middleware2) => {
        let entry = find(
          Array.from(middlewareMap.values()),
          (entry2) => entry2.middleware === middleware2
        );
        if (!entry) {
          entry = createMiddlewareEntry(middleware2);
        }
        insertEntry(entry);
      });
    }
    addMiddleware2.withTypes = () => addMiddleware2;
    return addMiddleware2;
  })();
  const getFinalMiddleware = (api) => {
    const appliedMiddleware = Array.from(middlewareMap.values()).map(
      (entry) => {
        let applied = entry.applied.get(api);
        if (!applied) {
          applied = entry.middleware(api);
          entry.applied.set(api, applied);
        }
        return applied;
      }
    );
    return compose(...appliedMiddleware);
  };
  const middleware = (api) => (next) => (action) => {
    if (isAction(action) && withMiddleware.match(action) && action.meta.instanceId === instanceId) {
      addMiddleware(...action.payload);
      return api.dispatch;
    }
    return getFinalMiddleware(api)(next)(action);
  };
  return {
    middleware,
    addMiddleware,
    withMiddleware
  };
};
var isSliceLike = (maybeSliceLike) => "reducerPath" in maybeSliceLike && typeof maybeSliceLike.reducerPath === "string";
var getReducers = (slices) => slices.flatMap(
  (sliceOrMap) => isSliceLike(sliceOrMap) ? [[sliceOrMap.reducerPath, sliceOrMap.reducer]] : Object.entries(sliceOrMap)
);
var ORIGINAL_STATE = Symbol.for("rtk-state-proxy-original");
var isStateProxy = (value) => !!value && !!value[ORIGINAL_STATE];
var stateProxyMap = /* @__PURE__ */ new WeakMap();
var createStateProxy = (state, reducerMap) => {
  let proxy = stateProxyMap.get(state);
  if (!proxy) {
    proxy = new Proxy(state, {
      get: (target, prop, receiver) => {
        if (prop === ORIGINAL_STATE)
          return target;
        const result = Reflect.get(target, prop, receiver);
        if (typeof result === "undefined") {
          const reducer = reducerMap[prop.toString()];
          if (reducer) {
            const reducerResult = reducer(void 0, { type: nanoid() });
            if (typeof reducerResult === "undefined") {
              throw new Error(
                `The slice reducer for key "${prop.toString()}" returned undefined when called for selector(). If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`
              );
            }
            return reducerResult;
          }
        }
        return result;
      }
    });
    stateProxyMap.set(state, proxy);
  }
  return proxy;
};
var original2 = (state) => {
  if (!isStateProxy(state)) {
    throw new Error("original must be used on state Proxy");
  }
  return state[ORIGINAL_STATE];
};
function combineSlices(...slices) {
  const reducerMap = Object.fromEntries(getReducers(slices));
  const getReducer = () => combineReducers(reducerMap);
  let reducer = getReducer();
  function combinedReducer(state, action) {
    return reducer(state, action);
  }
  combinedReducer.withLazyLoadedSlices = () => combinedReducer;
  const inject = (slice, config = {}) => {
    const { reducerPath, reducer: reducerToInject } = slice;
    const currentReducer = reducerMap[reducerPath];
    if (!config.overrideExisting && currentReducer && currentReducer !== reducerToInject) {
      if (typeof process !== "undefined" && true) {
        console.error(
          `called \`inject\` to override already-existing reducer ${reducerPath} without specifying \`overrideExisting: true\``
        );
      }
      return combinedReducer;
    }
    reducerMap[reducerPath] = reducerToInject;
    reducer = getReducer();
    return combinedReducer;
  };
  const selector = Object.assign(
    function makeSelector(selectorFn, selectState) {
      return function selector2(state, ...args) {
        return selectorFn(
          createStateProxy(
            selectState ? selectState(state, ...args) : state,
            reducerMap
          ),
          ...args
        );
      };
    },
    { original: original2 }
  );
  return Object.assign(combinedReducer, { inject, selector });
}

export {
  actionTypes_default,
  createStore,
  legacy_createStore,
  combineReducers,
  bindActionCreators,
  compose,
  applyMiddleware,
  isDraft,
  isDraftable,
  original,
  freeze,
  current,
  enablePatches,
  produce,
  produceWithPatches,
  applyPatches,
  defaultMemoize,
  autotrackMemoize,
  weakMapMemoize,
  createSelectorCreator,
  createSelector,
  createDraftSafeSelectorCreator,
  createDraftSafeSelector,
  isPlainObject3 as isPlainObject,
  createAction,
  isAction,
  isActionCreator,
  isFSA,
  createActionCreatorInvariantMiddleware,
  Tuple,
  isImmutableDefault,
  createImmutableStateInvariantMiddleware,
  isPlain,
  findNonSerializableValue,
  createSerializableStateInvariantMiddleware,
  SHOULD_AUTOBATCH,
  prepareAutoBatched,
  autoBatchEnhancer,
  configureStore,
  createReducer,
  nanoid,
  miniSerializeError,
  createAsyncThunk,
  unwrapResult,
  createSlice,
  createEntityAdapter,
  isAnyOf,
  isAllOf,
  isPending,
  isRejected,
  isRejectedWithValue,
  isFulfilled,
  isAsyncThunkAction,
  TaskAbortError,
  addListener,
  clearAllListeners,
  removeListener,
  createListenerMiddleware,
  createDynamicMiddleware,
  combineSlices
};
//# sourceMappingURL=chunk-ALO2XWJO.js.map
