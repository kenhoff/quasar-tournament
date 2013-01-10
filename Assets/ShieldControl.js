#pragma strict

function Start () {

}

function Update () {
	Debug.Log(renderer.material.color);
	Debug.Log(collider);
}

function OnCollisionStay (collision : Collision) {
	Debug.Log("hello");
}
function OnCollisionEnter(collision : Collision) {
	Debug.Log("hello");

}
function OnCollisionExit (collision : Collision) {
	Debug.Log("hello");
}

function OnTriggerStay () {
	Debug.Log("trigger");
}
function OnTriggerEnter () {
	Debug.Log("trigger");
}function OnTriggerExit () {
	Debug.Log("trigger");
}