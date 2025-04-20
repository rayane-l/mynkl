import React from "react";
import { Radio } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { setUrl } from "../../app/color-slice";
import { useAppSelector } from "../../app/hooks";


export default function Colorblind() {
  const [showModal, setShowModal] = React.useState(false);
  const urlColor = useAppSelector(state => state.colorS.filter_url)
  const dispatch = useDispatch()

  return (
    <>
      <div
        style={{
          filter: `url(${urlColor})`,
        }}
        className="fixed bottom-4 left-4 z-50 inline-block grid justify-items-end cursor-pointer" onClick={() => setShowModal(true)}>
        {/* <button className="p-2  text-base inline-flex items-center border border-redCahier rounded 
        text-redCahier hover:bg-gray-300 hover:duration-700">ColorBlind
        </button> */}
        <img src={`${process.env.PUBLIC_URL}/Logos/colorLogo.png`} className=" h-12 w-12" alt="logoColorBlind" />
      </div>
      {showModal &&
        <div
          style={{
            filter: `url(${urlColor})`,
          }} id="modal-colorblind" aria-hidden="true" className="justify-center items-center flex overflow-x-hidden overflow-y-auto
         fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-full max-w-md px-4 h-full md:h-auto drop-shadow-lg">
            <div className="bg-white/90 rounded-lg shadow relative dark:bg-gray-700">
              <div className="flex justify-end p-2">
                <button onClick={() => setShowModal(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200
                 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800
                  dark:hover:text-white" data-modal-toggle="modal-colorblind">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 
                      1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd">
                    </path>
                  </svg>
                </button>
              </div>
              <form action="#" className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"  >
                <h3 className="text-xl font-light text-gray-900 dark:text-white inline-flex items-center">
                  Vous voyez différement ?
                </h3> <br />
                <div className="rounded-sm bg-greyNakala/20 p-2">
                  <Radio onClick={() => dispatch(setUrl("#deutranomalyColourMatrix"))} id="Deutranomaly" label="Deutranomaly" name="color" color="red" ripple={true} />
                  <Radio onClick={() => dispatch(setUrl("#achromatomalyColourMatrix"))} id="Achromatomaly" label="Achromatomaly" name="color" color="red" ripple={true} />
                  <Radio onClick={() => dispatch(setUrl("#protanopiaColourMatrix"))} id="Protanopia" label="Protanopia" name="color" color="red" ripple={true} />
                  <Radio onClick={() => dispatch(setUrl("#protanomalyColourMatrix"))} id="Protanomaly" label="Protanomaly" name="color" color="red" ripple={true} />
                  <Radio onClick={() => dispatch(setUrl("#tritanopiaColourMatrix"))} id="Tritanopia" label="Tritanopia" name="color" color="red" ripple={true} />
                  <Radio onClick={() => dispatch(setUrl("#tritanomalyColourMatrix"))} id="Tritanomaly" label="Tritanomaly" name="color" color="red" ripple={true} />
                  <Radio onClick={() => dispatch(setUrl(""))} id="Neutre" label="Neutre" name="color" color="red" ripple={true} />
                </div>
              </form>
            </div>
          </div>
        </div>}
    </>
  )
}