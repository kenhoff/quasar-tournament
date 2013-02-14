// #pragma strict

static var safe_radius = 1000000;


static var spawn_queue = new Array();

private var time_between_spawns : float = 1;
private var time_since_spawn : float;

function Start () {

	time_since_spawn = 0;
}

function Update () {
	if (spawn_queue.length > 0) {
		// Debug.Log(spawn_queue[0]["type"]);
		time_since_spawn += Time.deltaTime;
		if (time_since_spawn >= time_between_spawns) {
			SpawnShip(spawn_queue.shift());
			time_since_spawn = 0;
		}
	}
}


function SpawnShip (properties) {
	// find spawn point
	var location = FindAvailableSpawn();
	Debug.Log(location);

// instantiate enemy
// instantiate ship
// connect ship to enemy
}

function FindAvailableSpawn () {
	var spawns = GameObject.FindGameObjectsWithTag("Respawn");
	RandomizeArray(spawns);
	for (var j = 0; j < spawns.length; j++) {
		// var random_spawn = spawns[Mathf.Floor(Random.value * spawns.length)];
		var sphere_hits = Physics.OverlapSphere(spawns[j].transform.position, safe_radius);
		var hit : RaycastHit;
		var spawn_ship_flag : boolean = true;
		for (var i = 0; i < sphere_hits.length; i++) {
			if (sphere_hits[i].collider.gameObject.tag == "Ship") {
				Debug.Log("near ship");
				spawn_ship_flag = false;
				break;
			}
		}
		if (spawn_ship_flag) {
			// spawn the ship
			Debug.Log("found a place to spawn");
			return spawns[j].transform.position;
		}

	}

}



static function AddToSpawnQueue (ship) {
	spawn_queue.push(ship);
}


static function RandomizeArray(arr : Array)
{
    for (var i = arr.length - 1; i > 0; i--) {
        var r = Random.Range(0,i);
        var tmp = arr[i];
        arr[i] = arr[r];
        arr[r] = tmp;
    }
}