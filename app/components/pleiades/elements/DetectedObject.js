import * as BABYLON from 'babylonjs';
import { Size } from 'babylonjs';
// import * as Materials from 'babylonjs-materials';

export default class AugmentaObject {
    id;
    color;
    // material: BABYLON.Material;
    mesh;
    parent;

    constructor(id, scene) {
        this.id = id; 
        this.color = BABYLON.Color3.Random().toColor4();
        // this.material = new Materials.GridMaterial.
        let box = BABYLON.MeshBuilder.CreateBox(
            "object-"+id,
            {
                height: 0.6, 
                width: 0.6, 
                depth: 1.7,
                faceColors : [
                    new BABYLON.Color4(0.0,0.0,0.0,0.0),
                    new BABYLON.Color4(0.0,0.0,0.0,0.0),
                    new BABYLON.Color4(0.0,0.0,0.0,0.0),
                    new BABYLON.Color4(0.0,0.0,0.0,0.0),
                    new BABYLON.Color4(0.0,0.0,0.0,0.0),
                    new BABYLON.Color4(0.0,0.0,0.0,0.0)
                ]
            }, scene
        );
        box.enableEdgesRendering();
        box.edgesWidth = 4.0;
        box.edgesColor = this.color;

        this.mesh = box
        // this.mesh.position.set(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z -= 1.7/2);

        // this.parent = BABYLON.MeshBuilder.CreatePlane(box.name + "-parent", {size: .1},scene);
        // this.parent.addChild(this.mesh);

    }

    setPosition(newPos) {
        this.mesh.position = newPos;
        // this.parent.position = newPos;
    }

    getHeight(){
        const bounds = this.mesh.getBoundingInfo();
        return bounds.maximum.z - bounds.minimum.z;
    }
}