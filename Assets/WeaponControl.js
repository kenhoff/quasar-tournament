// #pragma strict

public enum WeaponType {
	Beam,
	Pulse,
	Projectile,
	Missile,
}

public var weapon_type : WeaponType;

public class beam_parameters extends System.Object {
	public var prefab_object : GameObject;
	public var rate_of_fire : float;
	public var range : float;
	public var damage : float;
	public var size : float;
	public var accuracy : float;
	public var count : int;
	public var beam_width : float;
	public var beam_life : float;
} 

public class projectile_parameters extends System.Object {
	public var prefab_object : GameObject;
	public var rate_of_fire : float;
	public var exit_speed : float;
	public var range : float;
	public var mass : float;
	public var size : float;
	public var accuracy : float;	
	public var count : int;
}

public class pulse_parameters extends System.Object {
	public var prefab_object : GameObject;
	public var rate_of_fire : float;
	public var exit_speed : float;
	public var range : float;
	public var payload : float;
	public var size : float;
	public var accuracy : float;
	public var count : int;
}

public class missile_parameters extends System.Object {
	public var exit_speed : float;
	public var exit_accuracy : float;
	public var max_thrust_force : float;
	public var max_turn_force : float;
	public var tracking : float; // ??????????????
	public var rate_of_fire : float;
	public var payload : float;
	public var missile_mass : float;
}

public var beam = beam_parameters();
public var pulse = pulse_parameters();
public var projectile = projectile_parameters();
public var missile = missile_parameters();








// public var weapon_exit : Transform;



private var shield_object : GameObject;
private var ship_object : GameObject;
private var body_object : GameObject;

private var time_since_shot : float;
private var time_between_shots : float;

function Start () {
	// Debug.Log("started");

	time_between_shots = 1/projectile.rate_of_fire;
	// Debug.Log(time_between_shots);

	ship_object = transform.parent.gameObject;
	// Debug.Log(ship_object);
	shield_object = ship_object.transform.GetComponent(ShipControl).ship_shield_object;
	body_object = ship_object.transform.GetComponent(ShipControl).ship_body_object;
	// Debug.Log(shield_object);

}

function Update () {
	time_since_shot += Time.deltaTime;

}

function Shoot () {
	var shots = new Array();
	if (time_since_shot > time_between_shots) {
		for (var i = 0; i < projectile.count; i++) {
			// Debug.Log("bang");
			var exit_point = transform.position;
			var exit_angle = Random.Range(-projectile.accuracy, projectile.accuracy);

			var shot = Instantiate(projectile.prefab_object, exit_point, ship_object.transform.rotation);
			shot.transform.eulerAngles.y += exit_angle;
			shot.transform.parent = transform;
			shot.transform.localScale = projectile.size * Vector3.one;

			shot.rigidbody.mass = projectile.mass;

			if (shield_object.collider.enabled) {
				// Debug.Log(shot.collider);
				// Debug.Log(shield_object.collider);
				Physics.IgnoreCollision(shot.collider, shield_object.collider);
			}
			Physics.IgnoreCollision(shot.collider, body_object.collider);
			for (previous_shot in shots) {
				Physics.IgnoreCollision(shot.collider, previous_shot.collider);
			}
			shots.push(shot);

			var force = projectile.exit_speed * projectile.mass;

			shot.rigidbody.AddForce(force * shot.transform.forward, ForceMode.Impulse);
			ship_object.rigidbody.AddForce(-force * shot.transform.forward, ForceMode.Impulse);
			
			shot.transform.GetComponent(ProjectileControl).range = projectile.range;

			time_since_shot = 0;
		}
	}
}