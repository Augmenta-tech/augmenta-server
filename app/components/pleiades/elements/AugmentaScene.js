import * as BABYLON from 'babylonjs';
import { Size } from 'babylonjs';
// import * as Materials from 'babylonjs-materials';

export default class AugmentaScene extends BABYLON.TransformNode  {
    id;
    color;
    boundingBox;
    size;

    constructor(id, scene) {
        super("scene", scene);

        this.id = id;
        this.size = new BABYLON.Vector3(6, 2, 4);
        this.position = BABYLON.Vector3.Zero();

        var mat = new BABYLON.StandardMaterial("mat", scene);
        mat.alpha = 0;

        this.boundingBox = BABYLON.MeshBuilder.CreateBox("boundingBox", { width: this.size.x, height: this.size.y, depth: this.size.z }, scene);
        this.boundingBox.setParent(this);
        this.boundingBox.material = mat;

        this.boundingBox.position = this.size.scale(.5);

        this.boundingBox.edgesWidth = 1;
        this.boundingBox.edgesColor = new BABYLON.Color4(1, 1, 1, .5);
        this.boundingBox.enableEdgesRendering();

    }

    getFramePoint() {
        return new BABYLON.Vector3(this.boundingBox.position.x, 0, this.boundingBox.position.z).add(this.position);
    }
}