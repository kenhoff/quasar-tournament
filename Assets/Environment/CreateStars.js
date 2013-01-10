#pragma strict

public var star_prefab : GameObject;
public var number_of_stars : int;
public var radius : float;

private var max_dist : float = 300;
private var min_dist : float = 100;


function Start () {

	for (var i : int = 0; i < number_of_stars; i++) {
		var location = Vector3(Random.Range(-radius, radius), Random.Range(-max_dist, -min_dist), Random.Range(-radius, radius));
    	var clone = Instantiate (star_prefab, location, Quaternion.identity);
    	clone.transform.parent = transform;
	}
}

function Update () {

}