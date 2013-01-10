#pragma strict

public var life : float;

private var time_alive : float;

function Start () {
	time_alive = life;
}

function Update () {
	if (time_alive <= 0) {
		Destroy (gameObject);
	}
	time_alive -= Time.deltaTime;
}

function OnCollisionEnter (collision : Collision) {
	Destroy (gameObject);
}