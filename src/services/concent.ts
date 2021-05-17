// concent Some related public wrapper functions

import type {
  ReducerCallerParams,
  IReducerFn,
  IActionCtxBase,
  MODULE_DEFAULT,
  ICtxBase,
  IAnyObj,
  SettingsType,
  ComputedValType,
  SetupFn,
  MultiComputed
} from 'concent'
import {
  useConcent,
  reducer,
  getState as getSt,
  getGlobalState as getGst,
  emit,
  getComputed,
  cst
} from 'concent'

import type { CtxM, CtxMConn, CtxConn, Modules, RootRd, RootState, RootCu } from '../types/store'
import type { EvMap } from '../types/eventMap'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function noop (...args: any[]) {}

function priBuildCallParams (
  moduleName: string,
  connect: Modules[],
  options?: Options<any, any, any, any, any, any>
) {
  const targetOptions = options || {}
  const {
    setup,
    tag,
    extra,
    staticExtra,
    cuDesc,
    passCuDesc = true,
    props = {},
    ccClassKey
  } = targetOptions
  const regOpt = {
    module: moduleName,
    connect,
    setup,
    props,
    tag,
    extra,
    staticExtra,
    cuDesc: null as any
  }
  if (passCuDesc) regOpt.cuDesc = cuDesc
  return { regOpt, ccClassKey }
}

/**
 * Call the target function, used to dock the ghost function in the reducer
 *
 * @param callerParams
 * @param actionCtx
 */
