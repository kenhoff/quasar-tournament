#pragma strict

function Start () {

}

function Update () {

}

static function StartLevel (difficulty : int) {
	Debug.Log("starting level with difficulty " + difficulty);
	Application.LoadLevel(1);
	Debug.Log("loaded level");
}