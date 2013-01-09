#pragma strict

public var ship_turn_force : float;
public var ship_thrust_force : float;

private var worldPos : Vector3;
private var mouseX : int;
private var mouseY : int;
private var cameraDif : float;

public var cameraobj : GameObject;

private var mouse_diff : float;

public var ship_engine_object : GameObject;

function Start () {

    
}

function Update () {

	cameraDif = cameraobj.transform.position.y - transform.position.y;


	mouseX = Input.mousePosition.x;
    mouseY = Input.mousePosition.y;

    worldPos = cameraobj.camera.ScreenToWorldPoint(Vector3(mouseX, mouseY, cameraDif));

    Debug.DrawLine(cameraobj.transform.position, worldPos);
    Debug.DrawRay(transform.position, transform.forward * 5, Color.blue);

    var diff = worldPos - transform.position;
    var theta =  Mathf.Atan2(diff.x, diff.z) * Mathf.Rad2Deg;

    mouse_diff = Mathf.DeltaAngle(transform.eulerAngles.y, theta);

    EmitParticles(ship_engine_object);

    Debug.Log(ship_engine_object.particleSystem.isPlaying);

}

function FixedUpdate () {
	if (Input.GetButton("Fire2")) {
		rigidbody.AddForce((worldPos - transform.position).normalized * ship_thrust_force);
	}

	var add_torque_value = mouse_diff * ship_turn_force;
	// Debug.Log(add_torque_value);
	rigidbody.AddTorque(Vector3(0, add_torque_value, 0));

}

function EmitParticles (particle_system_object : GameObject) {
	if (Input.GetButton("Fire2")) {
		particle_system_object.particleSystem.enableEmission = true;
	}
	else {
		particle_system_object.particleSystem.enableEmission = false;
	}
}