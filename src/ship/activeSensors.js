import EMSReading from "./EMSReading.js";
import response from "../helpers/response.js";
import Vector2 from "../helpers/Vector2.js";

export default class ActiveSensors{
    constructor(parentShip){
		this.parentShip = parentShip;
	}

	performScan(heading, arc, range){
        // Ensure solar system is initialized before performing scan
        if (!this.parentShip.solarSystem) return new response(400, ["Cannot perform ActiveSensors performScan until solar system initalized"], []);

        // Note: angle must account for relative position of object to ship (not global position on board)
        // To find angle, find angle difference between the vector from ship to object & current ship heading
        // y coord is inverted due to the flipped board axis (greater y value indicates lower position)
        let readings = [];
        for (const planet of this.parentShip.solarSystem.planets){
            let dist = this.parentShip.pos.distance(planet.pos);
            let angle = this.parentShip.angle.angleTo(new Vector2(planet.pos.x - this.parentShip.pos.x, this.parentShip.pos.y - planet.pos.y));
            if (dist+planet.size.x<=range && angle <= arc){
                let newReading = new EMSReading(angle, dist, 0, planet.size.x, planet.composition, null);
                readings.push(newReading);
            }
        }

        for (const warpgate of this.parentShip.solarSystem.warpGates){
            let dist = this.parentShip.pos.distance(warpgate.pos);
            let angle = this.parentShip.angle.angleTo(new Vector2(warpgate.pos.x - this.parentShip.pos.x, this.parentShip.pos.y - warpgate.pos.y));
            if (dist+warpgate.size.x<=range && angle <= arc){
                let newReading = new EMSReading(angle, dist, 0, warpgate.width, {}, warpgate.destinationSolarSystem);
                readings.push(newReading);
            }
        }

        for (const asteroid of this.parentShip.solarSystem.asteroids){
            let dist = this.parentShip.pos.distance(asteroid.pos);
            let angle = this.parentShip.angle.angleTo(new Vector2(asteroid.pos.x - this.parentShip.pos.x, this.parentShip.pos.y - asteroid.pos.y));
            if (dist+asteroid.size.x<=range && angle <= arc){
                let newReading = new EMSReading(angle, dist, asteroid.speed, asteroid.radius, {}, null);
                readings.push(newReading);
            }
        }
        return new response(200, [], readings, true);
	}
}