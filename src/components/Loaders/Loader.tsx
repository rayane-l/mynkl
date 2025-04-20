
import { Rings } from "react-loader-spinner"

export default function Loader() {
  return (
    <div className="flex justify-center">
      <header className="m-10 flex">
        <Rings color="#C41627" height={100} width={100} />
        <Rings color="#ff8c00" height={100} width={100} />
        <Rings color="#A6A2A4" height={100} width={100} />
      </header>
    </div>
  )
}