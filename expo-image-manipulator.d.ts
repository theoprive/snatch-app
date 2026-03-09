declare module 'expo-image-manipulator' {
  export enum SaveFormat {
    JPEG = 'jpeg',
    PNG = 'png',
    WEBP = 'webp',
  }

  export interface ManipulateAction {
    resize?: { width: number; height: number };
    rotate?: number;
    flip?: { vertical?: boolean; horizontal?: boolean };
    crop?: { originX: number; originY: number; width: number; height: number };
  }

  export interface ManipulateOptions {
    compress?: number;
    format?: SaveFormat;
    base64?: boolean;
  }

  export interface ManipulateResult {
    uri: string;
    width: number;
    height: number;
    base64?: string;
  }

  export function manipulateAsync(
    uri: string,
    actions: ManipulateAction[],
    saveOptions?: ManipulateOptions
  ): Promise<ManipulateResult>;
}
