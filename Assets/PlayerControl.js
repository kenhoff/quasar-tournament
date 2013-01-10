#pragma strict

public var ship_prefab : GameObject;
public var camera_object : GameObject;
public var camera_zoom : float;
public var camera_zoom_rate : float;

private var ship_control_script : ShipControl;

private var ship : GameObject;
private var change_heading : float;


function Start () {

	ship = Instantiate(ship_prefab, transform.position, transform.rotation);
	ship.transform.parent = transform;
	ship.name = ship_prefab.name;
	ship_control_script = ship.GetComponent(ShipControl);

}

function Update () {

	// control camera position

	camera_object.transform.position = ship.transform.position + Vector3(0, camera_zoom, 0);

	var change = -Input.GetAxis("Mouse ScrollWheel") * camera_zoom_rate;
	camera_zoom += change;
	if (camera_zoom < 1) camera_zoom = 1; 


	// find angle between ship and mouse cursor

	var cameraDif = camera_object.transform.position.y - transform.position.y;

    var worldPos = camera_object.camera.ScreenToWorldPoint(Vector3(Input.mousePosition.x, Input.mousePosition.y, cameraDif));

    Debug.DrawLine(camera_object.transform.position, worldPos);
    Debug.DrawRay(transform.position, transform.forward * 5, Color.blue);

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

	ship_control_script.Rotate(change_heading);

	var vertical_input = Input.GetAxis("Vertical") * Time.deltaTime;
	var horizontal_input = Input.GetAxis("Horizontal") * Time.deltaTime;

	ship_control_script.Maneuver(horizontal_input, vertical_input);
}