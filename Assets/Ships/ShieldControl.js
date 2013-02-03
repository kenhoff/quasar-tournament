#pragma strict

private var fade_rate : float = .05;

public var max_shield_alpha : float;

function Start () {

}

function Update () {
	if (renderer.material.color.a > max_shield_alpha) {
		renderer.material.color.a = max_shield_alpha;
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