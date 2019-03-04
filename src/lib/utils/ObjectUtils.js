export function copyMissingProperties(ownObject, referenceObject) {
	Object.keys(referenceObject).forEach(e => {
		if (ownObject[e] == null) ownObject[e] = referenceObject[e];
	});

	return ownObject;
}
