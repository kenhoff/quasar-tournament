#pragma strict


public var Player : GameObject;
public var zoom : float = 10;
public var zoom_rate = 5;
private var smooth = 10;

function Start () {

}

function Update () {

	// lerping
	// transform.position = Vector3.Lerp(transform.position, Player.transform.position,  Time.deltaTime * smooth);

	// no lerping
	transform.position = Player.transform.position;

	var change = -Input.GetAxis("Mouse ScrollWheel") * zoom_rate;
	zoom += change;
	if (zoom < 1 ) zoom = 1; 
	transform.position.y = zoom;



}