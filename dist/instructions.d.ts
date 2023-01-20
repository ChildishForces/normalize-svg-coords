import { IPathConfig, PathCommand } from './types';
export declare const transformToInstructionConfig: (instruction: PathCommand, remaining: string[]) => IPathConfig[];
export declare const getPathInstruction: (instruction: string) => PathCommand;
