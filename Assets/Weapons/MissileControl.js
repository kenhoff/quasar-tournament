#pragma strict

public var engine : ParticleSystem;
public var target : Vector3;
public var fuel : float;
public var thrust_force : float;
public var turn_force : float;
public var explosion_radius : float;
public var explosion_force : float;
public var payload : float;


private var time_alive : float;

function Start () {

}

function Update () {
	// if (fuel <= 0) {
	// 	BlowUp();
	// }
}

function FixedUpdate () {
	Thrust();
}

function Thrust () {
	if (fuel > 0) {
		rigidbody.AddForce(transform.forward * thrust_force);
		fuel -= thrust_force * Time.deltaTime;
		// engine.Emit(100);

	}
}

function BlowUp () {
	var colliders = Physics.OverlapSphere(transform.position, explosion_radius);
	for (var hit : Collider in colliders) {
		if (!hit) {
			continue;
		}
		if (hit.rigidbody) {
			hit.rigidbody.AddExplosionForce(explosion_force, transform.position, explosion_radius);
			if (hit.gameObject.tag == "Ship") {
				var ship_pos = hit.gameObject.transform.position;
				var missile_pos = transform.position;
				var dist = (missile_pos - ship_pos).magnitude;
				var falloff = (explosion_radius - dist) / explosion_radius;
				hit.gameObject.GetComponent(ShipControl).Damage(payload * falloff);
			}
		}
	}

	Destroy (gameObject);
}

function OnCollisionEnter () {
	BlowUp();
}

function FindTarget (radius : float) {

}