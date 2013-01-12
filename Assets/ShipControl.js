#pragma strict

public var ship_turn_force : float;
public var ship_thrust_force : float;
public var ship_maneuver_force : float;
public var shot_force : float;
public var shot_frequency : float;

public var ship_engine_object : GameObject;
public var ship_weapon_object1 : GameObject;
public var ship_weapon_object2 : GameObject;
public var ship_shield_object : GameObject;
public var ship_projectile_prefab : GameObject;

public var accuracy : float;

private var shield_control_script : ShieldControl;

private var time_since_shot : float = 0;

private var particles_count : int = 150;

function Start () {
	shield_control_script = ship_shield_object.GetComponent(ShieldControl);
}

function OnCollisionEnter () {
	shield_control_script.FlashOn();
}

function OnCollisionExit () {
}

function Shoot () {
	if (time_since_shot >= (1 / shot_frequency)) {
		var position1 = ship_weapon_object1.transform.position;
		var position2 = ship_weapon_object2.transform.position;
		position1.y = 0;
		position2.y = 0;

		var firing_angle1 : float = Random.Range(-accuracy, accuracy);
		var firing_angle2 : float = Random.Range(-accuracy, accuracy);

		var clone = Instantiate(ship_projectile_prefab, position1, transform.rotation);
		clone.transform.eulerAngles.y += firing_angle1;
		clone.transform.parent = ship_weapon_object1.transform;
		clone.rigidbody.velocity = rigidbody.velocity;
		clone.rigidbody.AddForce(clone.transform.forward * shot_force);
		Physics.IgnoreCollision(ship_shield_object.collider, clone.collider);

		clone = Instantiate(ship_projectile_prefab, position2, transform.rotation);
		clone.transform.eulerAngles.y += firing_angle2;
		clone.transform.parent = ship_weapon_object2.transform;
		clone.rigidbody.velocity = rigidbody.velocity;
		clone.rigidbody.AddForce(clone.transform.forward * shot_force);
		Physics.IgnoreCollision(ship_shield_object.collider, clone.collider);
		
		rigidbody.AddForce(-transform.forward * shot_force * 2);

		time_since_shot = 0;
	}
	time_since_shot += Time.deltaTime;
}

function Thrust () {
	rigidbody.AddForce(transform.forward * ship_thrust_force * Time.deltaTime);
	ship_engine_object.particleSystem.Emit(particles_count * Time.deltaTime);
	}

function Rotate (change_heading : float) {
	var add_torque_value = change_heading * ship_turn_force * Time.deltaTime;
	rigidbody.AddTorque(Vector3(0, add_torque_value, 0));
}

function Maneuver (horizontal_input : float, vertical_input : float) {
	rigidbody.AddForce(Vector3.right * horizontal_input * ship_maneuver_force * Time.deltaTime);
	rigidbody.AddForce(Vector3.forward * vertical_input * ship_maneuver_force * Time.deltaTime);
}

function Stabilize () {
	rigidbody.AddForce(-rigidbody.velocity * ship_maneuver_force * .01);
}

