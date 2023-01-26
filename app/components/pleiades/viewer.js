import Component from '@glimmer/component';

import * as BABYLON from 'babylonjs';
import { Size } from 'babylonjs';
import * as Materials from 'babylonjs-materials';
import AugmentaObject from './elements/DetectedObject';
import AugmentaScene from './elements/AugmentaScene';

export default class PleiadesViewerComponent extends Component {
    canvas;
    engine;
    scene;
    camera;
    gizmo;
    grid;
    origin;
    augmentaScene;
    cameraAnimation;

    constructor(...args) {
        super(...args);
        this.canvas = document.getElementById("viewer");

        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = this.createScene();
        this.camera = this.createCamera();
        this.gizmo = this.createGizmoManager();
        this.grid = this.createGrid();
        this.origin = this.createOrigin();

        this.augmentaScene = new AugmentaScene("scene", this.scene);
        this.camera.setTarget(this.augmentaScene.getFramePoint());

        this.engine.runRenderLoop(() => { this.scene.render(); });
    }


    //Scene Helpers
    resize() {
        this.engine.resize();
    }

    //Camera helpers
    homeCamera() {
        if (this.cameraAnimation != undefined) this.cameraAnimation.stop();
        this.cameraAnimation = BABYLON.Animation.CreateAndStartAnimation("cameraAnim", this.camera, "position", 30, 30, this.camera.position, this.augmentaScene.getFramePoint().add(new BABYLON.Vector3(1, 1, -1).scale(5)), BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    }

    goToTopView() {
        if (this.cameraAnimation != undefined) this.cameraAnimation.stop();
        this.cameraAnimation = BABYLON.Animation.CreateAndStartAnimation("cameraAnim", this.camera, "position", 30, 30, this.camera.position, this.augmentaScene.getFramePoint().add(BABYLON.Vector3.Up().scale(10).add(BABYLON.Vector3.Backward().scale(.001))), BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    }

    //Creation Helpers
    createScene() {
        const scene = new BABYLON.Scene(this.engine);
        scene.clearColor = BABYLON.Color4.FromColor3(BABYLON.Color3.White().scale(.1));
        return scene;
    }

    createCamera() {
        const cam = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(5, 5, -10), this.scene);
        cam.attachControl(this.canvas, true);
        cam.wheelPrecision = 20;
        return cam;
    }


    createGrid() {
        var defaultGridMaterial = new Materials.GridMaterial("gridMaterial", this.scene);
        defaultGridMaterial.mainColor = new BABYLON.Color3(0.0, 0.0, 0.0);
        defaultGridMaterial.lineColor = new BABYLON.Color3(1.0, 1.0, 1.0);
        defaultGridMaterial.opacity = 0.3;
        defaultGridMaterial.gridRatio = 0.1;

        const gridPlane = BABYLON.MeshBuilder.CreateGround("Grid", { width: 100, height: 100 }, this.scene);
        gridPlane.material = defaultGridMaterial;
        return gridPlane;
    }

    createOrigin() {
        const axisColors = [
            new BABYLON.Color4(1, 0.34, 0.35, 1),
            new BABYLON.Color4(0.44, 0.96, 0.57, 1),
            new BABYLON.Color4(0.23, 0.76, 0.95, 1)
        ]

        const lines = [
            BABYLON.MeshBuilder.CreateLines("axisX", { points: [BABYLON.Vector3.Zero(), BABYLON.Vector3.Right()], colors: [axisColors[0], axisColors[0]] }),
            BABYLON.MeshBuilder.CreateLines("axisY", { points: [BABYLON.Vector3.Zero(), BABYLON.Vector3.Up()], colors: [axisColors[1], axisColors[1]] }),
            BABYLON.MeshBuilder.CreateLines("axisZ", { points: [BABYLON.Vector3.Zero(), BABYLON.Vector3.Forward()], colors: [axisColors[2], axisColors[2]] })
        ]

        let o = new BABYLON.TransformNode("origin");
        lines.forEach(line => { line.setParent(o); });
        return o;
    }

    createGizmoManager() {
        const m = new BABYLON.GizmoManager(this.scene);
        m.positionGizmoEnabled = true;
        m.usePointerToAttachGizmos = false;
        return m;
    }
}