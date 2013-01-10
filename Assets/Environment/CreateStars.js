#pragma strict

public var star_prefab : GameObject;
public var number_of_stars : int;
public var radius : float;

private var minimum_distance_below_player : float = 100;


function Start () {

	for (var i : int = 0; i < number_of_stars; i++) {
    	var clone = Instantiate (star_prefab, (Random.insideUnitSphere * radius) - Vector3(0, minimum_distance_below_player + radius, 0), Quaternion.identity);
    	clone.transform.parent = transform;
	}
}

function Update () {

}