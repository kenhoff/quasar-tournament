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
	public var accuracy : float;
	public var count : int;
	public var beam_width : float;
	public var beam_life : float;
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

public class missile_parameters extends System.Object {
	public var prefab_object : GameObject;
	public var exit_speed : float;
	public var exit_accuracy : float;
	public var thrust_force : float;
	public var turn_force : float;
	public var rate_of_fire : float;
	public var payload : float;
	public var mass : float;
	public var count : int;
	public var size : float;
	public var range : float;
	public var fuel : float;
	public var explosion_radius : float;
	public var detection_radius : float;
	public var explosion_force : float;
}

public var beam = beam_parameters();
public var pulse = pulse_parameters();
public var projectile = projectile_parameters();
public var missile = missile_parameters();

private var shield_object : GameObject;
private var ship_object : GameObject;
private var body_object : GameObject;

private var time_since_shot : float;
private var time_between_shots : float;

function Start () {
	switch (weapon_type) {
		case weapon_type.Beam:
			time_between_shots = 1/beam.rate_of_fire;
			break;
		case weapon_type.Pulse:
			time_between_shots = 1/pulse.rate_of_fire;
			break;
		case weapon_type.Projectile:
			time_between_shots = 1/projectile.rate_of_fire;
			ProjectileShoot();
			break;
		case weapon_type.Missile:
			time_between_shots = 1/missile.rate_of_fire;
			break;
	}

	ship_object = transform.parent.gameObject;
	shield_object = ship_object.transform.GetComponent(ShipControl).ship_shield_object;
	body_object = ship_object.transform.GetComponent(ShipControl).ship_body_object;

}

function Update () {
	time_since_shot += Time.deltaTime;
}

function WeaponShoot () {
	switch (weapon_type) {
		case weapon_type.Beam:
			BeamShoot();
			break;
		case weapon_type.Pulse:
			PulseShoot();
			break;
		case weapon_type.Projectile:
			ProjectileShoot();
			break;
		case weapon_type.Missile:
			MissileShoot();
			break;
	}
	
}

function BeamShoot () {
	if (time_since_shot > time_between_shots) {
		for (var i = 0; i < beam.count; i++) {
			var exit_point = transform.position;
			var exit_angle = Random.Range(-beam.accuracy, beam.accuracy);

			var shot = Instantiate(beam.prefab_object, exit_point, ship_object.transform.rotation);
			shot.transform.eulerAngles.y += exit_angle;
			shot.transform.parent = transform;

			shot.transform.GetComponent(BeamControl).range = beam.range;
			shot.transform.GetComponent(BeamControl).life = beam.beam_life;
			shot.transform.GetComponent(BeamControl).width = beam.beam_width;
			shot.transform.GetComponent(BeamControl).damage = beam.damage;

			time_since_shot = 0;
		}
	}
}

function PulseShoot () {
	var shots = new Array();
	if (time_since_shot > time_between_shots) {
		for (var i = 0; i < pulse.count; i++) {
			var exit_point = transform.position;
			var exit_angle = Random.Range(-pulse.accuracy, pulse.accuracy);

			var shot = Instantiate(pulse.prefab_object, exit_point, ship_object.transform.rotation);
			shot.transform.eulerAngles.y += exit_angle;
			shot.transform.parent = transform;
			shot.transform.localScale = pulse.size * Vector3.one;


			if (shield_object.collider.enabled) {
				Physics.IgnoreCollision(shot.collider, shield_object.collider);
			}
			Physics.IgnoreCollision(shot.collider, ship_object.collider);
			for (previous_shot in shots) {
				Physics.IgnoreCollision(shot.collider, previous_shot.collider);
			}
			shots.push(shot);
			var force = pulse.exit_speed * shot.rigidbody.mass;
			shot.rigidbody.velocity = ship_object.rigidbody.velocity;
			shot.rigidbody.AddForce(force * shot.transform.forward, ForceMode.Impulse);
			
			shot.transform.GetComponent(PulseControl).range = pulse.range;
			shot.transform.GetComponent(PulseControl).exit_speed = pulse.exit_speed;
			shot.transform.GetComponent(PulseControl).payload = pulse.payload;

			time_since_shot = 0;
		}
	}
}

function ProjectileShoot () {
	var shots = new Array();
	if (time_since_shot > time_between_shots) {
		for (var i = 0; i < projectile.count; i++) {
			var exit_point = transform.position;
			var exit_angle = Random.Range(-projectile.accuracy, projectile.accuracy);

			var shot = Instantiate(projectile.prefab_object, exit_point, ship_object.transform.rotation);
			shot.transform.eulerAngles.y += exit_angle;
			shot.transform.parent = transform;
			shot.transform.localScale = projectile.size * Vector3.one;

			shot.rigidbody.mass = projectile.mass;

			if (shield_object.collider.enabled) {
				Physics.IgnoreCollision(shot.collider, shield_object.collider);
			}
			Physics.IgnoreCollision(shot.collider, ship_object.collider);
			for (previous_shot in shots) {
				Physics.IgnoreCollision(shot.collider, previous_shot.collider);
			}
			shots.push(shot);

			var force = projectile.exit_speed * projectile.mass;
			shot.rigidbody.velocity = ship_object.rigidbody.velocity;
			shot.rigidbody.AddForce(force * shot.transform.forward, ForceMode.Impulse);
			ship_object.rigidbody.AddForce(-force * shot.transform.forward, ForceMode.Impulse);
			
			shot.transform.GetComponent(ProjectileControl).range = projectile.range;
			shot.transform.GetComponent(ProjectileControl).exit_speed = projectile.exit_speed;

			time_since_shot = 0;
		}
	}
}

function MissileShoot () {
	var shots = new Array();
	if (time_since_shot > time_between_shots) {
		for (var i = 0; i < missile.count; i++) {
			var exit_point = transform.position;
			var exit_angle = Random.Range(-missile.exit_accuracy, missile.exit_accuracy);

			var shot = Instantiate(missile.prefab_object, exit_point, ship_object.transform.rotation);
			shot.transform.eulerAngles.y += exit_angle;
			shot.transform.parent = transform;
			shot.transform.localScale = missile.size * Vector3.one;

			shot.rigidbody.mass = missile.mass;

			if (shield_object.collider.enabled) {
				Physics.IgnoreCollision(shot.collider, shield_object.collider);
			}
			Physics.IgnoreCollision(shot.collider, ship_object.collider);
			for (previous_shot in shots) {
				Physics.IgnoreCollision(shot.collider, previous_shot.collider);
			}
			shots.push(shot);

			var force = missile.exit_speed * missile.mass;
			shot.rigidbody.velocity = ship_object.rigidbody.velocity;
			shot.rigidbody.AddForce(force * shot.transform.forward, ForceMode.Impulse);
			ship_object.rigidbody.AddForce(-force * shot.transform.forward, ForceMode.Impulse);
			
			var missile_control_script = shot.transform.GetComponent(MissileControl);
			missile_control_script.fuel = missile.fuel;

			missile_control_script.thrust_force = missile.thrust_force;
			missile_control_script.turn_force = missile.turn_force;
			missile_control_script.explosion_radius = missile.explosion_radius;
			missile_control_script.payload = missile.payload;
			missile_control_script.explosion_force = missile.explosion_force;
			// shot.transform.GetComponent(MissileControl).exit_speed = missile.exit_speed;

			time_since_shot = 0;
		}
	}
}