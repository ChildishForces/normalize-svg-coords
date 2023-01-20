import { INormaliseConfig } from './types';
declare const normalize: ({ viewBox, path, min, max, precision, asList, maintainAspectRatio, }: INormaliseConfig) => string | (string | (string | number)[])[];
export default normalize;
