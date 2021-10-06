const {
	fetchMyIP,
	fetchCoordsById,
	fetchISSFlyOverTimes,
	nextISSTimesForMyLocation
} = require("./iss");

fetchMyIP((error, ip) => {
	if (error) {
		console.log("It didn't work!", error);
		return;
	}
	console.log("It worked! Returned IP:", ip);
	return ip;
});

fetchCoordsById((error, coordinates) => {
	if (error) {
		console.log("It didn't work!", error);
		return;
	}
	console.log("It worked! Returned Coordinates", coordinates);
	return coordinates;
});

const exampleCoords = { latitude: 50.1212, longitude: -122.9501 };

fetchISSFlyOverTimes(exampleCoords, (error, risetime) => {
	if (error) {
		console.log("It didn't work!", error);
		return;
	}
	console.log("It worked! Returned FlyoverTimes", risetime);
});

const printPassTimes = (passTimes) => {
	for (const pass of passTimes) {
		const datetime = new Date(0);
		datetime.setUTCSeconds(pass.risetime);
		const duration = pass.duration;
		console.log(`Next pass at ${datetime} for ${duration} seconds`);
	}
};

nextISSTimesForMyLocation((error, passTimes) => {
	if (error) {
		return console.log("It didn't work!", error);
	}
	printPassTimes(passTimes);
});
