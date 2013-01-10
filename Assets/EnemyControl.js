#pragma strict

public var ship_prefab : GameObject;
public var target : Transform;

private var ship_control_script : ShipControl;

private var ship : GameObject;
private var change_heading : float;
private var distance_to_target : float;

public var in_range : float;

function Start () {

	ship = Instantiate(ship_prefab, transform.position, transform.rotation);
	ship.transform.parent = transform;
	ship.name = ship_prefab.name;
	ship_control_script = ship.GetComponent(ShipControl);

}

function Update () {

	var target_ship = target.transform.GetChild(0);

	var lead_target = target_ship.transform.position + target_ship.rigidbody.velocity;

	var diff = lead_target - ship.transform.position;
	var theta =  Mathf.Atan2(diff.x, diff.z) * Mathf.Rad2Deg;

	distance_to_target = diff.magnitude;

	change_heading = Mathf.DeltaAngle(ship.transform.eulerAngles.y, theta);

	// Debug.Log(change_heading);

}

function FixedUpdate () {

	// if ((distance_to_target >= in_range) && (Physics.Raycast(ship.transform.position, ship.transform.forward))) {
	if ((distance_to_target >= in_range) && (Mathf.Abs(change_heading) <= 5)) {
		ship_control_script.Thrust();
	}
	else if (distance_to_target < in_range) {
		ship_control_script.Shoot();
		ship_control_script.Stabilize();
	}
	else {
		ship_control_script.Stabilize();
	}

	ship_control_script.Rotate(change_heading);

}