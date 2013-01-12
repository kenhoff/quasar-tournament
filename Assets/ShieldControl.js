#pragma strict

private var fade_rate : float = .05;

function Start () {

}

function Update () {
	if (renderer.material.color.a > 1) {
		renderer.material.color.a = 1;
	}
	if (renderer.material.color.a > 0) {
		renderer.material.color.a -= fade_rate;
	}
	if (renderer.material.color.a < 0) {
		renderer.material.color.a = 0;
	}
	
}

function FlashOn () {
	renderer.material.color.a += fade_rate * 5;
}

function FlashOff () {
}