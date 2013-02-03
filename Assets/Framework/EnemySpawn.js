#pragma strict

static var number_of_enemies : int;
public var max_enemies : int;

public var enemy_prefab : GameObject;

public var time_between_spawns : float;

private var time_since_spawn : float;

function Start () {

}

function Update () {
	if ((time_since_spawn > time_between_spawns) && (number_of_enemies < max_enemies)) {
		Instantiate(enemy_prefab, transform.position, transform.rotation);
		time_since_spawn = 0;
	}
	time_since_spawn += Time.deltaTime;

	number_of_enemies = GameObject.FindGameObjectsWithTag("Enemy").length;
	// Debug.Log(number_of_enemies);

}