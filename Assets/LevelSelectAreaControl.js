#pragma strict

private var level : int;
public var max_level_achieved : int;
public var difficulty_multiplier : float;

private var display_level_gui : boolean;

function Start () {
	level = 0;

}

function Update () {
	if (display_level_gui) {
		if (Input.GetKeyDown(KeyCode.Return)) {
			LevelChangeControl.StartLevel(level);
		}
		if (Input.GetKeyDown(KeyCode.RightBracket)) {
			level += 1;
		}
		if (Input.GetKeyDown(KeyCode.LeftBracket)) {
			level -= 1;
		}
		if (level <= 0) { 
			level = 1;
		}
		if (level > (max_level_achieved + 1)) {
			level = max_level_achieved + 1;
		}
	}

	Debug.Log(PlayerStats.ship_type);


}

function OnTriggerEnter (collider : Collider) {
	display_level_gui = true;
	
}
function OnTriggerExit (collider : Collider) {
	display_level_gui = false;
}

function OnGUI () {
	if (display_level_gui) {
		GUI.Label (Rect(Screen.width / 2, Screen.height / 2, 100, 100), "Level: " + level);
		// Debug.Log("displaying");
		GUI.Label (Rect(Screen.width / 2, Screen.height / 2 + 100, 100, 100), "Cash reward: " + (Mathf.Pow(level, difficulty_multiplier) * 100));

	}
}