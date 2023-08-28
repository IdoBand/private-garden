import { Skeleton } from "@mui/material";
import EditButton from "../Button/EditButton";

const SkeletonLine = () => {
    return <Skeleton className="card-date" variant="rounded" width={120} />
}

const PlantUpdateCardSkeleton = () => {

    return (
    <div className="update-card">
        <div className="update-card-content">
            <div className="date-and-edit">
                <SkeletonLine />
                <EditButton onClick={() => {return}} isDisabled={false} />
            </div>
            <div className="info">
                <div className="update-card-irrigation-container">
                    <div className="update-card-subheader">
                        <div className="update-card-subheader">
                            Irrigation <Skeleton width={18} height={18} variant="circular" />
                        </div>
                    </div>
                        <section className="irrigation-section">
                            <div className="irrigation-subheader">Water Quantity:</div>
                            <SkeletonLine />
                        </section>
                        <section className="irrigation-section">
                            <div className="irrigation-subheader">Fertilizer:</div>
                            <SkeletonLine />
                        </section>
                        <section className="irrigation-section">
                            <div className="irrigation-subheader">Fertilizer Quantity:</div>
                            <SkeletonLine />
                        </section>
     
                </div>
                <div className="update-card-notes-container">
                    <div className="update-card-subheader">
                        Notes <Skeleton width={18} height={18} variant="circular" />
                    </div>
                    <Skeleton className="" width={150} height={150} />
                </div>
                <div className="update-card-images-container">
                    <div className="update-card-subheader">
                        Images <Skeleton width={18} height={18} variant="circular" />
                    </div>
                    <Skeleton width={100} height={100} variant="rounded" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default PlantUpdateCardSkeleton