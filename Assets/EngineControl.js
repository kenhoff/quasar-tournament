#pragma strict

public var throttle_speed : float;
public var turn_force : float;
public var thrust_force : float;
private var maneuver_force : float;

private var throttle : float; // 0 to 1
private var ship_object : GameObject;
private var particles_count : int = 200;

function Start () {
	ship_object = transform.parent.gameObject;
	// Debug.Log("engine ship object" + ship_object);
	throttle = 0;
	maneuver_force = turn_force / 2;
}

function FixedUpdate () {
	
	throttle -= throttle_speed * Time.deltaTime; // throttle decreases while not thrusting
	if (throttle < 0) {
		throttle = 0;
	}
	if (throttle > 1) {
		throttle = 1;
	}
	ship_object.rigidbody.AddForce(ship_object.transform.forward * thrust_force * Time.deltaTime * throttle);
	particleSystem.Emit(particles_count * Time.deltaTime * throttle);
	// Debug.Log(throttle);

}

function EngineThrust () {
	throttle += 2 * (throttle_speed * Time.deltaTime); // increase throttle at 2x rate to compensate for constant decreasing
}

function EngineRotate (change_heading : float) {
	var torque = change_heading * turn_force * Time.deltaTime;
	if (ship_object) {
		ship_object.rigidbody.AddTorque(Vector3(0, torque, 0));
	}
}

function EngineManeuver (horizontal_input : float, vertical_input : float) {
	if (ship_object) {
		ship_object.rigidbody.AddForce(Vector3.right * horizontal_input * maneuver_force * Time.deltaTime);
		ship_object.rigidbody.AddForce(Vector3.forward * vertical_input * maneuver_force * Time.deltaTime);
	}
}

function EngineStabilize () {
	ship_object.rigidbody.AddForce(-ship_object.rigidbody.velocity * maneuver_force * .01);
}