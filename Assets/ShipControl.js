#pragma strict

private var worldPos : Vector3;
private var mouseX : int;
private var mouseY : int;
private var cameraDif : int;

public var cameraobj : GameObject;

function Start () {

    
}

function Update () {

	cameraDif = cameraobj.transform.position.y - transform.position.y;


	mouseX = Input.mousePosition.x;
    mouseY = Input.mousePosition.y;


    //this takes your current camera and defines the world position where your mouse cursor is at the height of your character -->translates your onscreen position of mouse into world coordinates
    worldPos = cameraobj.camera.ScreenToWorldPoint(Vector3(mouseX, mouseY, cameraDif));

    // Debug.Log(worldPos);
    Debug.DrawLine(cameraobj.transform.position, worldPos);

    transform.LookAt(worldPos);

}

function FixedUpdate () {
	if (Input.GetButton("Fire2")) {
		rigidbody.AddForce((worldPos - transform.position).normalized);
	}
	Debug.Log(transform.localRotation);
}