export async function callTarget (
  callerParams: ReducerCallerParams | [IReducerFn, any],
  actionCtx: IActionCtxBase
) {
  try {
    /** Support internal call actionCtx.dispatch(loading, [targetFn, payload]) in reducer file */
    if (Array.isArray(callerParams)) {
      const [fn, payload] = callerParams
      await actionCtx.dispatch(fn, payload)
    } else {
      const { fnName, payload, renderKey, delay } = callerParams
      await actionCtx.dispatch(fnName, payload, renderKey, delay)
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('callTarget error:', err.message)
  }
}

export interface ValidSetup {
  (ctx: ICtxBase): IAnyObj | void;
}
export interface ValidMapProps {
  (ctx: ICtxBase): IAnyObj;
}
export interface OptionsBase<
  P extends IAnyObj,
  CuDesc extends MultiComputed<any>,
  Extra extends IAnyObj,
  StaticExtra extends any,
  Mp extends ValidMapProps
> {
  props?: P;
  tag?: string;
  ccClassKey?: string;
  extra?: Extra;
  staticExtra?: StaticExtra;
  /** A legacy parameter, docked with useConcent's mapProps, it will be called
   *  every round of rendering, and the returned result can be obtained through ctx.mapped */
  mapProps?: Mp;
  cuDesc?: CuDesc;
  /**
    * Whether to pass cuSpec transparently to the useConcent function, the default is true,
    * Indicates that transparent transmission is required. At this time, the user does not need to call ctx.computed(cuSpec) in the setup function body
    * If the user sets passCuSpec to false, it means that cuSpec is passed in for the convenience of deriving the refComputed type, but cuSpec is not transparently passed to the useConcent function
    * Note that at this time, the user needs to call ctx.computed(cuSpec) in the setup function body to complete the definition of the example calculation function.
    * Otherwise, the real calculation result will not be available in refComputed
  */
  passCuDesc?: boolean;
}
export interface Options<
  P extends IAnyObj,
  Setup extends ValidSetup,
  CuDesc extends MultiComputed<any>,
  Extra extends IAnyObj,
  StaticExtra extends any,
  Mp extends ValidMapProps
> extends OptionsBase<P, CuDesc, Extra, StaticExtra, Mp> {
  setup?: Setup;
}

/**
 * Belongs to a module
 * use the target model context you want by passing a module name
 * If you need to use it globally and anywhere, you can use useC2Mod('xx') to export the xx module context.，
 * The module needs to be explicitly exported in src/models/index.js
 *
 * -----------------------[Code example]-----------------------
 * // models/index.ts Export
 * import somePageModel from 'pages/SomePage/model';
 * import someCompModel from 'components/SomeComp/model';
 *
 * const allModels = {...somePageModel,  ...someCompModel};
 *
 * export default allModels;
 *
 * // Used in some components
 * import { useC2Mod } from 'services/concent';
 *
 * function DemoComp(){
 *   const ctx = useC2Mod('xxxMod');
 *   return <h1>{ctx.state.hello}</h1>
 * }
 * --------------------------------------------------------------
 * @param moduleName
 * @param options {Options} - Optional parameters, see 'Options' definition
 */
export function useC2Mod<
  M extends Modules,
  Setup extends ValidSetup,
  P extends IAnyObj,
  CuDesc extends MultiComputed<any>,
  Extra extends IAnyObj,
  StaticExtra extends any,
  Mp extends ValidMapProps
> (moduleName: M, options?: Options<P, Setup, CuDesc, Extra, StaticExtra, Mp>) {
  const { regOpt, ccClassKey } = priBuildCallParams(moduleName, [], options)
  type Ctx = CtxM<
    P,
    M,
    SettingsType<Setup>,
    ComputedValType<CuDesc>,
    [Extra, StaticExtra, ReturnType<Mp>]
  >;
  return useConcent<Record<string, unknown>, Ctx>(regOpt, ccClassKey)
}

/** Belong to a certain module, connect multiple modules */
export function useC2ModConn<
  M extends Modules,
  Conn extends Modules[],
  Setup extends ValidSetup,
  P extends IAnyObj,
  CuDesc extends MultiComputed<any>,
  Extra extends IAnyObj,
  StaticExtra extends any,
  Mp extends ValidMapProps
> (moduleName: M, connect: Conn, options?: Options<P, Setup, CuDesc, Extra, StaticExtra, Mp>) {
  const { regOpt, ccClassKey } = priBuildCallParams(moduleName, connect, options)
  type Ctx = CtxMConn<
    P,
    M,
    Conn[number],
    SettingsType<Setup>,
    ComputedValType<CuDesc>,
    [Extra, StaticExtra, ReturnType<Mp>]
  >;
  return useConcent<Record<string, unknown>, Ctx>(regOpt, ccClassKey)
}

/** Connect multiple modules */
export function useC2Conn<
  Conn extends Modules[],
  Setup extends ValidSetup,
  P extends IAnyObj,
  CuDesc extends MultiComputed<any>,
  Extra extends IAnyObj,
  StaticExtra extends any,
  Mp extends ValidMapProps
> (connect: Conn, options?: Options<P, Setup, CuDesc, Extra, StaticExtra, Mp>) {
  const { regOpt, ccClassKey } = priBuildCallParams(cst.MODULE_DEFAULT, connect, options)
  type Ctx = CtxConn<
    P,
    Conn[number],
    SettingsType<Setup>,
    ComputedValType<CuDesc>,
    [Extra, StaticExtra, ReturnType<Mp>]
  >;
  return useConcent<Record<string, unknown>, Ctx>(regOpt, ccClassKey)
}

/**
 * Suitable for scenarios that do not belong to any module, but only set the setup function
 *
 * @param setup
 * @param options - see OptionsBase
 */
export function useSetup<
  T extends SetupFn,
  P extends IAnyObj,
  CuDesc extends MultiComputed<any>,
  Extra extends IAnyObj,
  StaticExtra extends any,
  Mp extends ValidMapProps
> (setup: T, options?: OptionsBase<P, CuDesc, Extra, StaticExtra, Mp>) {
  const mergedOptions = { setup, ...options }
  const { regOpt, ccClassKey } = priBuildCallParams(cst.MODULE_DEFAULT, [], mergedOptions)
  type Ctx = CtxM<
    P,
    MODULE_DEFAULT,
    SettingsType<T>,
    ComputedValType<CuDesc>,
    [Extra, StaticExtra, ReturnType<Mp>]
  >;
  const { settings } = useConcent<Record<string, unknown>, Ctx>(regOpt, ccClassKey)
  return settings
}

/**
 * Is the ctx mark type belonging to a certain module, usually used in class member variables and in the body of the setup function
 * No need to pass the third parameter ctx when using the class component member variable, it will be injected and replaced by concent when the component is instantiated
 * When used in the setup function, you can directly pass in the created ctx
 */
export function typeCtxM<
  M extends Modules,
  Setup extends ValidSetup,
  P extends IAnyObj,
  CuDesc extends MultiComputed<any>,
  Extra extends IAnyObj,
  StaticExtra extends any,
  Mp extends ValidMapProps
> (moduleName: M, options?: Options<P, Setup, CuDesc, Extra, StaticExtra, Mp>, ctx?: any) {
  noop(moduleName, options)
  type Ctx = CtxM<
    P,
    M,
    SettingsType<Setup>,
    ComputedValType<CuDesc>,
    [Extra, StaticExtra, ReturnType<Mp>]
  >;
  return (ctx || {}) as Ctx
}

/**
 * The factory function of useC2Mod, while returning the hook function, also provides an auxiliary function to help derive the ctx parameter type of the setup function
 * Note! This factory function is only applicable to the setup function. The ctx parameter does not need to be aware of props and extra types before it can be used
 *
 * @param moduleName
 * @param options
 * -----------------------[Code example]-----------------------
 * const ret = makeUseC2Mod("Counter");
 * function setupA1(c: any) {
 *   const ctx = ret.typeCtx(c);
 *   const cu = ctx.computed({countX6: (n) => n.value * 6 });
 *   return { cu };
 * }
 *
 * export function UseC2ModByFactory() {
 *   const ctx = ret.useC2Mod({ setup: setupA1 });
 *   return <h1>{ctx.state.bigValue} {ctx.settings.cu.countX6}</h1>
 * }
 * --------------------------------------------------------------
 */
export function makeUseC2Mod<M extends Modules> (moduleName: M) {
  return {
    /** The setup function that needs to be passed in */
    useC2Mod: <
      Setup extends ValidSetup,
      P extends IAnyObj,
      CuDesc extends MultiComputed<any>,
      Extra extends IAnyObj,
      StaticExtra extends any,
      Mp extends ValidMapProps
    >(
      options?: Options<P, Setup, CuDesc, Extra, StaticExtra, Mp>
    ) => {
      const { regOpt, ccClassKey } = priBuildCallParams(moduleName, [], options)
      type Ctx = CtxM<
        P,
        M,
        SettingsType<Setup>,
        ComputedValType<CuDesc>,
        [Extra, StaticExtra, ReturnType<Mp>]
      >;
      return useConcent<P, Ctx>(regOpt, ccClassKey)
    },
    /** Derive the ctx parameter type of the setup function */
    typeCtx: (ctx: ICtxBase) => {
      return ctx as CtxM<Record<string, unknown>, M>
    }
  }
}

export const ccReducer = (reducer as unknown) as RootRd

/**
 * Get the status of the global module
 * Where there is already a concent model context and an action context,
 * It is recommended to get it directly instead of calling this function, because the component will not subscribe to data changes when getting the data directly
 */
export function getGlobalState () {
  const globalState = getGst<RootState>()
  return globalState
}

/**
 * Get the entire root state
 * Note that the component will not subscribe to data changes when the data is directly obtained
 */
export function getRootState () {
  const rootState = getSt() as RootState
  return rootState
}

/**
 * Get the status of the target module
 * Note that the component will not subscribe to data changes when the data is directly obtained
 */
export function getModelState<T extends Modules> (modelName: T) {
  const modelState = getSt(modelName) as RootState[T]
  return modelState
}

/** Get target module status */
export function getModelComputed<T extends Modules> (modelName: T) {
  const modelComputed = getComputed(modelName) as RootCu[T]
  return modelComputed
}

type EvKeys = keyof EvMap;

/**
 * Launch event
 *
 * @param eventName - Event name
 * @param args
 */
export function ccEmit<E extends EvKeys, T extends EvMap[E]> (eventName: E, ...args: T) {
  emit(eventName, ...args)
}

/**
 * Launch event carrying id
 *
 * @param eventDesc - [eventName, id]
 * @param args
 */
export function ccEmitId<E extends EvKeys, T extends EvMap[E]> (eventDesc: [E, string], ...args: T) {
  emit(eventDesc, ...args)
}

type OnFn = <E extends EvKeys>(eventName: E, cb: (...args: EvMap[E]) => void) => void;

/**
 * With EvMap, it is ctx.on assembly type
 * Passing in the specific event name when calling externally will deduce the parameter list type of the cb function
 *
 * function setup(ctx: Ctx){
 * const on = ctxOn(ctx);
 * on('xxx',(a, b)=>{
 * // Here ts can perceive the specific types of a and b
 * })
 *}
 */
export function ctxOn (ctx: ICtxBase) {
  return ctx.on as OnFn
}

type OnIdFn = <E extends EvKeys>(eventDesc: [E, string], cb: (...args: EvMap[E]) => void) => void;

/**
 * Ctx.on that can carry id
 *
 * @param ctx
 */
export function ctxOnId (ctx: ICtxBase) {
  return ctx.on as OnIdFn
}
