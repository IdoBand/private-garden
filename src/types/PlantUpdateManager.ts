import { PlantUpdate } from "./interface";
import { AbstractManager } from "./AbstractManager";
class PlantUpdateManager extends AbstractManager {
    serializePlantUpdate(plantUpdate: PlantUpdate): PlantUpdate {
        const serializedPlantUpdate: PlantUpdate = {
            ...plantUpdate,
            checked: false,
        }
        serializedPlantUpdate.dateAdded = new Date(serializedPlantUpdate.dateAdded)
        if (serializedPlantUpdate.dateAdded instanceof Date) {
            // this if statement is to not get a type error...
            serializedPlantUpdate.dateAdded = serializedPlantUpdate.dateAdded.getTime()
        }
        serializedPlantUpdate.images = serializedPlantUpdate.images.map(image => {
            return this.decideImg(image)
        })
        serializedPlantUpdate.irrigation.fertilizerQuantity = serializedPlantUpdate.irrigation.fertilizerQuantity ? serializedPlantUpdate.irrigation.fertilizerQuantity : 0
        serializedPlantUpdate.irrigation.waterQuantity = serializedPlantUpdate.irrigation.waterQuantity ? serializedPlantUpdate.irrigation.waterQuantity : 0
        return serializedPlantUpdate
    }
    serializeUpdatesArray(plantUpdates: PlantUpdate[]): PlantUpdate[] {
        return plantUpdates.map(update => {
            return this.serializePlantUpdate(update)
        })
    }
}
export const plantUpdateManager = new PlantUpdateManager()