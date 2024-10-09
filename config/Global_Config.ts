import * as globalVariables from './variables_globales';
export class GlobalConfig {
  private static instance: GlobalConfig;
  private config: typeof globalVariables;

  private constructor() {
    this.config = globalVariables;
  }

  public static getInstance(): GlobalConfig {
    if (!GlobalConfig.instance) {
      GlobalConfig.instance = new GlobalConfig();
    }
    return GlobalConfig.instance;
  }

  public get<K extends keyof typeof globalVariables>(key: K): typeof globalVariables[K] {
    return this.config[key];
  }

  // Método opcional para obtener todas las configuraciones
  public getAllConfig(): typeof globalVariables {
    return this.config;
  }
}