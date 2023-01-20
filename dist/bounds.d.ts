interface BoundingBox {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
}
declare const getBoundingBox: (path: string) => BoundingBox;
export default getBoundingBox;
