#pragma strict

// public var ship_turn_force : float;
// public var ship_maneuver_force : float;

public var ship_engine_object : GameObject;
public var ship_weapon_root : GameObject;

public var ship_shield_object : GameObject;
public var ship_body_object : GameObject;

// public var accuracy : float;

public var max_shield : float;
public var max_armor : float;
public var max_hull : float;

private var shield_health : float;
private var armor_health : float;
private var hull_health : float;

public var shield_recharge_time : float;
public var shield_recharge_rate : float;
private var shield_downtime : float;

private var shield_control_script : ShieldControl;

private var time_since_shot : float = 0;

private var particles_count : int = 150;

public var debris_object_prefab : GameObject;

private var is_player : boolean;


function Start () {
	shield_control_script = ship_shield_object.GetComponent(ShieldControl);
	
	
	
	shield_health = max_shield;
	armor_health = max_armor;
	hull_health = max_hull;

	if (transform.parent.gameObject.tag == "Player") {
		is_player = true;
	}


	// Debug.Log("component : " + rigidbody);
	// Debug.Log("mass during start, before setdensity: " + rigidbody.mass);

	// ship_shield_object.SetActive(false);
	ship_shield_object.collider.enabled = false; 

	rigidbody.SetDensity(4.5);
	// Debug.Log("mass during start, immediately after setdensity: " + rigidbody.mass);
	
	// ship_shield_object.SetActive(true);
	ship_shield_object.collider.enabled = true;
	// Debug.Log("mass at the end of start: " + rigidbody.mass);
}

function Update () {
	// Debug.Log("mass at the start of update: " + rigidbody.mass);


	// DON'T ENABLE/DISABLE THE SHIELD OBJECT (otherwise you'll get mass reset errors)

	if (shield_health > max_shield) {
		shield_health = max_shield;
	}

	if (shield_health <= 0) {
		shield_health = 0;
		if (ship_shield_object.collider.enabled) {
			ship_shield_object.collider.enabled = false;
		}
	}

	if ((shield_health > 0) && (!ship_shield_object.collider.enabled)) {
		ship_shield_object.collider.enabled = true;
	}

	if (shield_downtime >= shield_recharge_time) {
		shield_health += Time.deltaTime * shield_recharge_rate;
	}

	shield_downtime += Time.deltaTime;

	if (hull_health <= 0) {
		Destroy();
	}

	// Debug.Log("mass at the end of update: " + rigidbody.mass);

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
	if (ship_shield_object.activeSelf) {
		shield_control_script.FlashOn();
	}
}

function Fire () {
	// for (var i = 0; i < ship_weapon_root.transform.childCount; i++) {
	ship_weapon_root.GetComponent(WeaponControl).Shoot();
	
}

function Thrust () {
	ship_engine_object.GetComponent(EngineControl).EngineThrust();
}

function Rotate (change_heading : float) {
	ship_engine_object.GetComponent(EngineControl).EngineRotate(change_heading);
}

function Maneuver (horizontal_input : float, vertical_input : float) {
	ship_engine_object.GetComponent(EngineControl).EngineManeuver(horizontal_input, vertical_input);
}

function Stabilize () {
	ship_engine_object.GetComponent(EngineControl).EngineStabilize();

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


function OnGUI () {
	if (is_player) {
		GUI.Label (Rect (10, 10, 100, 20), "Shield: " + Mathf.Floor(shield_health));
		GUI.Label (Rect (10, 30, 100, 20), "Armor: " + Mathf.Floor(armor_health));
		GUI.Label (Rect (10, 50, 100, 20), "Hull: " + Mathf.Floor(hull_health));
	}
}