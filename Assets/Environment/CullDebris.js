#pragma strict

public var time_to_live : float = 30;

private var time_since_hit : float;

function Start () {
	// Destroy(gameObject, time_to_live);
	time_since_hit = 0;
}

function Update () {
	time_since_hit += Time.deltaTime;
	if (time_since_hit >= time_to_live) {
		Destroy(gameObject);
	}
}

function OnCollisionEnter () {
	time_since_hit = 0;
}