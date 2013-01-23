#pragma strict

public var time_to_live : float = 30;

function Start () {
	Destroy(gameObject, time_to_live);
}

function Update () {

}