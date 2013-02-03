// #pragma strict

// public enum WeaponType {
// 	Beam,
// 	Pulse,
// 	Projectile,
// 	Missile,
// }

// public var dual_mount : boolean;
// public var weapon_type : WeaponType;
// public var projectile_weapon_prefab : GameObject;
// public var mounts : GameObject[];

// function Start () {
// 	if (weapon_type.Projectile) {
// 		var prefab = projectile_weapon_prefab;

// 	}

// 	for (var i = 0; i < mounts.length; i++) {
// 		var weapon = Instantiate(prefab, transform.position, transform.rotation);
// 		weapon.transform.parent = transform;
// 		weapon.transform.position = mounts[i].transform.position;
// 		weapon.transform.rotation = mounts[i].transform.rotation;
// 		Destroy(mounts[i]);
// 	}
// 		// weapon = Instantiate(projectile_weapon_prefab, transform.position, Quaternion.identity);
// 		// weapon.transform.parent = transform;
// 		// weapon.transform.localScale.y = -weapon.transform.localScale.y;
// 		// weapon.transform.position.z = -weapon.transform.position.z;
// }

// function Update () {

// }