public var shield : GameObject;
public var armor : GameObject;
public var hull : GameObject;

private var ship_control_script;
private var max_shield : float;
private var max_armor : float;
private var max_hull : float;


function Start () {
	ship_control_script = transform.parent.gameObject.transform.GetComponent(ShipControl);
	max_shield = ship_control_script.max_shield;
	max_armor = ship_control_script.max_armor;
	max_hull = ship_control_script.max_hull;
}

function Update () {
	transform.rotation = Quaternion.identity;
	shield.transform.localScale.x = ship_control_script.shield_health / max_shield;
	armor.transform.localScale.x = ship_control_script.armor_health / max_armor;
	hull.transform.localScale.x = ship_control_script.hull_health / max_hull;
}