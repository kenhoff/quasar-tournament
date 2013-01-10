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
public var ship_weapon_object1 : GameObject;
public var ship_weapon_object2 : GameObject;
public var ship_projectile_prefab : GameObject;
public var shot_force : float;
public var shot_frequency : float;

private var time_since_shot : float = 0;

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

    Shoot();

    

}

function FixedUpdate () {
	if (Input.GetButton("Fire2")) {
		rigidbody.AddForce((worldPos - transform.position).normalized * ship_thrust_force);
	}

	var add_torque_value = mouse_diff * ship_turn_force;
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

function Shoot () {
	if (Input.GetButton("Fire1")) {
		if (time_since_shot >= (1 / shot_frequency)) {
			var position1 = ship_weapon_object1.transform.position;
			var position2 = ship_weapon_object2.transform.position;
			position1.y = 0;
			position2.y = 0;
			var clone = Instantiate(ship_projectile_prefab, position1, transform.rotation);
			clone.rigidbody.velocity = rigidbody.velocity;
			clone.rigidbody.AddForce(transform.forward * shot_force);
			clone = Instantiate(ship_projectile_prefab, position2, transform.rotation);
			clone.rigidbody.velocity = rigidbody.velocity;
			clone.rigidbody.AddForce(transform.forward * shot_force);
			time_since_shot = 0;
		}
	}
	time_since_shot += Time.deltaTime;
}