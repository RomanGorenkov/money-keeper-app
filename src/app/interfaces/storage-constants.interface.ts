import { UserPresets } from '../pages/authorization/interfaces/user-presets.interface';

type storageKeys = 'token' | 'costsColors';

export interface StorageConstants<T> {
  presets: UserPresets;
  // [key in storageKeys]: string;

}



export type StorageConstantsType<T> = StorageConstants<T> & {
  presets: UserPresets;
};

