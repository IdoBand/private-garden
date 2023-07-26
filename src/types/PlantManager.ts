import { ImgBuffer, Plant, PlantUpdate } from "./interface";
import { AbstractManager } from "./AbstractManager";
class PlantManager extends AbstractManager {
    serializePlant(plant: Plant, existingUpdates?: PlantUpdate[]): Plant {
        const serializedPlant: Plant = {
            ...plant,
            checked: false,
            updates: existingUpdates ? existingUpdates : [],
        }
        if (serializedPlant.dateAdded instanceof Date) {
            // this if statement is to not get a type error...
            serializedPlant.dateAdded = serializedPlant.dateAdded.getTime()
        }
        serializedPlant.img = this.decideImg(serializedPlant.img as ImgBuffer)
        return serializedPlant
    }
    deserializePlant(plant: Plant): Plant {
        const deserializedPlant = {
            ...plant,
            dateAdded: new Date(plant.dateAdded as number)
        }
        return deserializedPlant
    }
    serializeGarden(plants: Plant[]): Plant[] {
        return plants.map(plant => {
            return this.serializePlant(plant)
        })
    }
}
export const plantManager = new PlantManager()