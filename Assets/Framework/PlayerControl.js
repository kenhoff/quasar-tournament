#pragma strict

public var ship_prefab : GameObject;
public var camera_object : GameObject;
public var camera_zoom : float;
public var camera_zoom_rate : float;
public var follow_ship : boolean;

private var ship_control_script : ShipControl;

private var ship : GameObject;
private var change_heading : float;


function Start () {
	CreateShip();

	// bigger camera area for non-following ship

	if (!follow_ship) camera_zoom = camera_zoom * 4;
}

function CreateShip () {
	ship = Instantiate(ship_prefab, transform.position, transform.rotation);
	ship.transform.parent = transform;
	ship.name = ship_prefab.name;
	ship_control_script = ship.GetComponent(ShipControl);
}

function Update () {

	// respawn if ship is destroyed

	if (Input.GetKeyDown(KeyCode.Backspace) && !ship) {
		CreateShip();
	}


	// control camera position
	if (follow_ship) {
		camera_object.transform.position = ship.transform.position + Vector3(0, camera_zoom, 0);
	}
	else camera_object.transform.position = Vector3(0, camera_zoom, 0);

	var change = -Input.GetAxis("Mouse ScrollWheel") * camera_zoom_rate;
	camera_zoom += change;
	if (camera_zoom < 1) camera_zoom = 1; 



	// find angle between ship and mouse cursor

	var cameraDif = camera_object.transform.position.y - transform.position.y;

	var worldPos = camera_object.camera.ScreenToWorldPoint(Vector3(Input.mousePosition.x, Input.mousePosition.y, cameraDif));

	// Debug.DrawLine(camera_object.transform.position, worldPos);
	// Debug.DrawRay(ship.transform.position, ship.transform.forward * 5, Color.blue);
	Debug.DrawRay(ship.transform.position, ship.rigidbody.velocity);

	var diff = worldPos - ship.transform.position;
	var theta =  Mathf.Atan2(diff.x, diff.z) * Mathf.Rad2Deg;

	change_heading = Mathf.DeltaAngle(ship.transform.eulerAngles.y, theta);





}

function FixedUpdate () {

	if (Input.GetButton("Fire1")) {
		ship_control_script.Shoot();
	}

	if (Input.GetButton("Fire2")) {
		ship_control_script.Thrust();
	}

	if (Input.GetKey(KeyCode.X)) {
		ship_control_script.Stabilize();
	}

	ship_control_script.Rotate(change_heading);

	var vertical_input = Input.GetAxis("Vertical");
	var horizontal_input = Input.GetAxis("Horizontal");

	ship_control_script.Maneuver(horizontal_input, vertical_input);
}

