#pragma strict

public var range : float;
public var payload : float;
public var exit_speed : float;

private var time_alive : float;

function Start () {
	time_alive = (range / exit_speed);
	// Debug.Log(rigidbody.velocity.magnitude);

}

function Update () {
	// Debug.Log(rigidbody.velocity.magnitude);
	if (time_alive <= 0) {
		Destroy (gameObject);
	}
	time_alive -= Time.deltaTime;
}

function OnCollisionEnter (collision : Collision) {
	Destroy (gameObject);
}