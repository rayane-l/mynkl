import { useAppSelector } from "../app/hooks";
import DonneesList from "../components/Donnees/DonneesList";


export default function MesDonneesDetailPage() {
  const urlColor = useAppSelector(state => state.colorS.filter_url)
  return (
    <div
      className="h-full"
      style={{
        filter: `url(${urlColor})`
      }} >
      <DonneesList />
    </div>
  )
}