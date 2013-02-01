// #pragma strict

public var projectile_prefab : GameObject;

public var rate_of_fire : float;
public var projectile_speed : float;
public var projectile_range : float;
public var projectile_mass : float;
public var projectile_size : float;
public var accuracy : float;

public var weapon_exit : Transform;

private var shield_object : GameObject;
private var ship_object : GameObject;

private var time_since_shot : float;
private var time_between_shots : float;

function Start () {

	time_between_shots = 1/rate_of_fire;

	ship_object = transform.parent.gameObject.transform.parent.gameObject;
	// Debug.Log(ship_object);
	shield_object = ship_object.transform.GetComponent(ShipControl).ship_shield_object;
	// Debug.Log(shield_object);

}

function Update () {
	time_since_shot += Time.deltaTime;

}

function Shoot () {
	if (time_since_shot > time_between_shots) {
		var exit_point = weapon_exit.transform.position;
		var exit_angle = Random.Range(-accuracy, accuracy);

		var shot = Instantiate(projectile_prefab, exit_point, ship_object.transform.rotation);
		shot.transform.eulerAngles.y += exit_angle;
		shot.transform.parent = transform;
		shot.transform.localScale = projectile_size * Vector3.one;

		shot.rigidbody.mass = projectile_mass;

		if (shield_object.activeSelf) {
			Physics.IgnoreCollision(shot.collider, shield_object.collider);
		}

		var force = projectile_speed * projectile_mass;
		

		shot.rigidbody.AddForce(force * shot.transform.forward, ForceMode.Impulse);
		ship_object.rigidbody.AddForce(-force * shot.transform.forward, ForceMode.Impulse);
		
		shot.transform.GetComponent(ProjectileControl).range = projectile_range;

		time_since_shot = 0;

	}
}