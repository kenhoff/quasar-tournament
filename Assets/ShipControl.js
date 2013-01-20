#pragma strict

public var ship_turn_force : float;
public var ship_thrust_force : float;
public var ship_maneuver_force : float;
public var shot_force : float;
public var shot_frequency : float;

// public var ship_body_object : GameObject;
public var ship_engine_object : GameObject;
public var ship_weapon_object1 : GameObject;
public var ship_weapon_object2 : GameObject;
public var ship_shield_object : GameObject;
public var ship_projectile_prefab : GameObject;

public var accuracy : float;

public var max_shield : float;
public var max_armor : float;
public var max_hull : float;

public var shield_health : float;
public var armor_health : float;
public var hull_health : float;

public var shield_recharge_time : float;
public var shield_recharge_rate : float;
private var shield_downtime : float;

private var shield_control_script : ShieldControl;

private var time_since_shot : float = 0;

private var particles_count : int = 150;

public var debris_object_prefab : GameObject;


function Start () {
	shield_control_script = ship_shield_object.GetComponent(ShieldControl);
	ship_shield_object.SetActive(false);
	rigidbody.SetDensity(4.5);
	ship_shield_object.SetActive(true);
}

function Update () {

	Debug.Log(rigidbody.mass);
	// Debug.Log(shield_health);
	if (shield_health > max_shield) {
		shield_health = max_shield;
	}

	if (shield_health <= 0) {
		shield_health = 0;
		if (ship_shield_object.activeSelf) {
			ship_shield_object.SetActive(false);
		}
	}

	if ((shield_health > 0) && (!ship_shield_object.activeSelf)) {
		ship_shield_object.SetActive(true);
	}

	if (shield_downtime >= shield_recharge_time) {
		shield_health += Time.deltaTime * shield_recharge_rate;
	}

	shield_downtime += Time.deltaTime;
	// Debug.Log(shield_downtime);

	if (hull_health <= 0) {
		Destroy();
	}

}

function OnCollisionEnter (collisionInfo : Collision) {

	var damage = collisionInfo.relativeVelocity.magnitude;
	if (damage >= shield_health) {
		var armor_damage = damage - shield_health;
		shield_health = 0;
		shield_downtime = 0;
		if (armor_damage > armor_health) {
			var hull_damage = armor_damage - armor_health;
			armor_health = 0;
			hull_health -= hull_damage;
		}
		else armor_health -= armor_damage;

	}
	else shield_health -= damage;
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

function Destroy () {
	var debris = Instantiate(debris_object_prefab, transform.position, transform.rotation);
	for (var i = 0; i < debris.transform.GetChildCount(); i++) {
		var debris_object = debris.transform.GetChild(i); 
		debris_object.rigidbody.velocity = rigidbody.velocity;
		debris_object.rigidbody.AddExplosionForce(300, transform.position, 300);
		debris_object.rigidbody.AddTorque(Random.insideUnitSphere);
	}
	debris.particleSystem.Emit(500);
	Destroy(gameObject);
}