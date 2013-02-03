// #pragma strict

public var range : float;
public var damage : float;
public var width : float;
public var life : float;

function Start () {
	var lineRenderer : LineRenderer = gameObject.GetComponent(LineRenderer);
	// Debug.Log(lineRenderer);
	lineRenderer.SetWidth(width, width);
	lineRenderer.SetPosition(1, Vector3.forward * range);

}

function Update () {

	life -= Time.deltaTime;
	if (life <= 0) {
		Destroy(gameObject);
	}	

	var ships_hit = new Array();


	var hit_colliders = Physics.SphereCastAll(transform.position, width, transform.forward, range);
	for (hit in hit_colliders) {
		// Debug.Log(hit.collider.gameObject.tag);
		var tag = hit.collider.gameObject.tag;

		if ((tag == "ShipShield") || (tag == "ShipBody")) {
			var ship_hit = (hit.collider.gameObject.transform.parent);
			// Debug.Log(ship_hit);

			var contains = false;

			for (var i = 0; i < ships_hit.length; i++) {
				if (ships_hit[i] == ship_hit) {
					contains = true;
					break;
				}
			}
			if (contains == false) {
				ships_hit.push(ship_hit);				
			}
		}
	}
	// Debug.Log(ships_hit.length);


	for (ship in ships_hit) {
		// Debug.Log(ship);
		ship.gameObject.transform.GetComponent(ShipControl).Damage(damage * Time.deltaTime);
	}


}