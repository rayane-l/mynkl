import { useAppSelector } from "../app/hooks";
import CollectionsList from "../components/Collections/CollectionsList";


export default function MesCollectionsDetailPage() {
  const urlColor = useAppSelector(state => state.colorS.filter_url)
  return (
    <div
      style={{ 
        filter: `url(${urlColor})`
      }} className="h-full">
      <CollectionsList/>
    </div>
  )
}