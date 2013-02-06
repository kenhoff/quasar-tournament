#pragma strict

private var level : int;
public var max_level_achieved : int;

private var display_level_gui : boolean;

function Start () {
	level = 0;

}

function Update () {
	if (Input.GetKeyDown(KeyCode.RightBracket)) {
		level += 1;
	}
	if (Input.GetKeyDown(KeyCode.LeftBracket)) {
		level -= 1;
	}

}

function OnTriggerEnter (collider : Collider) {
	Debug.Log(transform.name);
	if (gameObject.name == "LevelStore") {
		display_level_gui = true;
	}
}
function OnTriggerExit (collider : Collider) {
	display_level_gui = false;
}

function OnGUI () {
	if (display_level_gui) {
		GUI.Label (Rect(Screen.width / 2, Screen.height / 2, 100, 100), "Level: " + level);
		// Debug.Log("displaying");
	}
}